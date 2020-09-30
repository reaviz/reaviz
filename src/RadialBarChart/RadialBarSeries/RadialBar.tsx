import React, { Component, Fragment, ReactElement } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { arc } from 'd3-shape';
import { Gradient } from '../../common/Gradient';
import bind from 'memoize-bind';
import chroma from 'chroma-js';
import { path } from 'd3-path';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { MotionBar } from './MotionBar';
import { RadialGuideBar, RadialGuideBarProps } from './RadialGuideBar';
import { CloneElement } from '../../common/utils';

export interface RadialBarProps {
  /**
   * Parsed data shape. Set internally by `RadialBarChart`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;

  /**
   * Index of the element in the series. Set internally by `RadialBarSeries`.
   */
  index: number;

  /**
   * Whether the element is active or not. Set internally by `RadialBarSeries`.
   */
  animated: boolean;

  /**
   * D3 scale for X Axis. Set internally by `RadialBarChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialBarChart`.
   */
  yScale: any;

  /**
   * Color of the bar.
   */
  color: any;

  /**
   * Whether to use gradient or not.
   */
  gradient: boolean;

  /**
   * Id set internally by `RadialBarSeries`.
   */
  id: string;

  /**
   * Total number of bars used for animation. Set internally by `RadialBarSeries`.
   */
  barCount: number;

  /**
   * CSS classes to apply.
   */
  className?: any;

  /**
   * Whether the bar is curved or not.
   */
  curved: boolean;

  /**
   * Guide bar component.
   */
  guide: ReactElement<RadialGuideBarProps, typeof RadialGuideBar> | null;

  /**
   * Active caused by hover.
   */
  active: boolean;

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

export class RadialBar extends Component<RadialBarProps> {
  static defaultProps: Partial<RadialBarProps> = {
    gradient: true,
    curved: false,
    guide: <RadialGuideBar />,
    onClick: () => undefined,
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined
  };

  previousEnter: any;

  getFill(color: string) {
    const { id, gradient } = this.props;

    if (!gradient) {
      return color;
    }

    return `url(#${id}-gradient)`;
  }

  onMouseEnter(event: MouseEvent) {
    const { onMouseEnter, data } = this.props;
    onMouseEnter({
      value: data,
      nativeEvent: event
    });
  }

  onMouseLeave(event: MouseEvent) {
    const { onMouseLeave, data } = this.props;
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

  getArc(data: ChartInternalShallowDataShape) {
    const { innerRadius, xScale, yScale, curved } = this.props;

    const outerRadius = yScale(data.y);

    if (curved) {
      const startAngle = xScale(data.x);
      const endAngle = startAngle + xScale.bandwidth();

      const arcFn = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .padAngle(0.01)
        .padRadius(innerRadius);

      return arcFn(data as any);
    } else {
      const startAngle = xScale(data.x) - Math.PI * 0.5;
      const endAngle = startAngle + xScale.bandwidth();

      const innerAngleDistance = endAngle - startAngle;
      const arcLength = innerRadius * innerAngleDistance;
      const outerAngleDistance = arcLength / outerRadius;
      const halfAngleDistanceDelta =
        (innerAngleDistance - outerAngleDistance) / 2;

      const pathFn = path();
      pathFn.arc(0, 0, innerRadius, startAngle, endAngle);
      pathFn.arc(
        0,
        0,
        outerRadius,
        endAngle - halfAngleDistanceDelta,
        startAngle + halfAngleDistanceDelta,
        true
      );

      return pathFn.toString();
    }
  }

  getTransition() {
    const { animated, barCount, index } = this.props;

    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: (index / barCount) * 0.5
      };
    } else {
      return {
        type: false,
        delay: 0
      };
    }
  }

  renderBar(color: string) {
    const { className, data, yScale, active, guide } = this.props;

    const fill = this.getFill(color);
    const transition = this.getTransition();

    // Track previous props
    const previousEnter = this.previousEnter
      ? { ...this.previousEnter }
      : undefined;
    this.previousEnter = { ...data };

    const [yStart, yEnd] = yScale.domain();
    const exit = {
      ...data,
      y: yStart
    };

    const guidePath = this.getArc({
      ...data,
      y: yEnd
    }) as string;

    return (
      <Fragment>
        {guide && (
          <CloneElement<RadialGuideBarProps>
            element={guide}
            active={active}
            path={guidePath}
          />
        )}
        <MotionBar
          arc={this.getArc.bind(this)}
          custom={{
            enter: data,
            exit,
            previousEnter
          }}
          transition={transition}
          fill={fill}
          className={className}
          onMouseEnter={bind(this.onMouseEnter, this)}
          onMouseLeave={bind(this.onMouseLeave, this)}
          onClick={bind(this.onMouseClick, this)}
        />
      </Fragment>
    );
  }

  render() {
    const { data, index, color, gradient, id, active } = this.props;
    const fill = color(data, index);
    const currentColorShade = active ? chroma(fill).brighten(0.5) : fill;

    return (
      <Fragment>
        {this.renderBar(currentColorShade)}
        {gradient && (
          <Gradient id={`${id}-gradient`} color={currentColorShade} />
        )}
      </Fragment>
    );
  }
}
