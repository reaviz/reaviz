import React, {
  Component,
  ReactNode,
  createRef,
  Fragment,
  ReactElement
} from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { radialLine } from 'd3-shape';
import bind from 'memoize-bind';
import classNames from 'classnames';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';
import { CloneElement } from '../../common/utils/children';
import css from './RadialScatterPoint.module.scss';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { schemes } from '../../common/color';

export interface RadialScatterPointProps {
  /**
   * Parsed data shape. Set internally by `RadialScatterPlot`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Index of the element in the series. Set internally by `RadialScatterSeries`.
   */
  index: number;

  /**
   * Whether the element is active or not. Set internally by `RadialScatterSeries`.
   */
  animated: boolean;

  /**
   * D3 scale for X Axis. Set internally by `RadialScatterPlot`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialScatterPlot`.
   */
  yScale: any;

  /**
   * Fill for the element.
   */
  fill: string;

  /**
   * Id set internally by `RadialScatterPlot`.
   */
  id: string;

  /**
   * Color of the circle.
   */
  color: any;

  /**
   * CSS classes to apply.
   */
  className?: any;

  /**
   * Whether the element is active or not. Set internally by `RadialScatterSeries`.
   */
  active?: boolean;

  /**
   * Whether the elment is visiblbe or not.
   */
  visible?: (value, index) => boolean;

  /**
   * Symbol element to render.
   */
  symbol: (value) => ReactNode;

  /**
   * Size of the circle element.
   */
  size?: ((d) => number) | number;

  /**
   * Tooltip element.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Event for when a symbol is clicked.
   */
  onClick: (event) => void;

  /**
   * Event for when the symbol has mouse enter.
   */
  onMouseEnter: (event) => void;

  /**
   * Event for when the symbol has mouse leave.
   */
  onMouseLeave: (event) => void;
}

interface RadialScatterPointState {
  hovered: boolean;
}

export class RadialScatterPoint extends Component<
  RadialScatterPointProps,
  RadialScatterPointState
> {
  static defaultProps: Partial<RadialScatterPointProps> = {
    size: 3,
    color: schemes.cybertron[0],
    tooltip: <ChartTooltip />,
    active: true,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  ref = createRef<SVGGElement>();
  state: RadialScatterPointState = {
    hovered: false
  };

  onMouseEnter(event: MouseEvent) {
    this.setState({ hovered: true });

    const { onMouseEnter, data } = this.props;
    onMouseEnter({
      value: data,
      nativeEvent: event
    });
  }

  onMouseLeave(event: MouseEvent) {
    this.setState({ hovered: false });

    const { onMouseLeave, data } = this.props;
    onMouseLeave({
      value: data,
      nativeEvent: event
    });
  }

  onClick(event: MouseEvent) {
    const { onClick, data } = this.props;
    onClick({
      value: data,
      nativeEvent: event
    });
  }

  getTranslate(data: ChartInternalShallowDataShape) {
    const { xScale, yScale } = this.props;

    const fn = radialLine()
      .radius((d: any) => yScale(d.y))
      .angle((d: any) => xScale(d.x));

    // Parse the generated path to get point coordinates
    // Ref: https://bit.ly/2CnZcPl
    const path = fn([data] as any);

    if (path) {
      const [translateX, translateY] = path
        .slice(1)
        .slice(0, -1)
        .split(',');

      return {
        translateX: parseFloat(translateX),
        translateY: parseFloat(translateY)
      };
    }
  }

  getTransition() {
    const { animated, index } = this.props;

    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: index * 0.005
      };
    } else {
      return {
        type: false,
        delay: 0
      };
    }
  }

  render() {
    const {
      size,
      data,
      color,
      index,
      symbol,
      active,
      tooltip,
      yScale,
      className
    } = this.props;
    const { hovered } = this.state;

    const fill = typeof color === 'function' ? color(data, index) : color;
    const transform = this.getTranslate(data);
    const sizeVal = typeof size === 'function' ? size(data) : size;
    const transition = this.getTransition();

    const [yStart] = yScale.domain();
    const exitTransform = this.getTranslate({ ...data, y: yStart });

    return (
      <Fragment>
        <motion.g
          initial={{ ...exitTransform, opacity: 0 }}
          animate={{ ...transform, opacity: 1 }}
          exit={{ ...exitTransform, opacity: 0 }}
          transition={transition}
          ref={this.ref}
          onMouseEnter={bind(this.onMouseEnter, this)}
          onMouseLeave={bind(this.onMouseLeave, this)}
          onClick={bind(this.onClick, this)}
          className={classNames(className, {
            [css.inactive]: !active
          })}
        >
          {symbol && symbol(data)}
          {!symbol && <circle r={sizeVal} fill={fill} />}
        </motion.g>
        {tooltip && (
          <CloneElement<ChartTooltipProps>
            element={tooltip}
            visible={hovered}
            reference={this.ref}
            value={data}
          />
        )}
      </Fragment>
    );
  }
}
