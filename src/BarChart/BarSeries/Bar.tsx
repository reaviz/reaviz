import React, { Fragment, Component, ReactElement, createRef } from 'react';
import chroma from 'chroma-js';
import { Gradient, GradientProps } from '../../common/Gradient';
import classNames from 'classnames';
import { ChartInternalShallowDataShape, Direction } from '../../common/data';
import { RangeLinesProps, RangeLines } from './RangeLines';
import bind from 'memoize-bind';
import css from './Bar.module.scss';
import { CloneElement } from '../../common/utils/children';
import { Mask, MaskProps } from '../../common/Mask';
import {
  constructFunctionProps,
  PropFunctionTypes
} from '../../common/utils/functions';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { BarLabelProps, BarLabel } from './BarLabel';
import { formatValue } from '../../common/utils/formatting';
import { GuideBarProps, GuideBar } from './GuideBar';
import { ChartTooltipProps, ChartTooltip } from '../../common/Tooltip';

export type BarType =
  | 'standard'
  | 'grouped'
  | 'stacked'
  | 'stackedNormalized'
  | 'stackedDiverging'
  | 'marimekko'
  | 'waterfall';

export type BarProps = {
  /**
   * Whether the bar is active or not.
   */
  active: boolean;

  /**
   * Chroma brightness factor to brighten the active bar. See
   * https://gka.github.io/chroma.js/#color-brighten for more info.
   */
  activeBrightness?: number;

  /**
   * D3 scale for X Axis. Set internally by `BarChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `BarChart`.
   */
  yScale: any;

  /**
   * D3 scale for X Multi-Group Axis. Set internally by `BarChart`.
   */
  xScale1: any;

  /**
   * Parsed data shape. Set internally by `BarChart`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Id set internally by `BarChart`.
   */
  id: string;

  /**
   * Gradient shades for the bar.
   */
  gradient: ReactElement<GradientProps, typeof Gradient> | null;

  /**
   * SVG rx attribute for the bar.
   */
  rx: number;

  /**
   * SVG ry attribute for the bar.
   */
  ry: number;

  /**
   * Width of the bar. Set internally by `BarSeries`.
   */
  width: number;

  /**
   * Padding for the bar groups.
   */
  padding: number;

  /**
   * Total number of bars used for animation. Set internally by `BarSeries`.
   */
  barCount: number;

  /**
   * Color callback for the bar.
   */
  color: any;

  /**
   * Whether the bar is rounded or not.
   */
  rounded: boolean;

  /**
   * Cursor for the bar element.
   */
  cursor: string;

  /**
   * Index of the bar. Set internally by `BarSeries`.
   */
  barIndex: number;

  /**
   * Index of the group. Set internally by `BarSeries`.
   */
  groupIndex?: number;

  /**
   * Whether to animate the enter/update/exit. Set internally by `BarSeries`.
   */
  animated: boolean;

  /**
   * Whether this is categorical chart or not. Set internally by `BarSeries`.
   */
  isCategorical: boolean;

  /**
   * Rangelines element. for the bar.
   */
  rangeLines: ReactElement<RangeLinesProps, typeof RangeLines> | null;

  /**
   * Mask element for the bar.
   */
  mask: ReactElement<MaskProps, typeof Mask> | null;

  /**
   * Tooltip element.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Direction of the chart. Set internally by `BarSeries`.
   */
  layout: Direction;

  /**
   * Type of bar chart. Set internally by `BarSeries`.
   */
  type: BarType;

  /**
   * Label element.
   */
  label: ReactElement<BarLabelProps, typeof BarLabel> | null;

  /**
   * Guide bar component.
   */
  guide: ReactElement<GuideBarProps, typeof GuideBar> | null;

  /**
   * Force a min height on the bar.
   */
  minHeight?: number;

  /**
   * Event for when the bar is clicked.
   */
  onClick: (event) => void;

  /**
   * Event for when the bar has mouse enter.
   */
  onMouseEnter: (event) => void;

  /**
   * Event for when the bar has mouse leave.
   */
  onMouseLeave: (event) => void;

  /**
   * Event for when a bar has mouse move.
   */
  onMouseMove: (event) => void;
} & PropFunctionTypes;

interface BarCoordinates {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface BarState {
  active?: boolean;
}

export class Bar extends Component<BarProps, BarState> {
  static defaultProps: Partial<BarProps> = {
    activeBrightness: 0.5,
    rounded: true,
    rx: 0,
    ry: 0,
    cursor: 'auto',
    rangeLines: null,
    label: null,
    tooltip: null,
    layout: 'vertical',
    guide: null,
    gradient: <Gradient />,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined,
    onMouseMove: () => undefined
  };

  state: BarState = {};
  rect = createRef<SVGGElement>();

  getExit({ x, y, width, height }: BarCoordinates) {
    const { yScale, xScale, type } = this.props;

    const isVertical = this.getIsVertical();
    let newX = isVertical ? x : Math.min(...xScale.range());
    let newY = isVertical ? Math.max(...yScale.range()) : y;
    const newHeight = isVertical ? 0 : height;
    const newWidth = isVertical ? width : 0;

    if (type === 'stackedDiverging') {
      if (isVertical) {
        newY = newY / 2;
      } else {
        newX = newX / 2;
      }
    }

    return {
      x: newX,
      y: newY,
      height: newHeight,
      width: newWidth
    };
  }

  getKeyCoords(
    v,
    v0,
    v1,
    scale,
    sizeOverride: number,
    isCategorical: boolean,
    padding: number
  ) {
    let offset;
    let size;

    if (isCategorical) {
      if (scale.bandwidth) {
        offset = scale(v);
        size = scale.bandwidth();

        if (sizeOverride) {
          if (offset) {
            offset = offset + size / 2 - sizeOverride / 2;
          } else {
            // Stacked bar charts don't have offsets...
            offset = size / 2 - sizeOverride / 2;
          }

          size = sizeOverride;
        }
      } else {
        if (sizeOverride) {
          throw new Error('Not a valid option for this scale type');
        }

        offset = scale(v0);
        size = scale((v1 as any) - (v0 as any));

        if (padding) {
          const calc = this.calculateLinearScalePadding(scale, offset, size);
          offset = calc.offset;
          size = calc.size;
        }
      }
    } else {
      if (sizeOverride) {
        throw new Error('Not a valid option for this scale type');
      }

      const c0 = scale(v0);
      const c1 = scale(v1);
      const delta = c1 - c0;
      offset = c0;
      size = Math.max(delta - 1, 0);
    }

    return { offset, size };
  }

  getValueCoords(v0, v1, scale) {
    const c0 = scale(v0);
    const c1 = scale(v1);
    const size = Math.abs(c0 - c1);
    const minSize = Math.max(this.props.minHeight || 0, size);

    return { offset: Math.min(c0, c1), size: minSize };
  }

  getIsVertical() {
    return this.props.layout === 'vertical';
  }

  getCoords(data: ChartInternalShallowDataShape): BarCoordinates {
    const { isCategorical, width, padding, xScale1 } = this.props;

    const isVertical = this.getIsVertical();
    let yScale = this.props.yScale;
    let xScale = this.props.xScale;

    if (xScale1) {
      if (isVertical) {
        xScale = xScale1;
      } else {
        yScale = xScale1;
      }
    }

    if (isVertical) {
      const xCoords = this.getKeyCoords(
        data.x,
        data.x0,
        data.x1,
        xScale,
        width,
        isCategorical,
        padding
      );
      const yCoords = this.getValueCoords(data.y0, data.y1, yScale);

      return {
        x: xCoords.offset,
        width: xCoords.size,
        y: yCoords.offset,
        height: yCoords.size
      };
    } else {
      const yCoords = this.getKeyCoords(
        data.y,
        data.y0,
        data.y1,
        yScale,
        width,
        isCategorical,
        padding
      );
      const xCoords = this.getValueCoords(data.x0, data.x1, xScale);

      return {
        x: xCoords.offset,
        width: xCoords.size,
        y: yCoords.offset,
        height: yCoords.size
      };
    }
  }

  /**
   * This function calculates the padding on a linear scale used by the marimekko chart.
   */
  calculateLinearScalePadding(scale, offset: number, size: number) {
    const { barCount, groupIndex, padding } = this.props;

    const totalSize = scale.range()[1];
    const sizeMinusPadding = totalSize - padding * (barCount - 1);
    const multiplier = sizeMinusPadding / totalSize;
    offset = offset * multiplier + groupIndex! * padding;
    size = size * multiplier;

    return { size, offset };
  }

  onMouseEnter(event: MouseEvent) {
    const { onMouseEnter, data, tooltip } = this.props;

    // Only tooltip bars rely on this...
    if (tooltip) {
      this.setState({ active: true });
    }

    onMouseEnter({
      value: data,
      nativeEvent: event
    });
  }

  onMouseLeave(event: MouseEvent) {
    const { onMouseLeave, data, tooltip } = this.props;

    // Only tooltip bars rely on this...
    if (tooltip) {
      this.setState({ active: false });
    }

    onMouseLeave({
      value: data,
      nativeEvent: event
    });
  }

  onMouseClick(event: MouseEvent) {
    const { onClick, data } = this.props;
    onClick({
      value: data,
      nativeEvent: event
    });
  }

  getFill(color: string) {
    const { mask, id, gradient } = this.props;

    if (mask) {
      return `url(#mask-pattern-${id})`;
    } else {
      if (gradient) {
        return `url(#gradient-${id})`;
      }

      return color;
    }
  }

  getTooltipData() {
    const { data, isCategorical } = this.props;

    const isVertical = this.getIsVertical();
    const xAttr = isCategorical ? 'x' : 'x0';
    let x = data[xAttr]!;

    // Stacked diverging negative numbers
    // in horizontal layouts need to pull x0
    if (data.x0 < 0) {
      x = data.x0;
    }

    const matches = isVertical
      ? data.key && data.key !== x
      : data.key && data.key !== data.y;

    if (matches) {
      x = `${data.key} ∙ ${x}`;
    }

    return {
      y: data.y,
      x
    };
  }

  getTransition(index: number) {
    const { animated, barCount, layout } = this.props;

    if (animated) {
      let delay = 0;
      if (layout === 'vertical') {
        delay = (index / barCount) * 0.5;
      } else {
        delay = ((barCount - index) / barCount) * 0.5;
      }

      return {
        ...DEFAULT_TRANSITION,
        delay: delay
      };
    } else {
      return {
        type: false,
        delay: 0
      };
    }
  }

  renderBar(currentColorShade: string, coords: BarCoordinates, index: number) {
    const { rounded, cursor, mask, id, data, rx, ry, onMouseMove } = this.props;
    const maskPath = mask ? `url(#mask-${id})` : '';
    const fill = this.getFill(currentColorShade);
    const initialExit = this.getExit(coords);
    const isVertical = this.getIsVertical();
    const extras = constructFunctionProps(this.props, data);
    const transition = this.getTransition(index);

    // UGH: https://github.com/framer/motion/issues/384
    const initial = {
      ...initialExit,
      attrX: initialExit.x,
      attrY: initialExit.y,
      fill
    };

    delete initial.x;
    delete initial.y;

    const animate = {
      ...coords,
      attrX: coords.x,
      attrY: coords.y,
      fill
    };

    delete animate.x;
    delete animate.y;

    return (
      <g ref={this.rect}>
        <motion.rect
          className={classNames(
            {
              [css.rounded]: rounded,
              [css.vertical]: isVertical,
              [css.horizontal]: !isVertical
            },
            extras.className
          )}
          style={{ ...extras.style, cursor }}
          mask={maskPath}
          rx={rx}
          ry={ry}
          initial={initial}
          animate={animate}
          exit={initial}
          transition={transition}
          onMouseEnter={bind(this.onMouseEnter, this)}
          onMouseLeave={bind(this.onMouseLeave, this)}
          onClick={bind(this.onMouseClick, this)}
          onMouseMove={onMouseMove}
        />
      </g>
    );
  }

  renderGuideBar() {
    const { data, yScale, active, barIndex, type, guide, xScale } = this.props;

    if (!guide) {
      return null;
    }

    // If we are stacked, only render the first bar
    if (type === 'stacked' && barIndex !== 0) {
      return null;
    }

    // No reason to show them since they are always 100% tall
    if (type === 'stackedNormalized' || type === 'marimekko') {
      console.error('Guide bars are not supported for these chart types');
      return null;
    }

    const vertical = this.getIsVertical();
    const valueScale = vertical ? yScale : xScale;
    const [start, end] = valueScale.domain();
    const attr = vertical ? 'y' : 'x';

    // For stacked diverging we need to flip the points for positive / negative bars
    const attrStart = type === 'stackedDiverging' ? '0' : '1';
    const endPoint = type === 'stackedDiverging' ? start : end;
    const startPoint =
      type === 'stackedDiverging' && data[attr]! > 0 ? end : endPoint;

    const coords = this.getCoords({
      ...data,
      [attr]: endPoint,
      [`${attr}${attrStart}`]: startPoint
    });

    return (
      <CloneElement<GuideBarProps>
        element={guide}
        {...coords}
        x={coords.x}
        width={coords.width}
        active={active}
      />
    );
  }

  render() {
    const {
      activeBrightness,
      id,
      gradient,
      data,
      barIndex,
      color,
      yScale,
      barCount,
      xScale,
      groupIndex,
      rangeLines,
      animated,
      type,
      tooltip,
      layout,
      mask,
      label
    } = this.props;
    const active = tooltip ? this.state.active : this.props.active;
    const stroke = color(data, barIndex);
    const coords = this.getCoords(data);
    const currentColorShade = active
      ? chroma(stroke)
          .brighten(activeBrightness)
          .hex()
      : stroke;
    const rangeLineColor = (rangeLines && rangeLines.props.color) || stroke;
    const rangeLineColorShade = active
      ? chroma(rangeLineColor).brighten(activeBrightness)
      : rangeLineColor;
    const index = groupIndex !== undefined ? groupIndex : barIndex;
    const isVertical = this.getIsVertical();
    const scale = isVertical ? yScale : xScale;
    const tooltipData = this.getTooltipData();
    const barLabel = isVertical ? tooltipData.y : tooltipData.x;
    const placement = layout === 'vertical' ? 'top' : 'right';

    return (
      <Fragment>
        {this.renderGuideBar()}
        {this.renderBar(currentColorShade, coords, index)}
        {rangeLines && (
          <CloneElement<RangeLinesProps>
            element={rangeLines}
            {...coords}
            index={index}
            data={data}
            scale={scale}
            color={rangeLineColorShade}
            barCount={barCount}
            animated={animated}
            layout={layout}
            type={type}
          />
        )}
        {mask && (
          <Fragment>
            <Mask id={`mask-${id}`} fill={`url(#gradient-${id})`} />
            <CloneElement<MaskProps>
              element={mask}
              id={`mask-pattern-${id}`}
              fill={stroke}
            />
          </Fragment>
        )}
        {gradient && (
          <CloneElement<GradientProps>
            element={gradient}
            id={`gradient-${id}`}
            direction={layout}
            color={currentColorShade}
          />
        )}
        {label && (
          <CloneElement<BarLabelProps>
            element={label}
            {...coords}
            text={formatValue(barLabel)}
            index={index}
            data={data}
            scale={scale}
            fill={label.props.fill || currentColorShade}
            barCount={barCount}
            animated={animated}
            layout={layout}
            type={type}
          />
        )}
        {tooltip && (
          <CloneElement<ChartTooltipProps>
            element={tooltip}
            visible={!!active}
            reference={this.rect}
            color={color}
            value={tooltipData}
            placement={tooltip.props.placement || placement}
            data={data}
          />
        )}
      </Fragment>
    );
  }
}
