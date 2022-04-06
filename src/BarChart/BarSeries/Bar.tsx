import React, {
  Fragment,
  ReactElement,
  useCallback,
  FC,
  useRef,
  useMemo,
  useState
} from 'react';
import chroma from 'chroma-js';
import { Gradient, GradientProps } from '../../common/Gradient';
import classNames from 'classnames';
import { ChartInternalShallowDataShape, Direction } from '../../common/data';
import { RangeLinesProps, RangeLines } from './RangeLines';
import { CloneElement } from 'rdk';
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

export const Bar: FC<Partial<BarProps>> = ({
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
  minHeight,
  rangeLines,
  animated,
  active,
  type,
  tooltip,
  layout,
  mask,
  label,
  cursor,
  rx,
  ry,
  isCategorical,
  className,
  style,
  width,
  padding,
  guide,
  xScale1,
  onMouseEnter,
  onClick,
  onMouseMove,
  onMouseLeave
}) => {
  const isVertical = useMemo(() => layout === 'vertical', [layout]);
  const rect = useRef<SVGGElement | null>(null);
  const [internalActive, setInternalActive] = useState<boolean>(active);

  const calculateLinearScalePadding = useCallback(
    (scale, offset: number, size: number) => {
      // This function calculates the padding on a linear scale used by the marimekko chart.
      const totalSize = scale.range()[1];
      const sizeMinusPadding = totalSize - padding * (barCount - 1);
      const multiplier = sizeMinusPadding / totalSize;
      offset = offset * multiplier + groupIndex! * padding;
      size = size * multiplier;

      return { size, offset };
    },
    [barCount, groupIndex, padding]
  );

  const getExit = useCallback(
    ({ x, y, width, height }: BarCoordinates) => {
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
    },
    [isVertical, type, xScale, yScale]
  );

  const getKeyCoords = useCallback(
    (
      v,
      v0,
      v1,
      scale,
      sizeOverride: number,
      isCategorical: boolean,
      padding: number
    ) => {
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
            const calc = calculateLinearScalePadding(scale, offset, size);
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

      return {
        offset: isNaN(offset) ? 0 : offset,
        size: isNaN(size) ? 0 : size
      };
    },
    [calculateLinearScalePadding]
  );

  const getValueCoords = useCallback(
    (v0, v1, scale) => {
      const c0 = scale(v0);
      const c1 = scale(v1);
      const size = Math.abs(c0 - c1);
      const minSize = Math.max(minHeight || 0, size);
      const offset = Math.min(c0, c1);

      return {
        offset: isNaN(offset) ? 0 : offset,
        size: isNaN(minSize) ? 0 : minSize
      };
    },
    [minHeight]
  );

  const getCoords = useCallback(
    (data: ChartInternalShallowDataShape) => {
      let newYScale = yScale;
      let newXScale = xScale;

      if (xScale1) {
        if (isVertical) {
          newXScale = xScale1;
        } else {
          newYScale = xScale1;
        }
      }

      if (isVertical) {
        const xCoords = getKeyCoords(
          data.x,
          data.x0,
          data.x1,
          newXScale,
          width,
          isCategorical,
          padding
        );
        const yCoords = getValueCoords(data.y0, data.y1, newYScale);

        return {
          x: xCoords.offset,
          width: xCoords.size,
          y: yCoords.offset,
          height: yCoords.size
        } as BarCoordinates;
      } else {
        const yCoords = getKeyCoords(
          data.y,
          data.y0,
          data.y1,
          newYScale,
          width,
          isCategorical,
          padding
        );
        const xCoords = getValueCoords(data.x0, data.x1, newXScale);

        return {
          x: xCoords.offset,
          width: xCoords.size,
          y: yCoords.offset,
          height: yCoords.size
        } as BarCoordinates;
      }
    },
    [
      getKeyCoords,
      getValueCoords,
      isCategorical,
      isVertical,
      padding,
      width,
      xScale,
      xScale1,
      yScale
    ]
  );

  const onMouseEnterInternal = useCallback(
    (event) => {
      // Only tooltip bars rely on this...
      if (tooltip) {
        setInternalActive(true);
      }

      onMouseEnter({
        value: data,
        nativeEvent: event
      });
    },
    [data, onMouseEnter, tooltip]
  );

  const onMouseLeaveInternal = useCallback(
    (event) => {
      // Only tooltip bars rely on this...
      if (tooltip) {
        setInternalActive(false);
      }

      onMouseLeave({
        value: data,
        nativeEvent: event
      });
    },
    [data, onMouseLeave, tooltip]
  );

  const onMouseClick = useCallback(
    (event) => {
      onClick({
        value: data,
        nativeEvent: event
      });
    },
    [data, onClick]
  );

  const getFill = useCallback(
    (color: string) => {
      if (mask) {
        return `url(#mask-pattern-${id})`;
      } else {
        if (gradient) {
          return `url(#gradient-${id})`;
        }

        return color;
      }
    },
    [gradient, id, mask]
  );

  const tooltipData = useMemo(() => {
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
  }, [data, isCategorical, isVertical]);

  const getTransition = useCallback(
    (index: number) => {
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
    },
    [animated, barCount, layout]
  );

  const renderBar = useCallback(
    (currentColorShade: string, coords: BarCoordinates, index: number) => {
      const maskPath = mask ? `url(#mask-${id})` : '';
      const fill = getFill(currentColorShade);
      const initialExit = getExit(coords);
      const extras = constructFunctionProps({ className, style }, data);
      const transition = getTransition(index);

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
        <g ref={rect}>
          <motion.rect
            className={classNames(extras.className)}
            style={{ ...extras.style, cursor }}
            mask={maskPath}
            rx={rx}
            ry={ry}
            initial={initial}
            animate={animate}
            exit={initial}
            transition={transition}
            onMouseEnter={onMouseEnterInternal}
            onMouseLeave={onMouseLeaveInternal}
            onClick={onMouseClick}
            onMouseMove={onMouseMove}
          />
        </g>
      );
    },
    [
      className,
      cursor,
      data,
      getExit,
      getFill,
      getTransition,
      id,
      mask,
      onMouseClick,
      onMouseEnterInternal,
      onMouseLeaveInternal,
      onMouseMove,
      rx,
      ry,
      style
    ]
  );

  const renderGuideBar = useCallback(() => {
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

    const valueScale = isVertical ? yScale : xScale;
    const [start, end] = valueScale.domain();
    const attr = isVertical ? 'y' : 'x';

    // For stacked diverging we need to flip the points for positive / negative bars
    const attrStart = type === 'stackedDiverging' ? '0' : '1';
    const endPoint = type === 'stackedDiverging' ? start : end;
    const startPoint =
      type === 'stackedDiverging' && data[attr]! > 0 ? end : endPoint;

    const coords = getCoords({
      ...data,
      [attr]: endPoint,
      [`${attr}${attrStart}`]: startPoint
    });

    return (
      <CloneElement<GuideBarProps>
        element={guide}
        {...coords}
        active={active}
      />
    );
  }, [
    active,
    barIndex,
    data,
    getCoords,
    guide,
    isVertical,
    type,
    xScale,
    yScale
  ]);

  const isActive = tooltip ? internalActive : active;
  const stroke = color(data, barIndex);
  const coords = getCoords(data);
  const currentColorShade = active
    ? chroma(stroke).brighten(activeBrightness).hex()
    : stroke;
  const rangeLineColor = (rangeLines && rangeLines.props.color) || stroke;
  const rangeLineColorShade = active
    ? chroma(rangeLineColor).brighten(activeBrightness)
    : rangeLineColor;
  const index = groupIndex !== undefined ? groupIndex : barIndex;
  const scale = isVertical ? yScale : xScale;
  const barLabel = isVertical ? tooltipData.y : tooltipData.x;
  const placement = layout === 'vertical' ? 'top' : 'right';

  return (
    <Fragment>
      {renderGuideBar()}
      {renderBar(currentColorShade, coords, index)}
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
          visible={!!isActive}
          reference={rect}
          color={color}
          value={tooltipData}
          placement={(tooltip.props as any).placement || placement}
          data={data}
        />
      )}
    </Fragment>
  );
};

Bar.defaultProps = {
  activeBrightness: 0.5,
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
