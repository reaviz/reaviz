import React, { Fragment, Component, ReactElement, createRef } from 'react';
import { TooltipAreaEvent } from './TooltipAreaEvent';
import { Placement } from 'rdk';
import {
  ChartDataTypes,
  ChartInternalDataShape,
  ChartInternalShallowDataShape,
  ChartInternalNestedDataShape
} from '../data';
import { getPositionForTarget, getClosestPoint } from '../utils/position';
import bind from 'memoize-bind';
import { CloneElement } from 'rdk';
import { ChartTooltip, ChartTooltipProps } from './ChartTooltip';
import { arc } from 'd3-shape';
import memoize from 'memoize-one';
import isEqual from 'react-fast-compare';

export interface TooltipAreaProps {
  /**
   * Popperjs placement.
   */
  placement: Placement;

  /**
   * Chart height. Set internally.
   */
  height: number;

  /**
   * Chart width. Set internally.
   */
  width: number;

  /**
   * Chart D3 XScale. Set internally.
   */
  xScale: any;

  /**
   * Chart D3 YScale. Set internally.
   */
  yScale: any;

  /**
   * Whether the tooltip is disabled or not.
   */
  disabled: boolean;

  /**
   * Color setter.
   */
  color: any;

  /**
   * Chart internal data type.
   */
  data: ChartInternalDataShape[];

  /**
   * Child elements to be contained by.
   */
  children?: any;

  /**
   * Whether the area is radial or not.
   */
  isRadial?: boolean;

  /**
   * Inner-radius to set the positioning by. Set internally.
   */
  innerRadius?: number;

  /**
   * Outer-radius to set the positioning by. Set internally.
   */
  outerRadius?: number;

  /**
   * Tooltip element.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip>;

  /**
   * Whether to inverse the data or not.
   */
  inverse: boolean;

  /**
   * When pointer entered mouse area.
   */
  onValueEnter: (event: TooltipAreaEvent) => void;

  /**
   * When pointer left mouse area.
   */
  onValueLeave: () => void;

  /**
   * Whether the layout is horizontal or not.
   */
  isHorizontal: boolean;
}

interface TooltipAreaState {
  visible?: boolean;
  placement?: Placement;
  value?: any;
  offsetX?: any;
  offsetY?: any;
}

interface TooltipDataShape {
  x?: ChartDataTypes;
  y?: ChartDataTypes;
  data?: ChartDataTypes | Array<ChartDataTypes | ChartInternalShallowDataShape>;
}

export class TooltipArea extends Component<TooltipAreaProps, TooltipAreaState> {
  static defaultProps: Partial<TooltipAreaProps> = {
    isRadial: false,
    tooltip: <ChartTooltip />,
    inverse: true,
    onValueEnter: () => undefined,
    onValueLeave: () => undefined
  };

  prevX: number | undefined;
  prevY: number | undefined;
  state: TooltipAreaState = {};
  ref = createRef<SVGRectElement | SVGPathElement | any>();

  getXCoord(x: number, y: number) {
    const { isRadial, width, height } = this.props;

    // If the shape is radial, we need to convert the X coords to a radial format.
    if (isRadial) {
      const outerRadius = Math.min(width, height) / 2;
      let rad = Math.atan2(y - outerRadius, x - outerRadius) + Math.PI / 2;

      // TODO: Figure out what the 'correct' way to do this is...
      if (rad < 0) {
        rad += Math.PI * 2;
      }

      return rad;
    }

    return x;
  }

  onMouseMove(event: React.MouseEvent) {
    const {
      xScale,
      yScale,
      onValueEnter,
      height,
      width,
      data,
      isRadial,
      isHorizontal,
      placement
    } = this.props;
    const { value } = this.state;
    const transformed = this.transformData(data);

    // Get our default placement
    let newPlacement = placement;
    if (!placement) {
      if (isHorizontal) {
        newPlacement = 'right';
      } else {
        newPlacement = 'top';
      }
    }

    // Get the path container element
    let target = this.ref.current;

    const { y, x } = getPositionForTarget({
      target: target,
      // Manually pass the x/y from the event
      clientX: event.clientX,
      clientY: event.clientY
    });

    // Need to flip scales/coords if we are a horz layout
    let keyScale;
    let valueScale;
    let coord;
    if (isHorizontal) {
      keyScale = yScale;
      valueScale = xScale;
      coord = y;
    } else {
      coord = this.getXCoord(x, y);
      keyScale = xScale;
      valueScale = yScale;
    }

    const newValue = getClosestPoint(coord, keyScale, transformed);

    if (!isEqual(newValue, value) && newValue) {
      const pointX = keyScale(newValue.x);
      let pointY = valueScale(newValue.y);
      let marginX = 0;
      let marginY = 0;

      if (isNaN(pointY)) {
        pointY = height / 2;
        marginX = 10;
        if (!placement) {
          newPlacement = 'right';
        }
      } else {
        marginY = -10;
      }

      // If the points didn't change, don't trigger an update
      if (pointX === this.prevX && pointY === this.prevY) {
        return;
      }

      this.prevY = pointY;
      this.prevX = pointX;

      const target = event.target as SVGRectElement;
      const { top, left } = target.getBoundingClientRect();

      let offsetX = 0;
      let offsetY = 0;

      if (isRadial) {
        // If its radial, we need to convert the coords to radial format
        const outerRadius = Math.min(width, height) / 2;
        offsetX = pointY * Math.cos(pointX - Math.PI / 2) + outerRadius;
        offsetY = pointY * Math.sin(pointX - Math.PI / 2) + outerRadius;
      } else {
        offsetX = pointX;
        offsetY = pointY;
      }

      offsetX += left + marginX;
      offsetY += top + marginY;

      this.setState({
        placement: newPlacement,
        visible: true,
        value: newValue,
        offsetX,
        offsetY
      });

      onValueEnter({
        visible: true,
        value: newValue,
        pointY,
        pointX,
        offsetX,
        offsetY,
        nativeEvent: event
      });
    }
  }

  onMouseLeave() {
    this.prevX = undefined;
    this.prevY = undefined;

    this.setState({
      value: undefined,
      visible: false
    });

    this.props.onValueLeave();
  }

  getTooltipReference() {
    const { offsetX, offsetY } = this.state;

    return {
      width: 4,
      height: 4,
      top: offsetY,
      left: offsetX
    };
  }

  transformData = memoize((series: ChartInternalDataShape[]) => {
    const { inverse, isHorizontal } = this.props;
    const result: TooltipDataShape[] = [];

    if (inverse) {
      for (const point of series) {
        const seriesPoint = point as ChartInternalNestedDataShape;
        if (Array.isArray(seriesPoint.data)) {
          for (const nestedPoint of seriesPoint.data) {
            const right = nestedPoint.x;
            let idx = result.findIndex((r) => {
              const left = r.x;
              if (left instanceof Date && right instanceof Date) {
                return left.getTime() === right.getTime();
              }
              return left === right;
            });

            if (idx === -1) {
              result.push({
                x: nestedPoint.x,
                data: []
              });

              idx = result.length - 1;
            }

            const data = result[idx].data;

            if (Array.isArray(data)) {
              data.push(nestedPoint);
            }
          }
        } else {
          result.push(point);
        }
      }
    } else {
      for (const point of series) {
        const nestedPoint = point as ChartInternalNestedDataShape;
        if (Array.isArray(nestedPoint.data)) {
          result.push({
            ...nestedPoint,
            x: nestedPoint.key,
            data: nestedPoint.data.map((d) => ({
              ...d,
              key: !isHorizontal ? d.x : d.y,
              value: !isHorizontal ? d.y : d.x
            }))
          });
        } else {
          const shallowPoint = point as ChartInternalShallowDataShape;
          result.push({
            ...shallowPoint,
            // Histograms special logic...
            x: shallowPoint.key === undefined ? shallowPoint.x0 : point.key,
            y:
              shallowPoint.value === undefined
                ? shallowPoint.y
                : shallowPoint.value
          });
        }
      }
    }

    return result;
  });

  renderRadial() {
    let { height, width, innerRadius, outerRadius } = this.props;

    innerRadius = innerRadius || 0;
    outerRadius = outerRadius || Math.min(width, height) / 2;

    const d = arc()({
      innerRadius,
      outerRadius,
      startAngle: 180,
      endAngle: Math.PI / 2
    });

    return (
      <path
        d={d!}
        opacity="0"
        cursor="auto"
        ref={this.ref}
        onMouseMove={bind(this.onMouseMove, this)}
      />
    );
  }

  renderLinear() {
    const { height, width } = this.props;

    return (
      <rect
        height={height}
        ref={this.ref}
        width={width}
        opacity={0}
        cursor="auto"
        onMouseMove={bind(this.onMouseMove, this)}
      />
    );
  }

  render() {
    const { isRadial, children, tooltip, disabled, color } = this.props;
    const { visible, placement, value } = this.state;

    return (
      <Fragment>
        {disabled && children}
        {!disabled && (
          <g onMouseLeave={bind(this.onMouseLeave, this)}>
            {isRadial && this.renderRadial()}
            {!isRadial && this.renderLinear()}
            <CloneElement<ChartTooltipProps>
              element={tooltip}
              visible={visible}
              placement={placement}
              modifiers={{
                offset: {
                  offset: '0, 15px'
                }
              }}
              reference={this.getTooltipReference()}
              color={color}
              value={value}
            />
            {children}
          </g>
        )}
      </Fragment>
    );
  }
}
