import React, { Fragment, Component, ReactElement } from 'react';
import { area } from 'd3-shape';
import { Gradient, GradientProps } from '../../common/Gradient';
import { Mask, MaskProps } from '../../common/Mask';
import {
  interpolate,
  InterpolationTypes
} from '../../common/utils/interpolation';
import {
  ChartInternalDataShape,
  ChartInternalShallowDataShape
} from '../../common/data';
import { CloneElement } from '../../common/utils/children';
import {
  constructFunctionProps,
  PropFunctionTypes
} from '../../common/utils/functions';
import { MotionPath, DEFAULT_TRANSITION } from '../../common/Motion';

export interface AreaProps extends PropFunctionTypes {
  /**
   * Id set internally by `AreaSeries`.
   */
  id: string;

  /**
   * Parsed data shape. Set internally by `AreaChart`.
   */
  data: ChartInternalDataShape[];

  /**
   * Interpolation for the area. Set internally by `AreaSeries`.
   */
  interpolation: InterpolationTypes;

  /**
   * Color for the area. Set internally by `AreaSeries`.
   */
  color: any;

  /**
   * D3 scale for X Axis. Set internally by `AreaChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `AreaChart`.
   */
  yScale: any;

  /**
   * Index of the area in the series. Set internally by `AreaSeries`.
   */
  index: number;

  /**
   * Whether to animate the enter/update/exit. Set internally by `AreaSeries`.
   */
  animated: boolean;

  /**
   * Mask to apply to the area.
   */
  mask: ReactElement<MaskProps, typeof Mask> | null;

  /**
   * Gradient to apply to the area.
   */
  gradient: ReactElement<GradientProps, typeof Gradient> | null;
}

export class Area extends Component<AreaProps> {
  static defaultProps: Partial<AreaProps> = {
    gradient: <Gradient />,
    interpolation: 'linear'
  };

  getAreaPath(data: ChartInternalShallowDataShape[]) {
    const { interpolation } = this.props;

    const fn = area()
      .x((d: any) => d.x)
      .y0((d: any) => d.y0)
      .y1((d: any) => d.y1)
      .curve(interpolate(interpolation));

    return fn(data as any);
  }

  getCoords() {
    const { data, xScale, yScale } = this.props;

    return data.map((item: any) => ({
      x: xScale(item.x),
      x1: xScale(item.x) - xScale(item.x1),
      y: yScale(item.y),
      y0: yScale(item.y0),
      y1: yScale(item.y1)
    })) as ChartInternalShallowDataShape[];
  }

  getAreaEnter(coords: ChartInternalShallowDataShape[]) {
    const areaPath = this.getAreaPath(coords);

    return {
      d: areaPath === null ? undefined : areaPath
    };
  }

  getAreaExit() {
    const { yScale, data, xScale } = this.props;
    const maxY = Math.max(...yScale.range());
    const coords = data.map((item: any) => ({
      x: xScale(item.x),
      x1: 0,
      y: 0,
      y1: maxY,
      y0: maxY
    })) as ChartInternalShallowDataShape[];

    const areaPath = this.getAreaPath(coords);

    return {
      d: areaPath === null ? undefined : areaPath
    };
  }

  getFill() {
    const { mask, id, gradient } = this.props;

    if (mask) {
      return `url(#mask-pattern-${id})`;
    } else {
      if (gradient) {
        return `url(#gradient-${id})`;
      }

      return '';
    }
  }

  getTransition() {
    const { animated, index } = this.props;

    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: index * 0.05
      };
    } else {
      return {
        type: false,
        delay: 0
      };
    }
  }

  renderArea(coords: ChartInternalShallowDataShape[]) {
    const { mask, id, data } = this.props;
    const fill = this.getFill();
    const maskPath = mask ? `url(#mask-${id})` : '';
    const enter = this.getAreaEnter(coords);
    const exit = this.getAreaExit();
    const extras = constructFunctionProps(this.props, data);
    const transition = this.getTransition();

    return (
      <MotionPath
        {...extras}
        pointerEvents="none"
        mask={maskPath}
        fill={fill}
        transition={transition}
        custom={{
          enter,
          exit
        }}
      />
    );
  }

  render() {
    const { id, gradient, mask, data, color, index } = this.props;
    const coords = this.getCoords();
    const stroke = color(data, index);

    return (
      <Fragment>
        {this.renderArea(coords)}
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
            color={stroke}
          />
        )}
      </Fragment>
    );
  }
}
