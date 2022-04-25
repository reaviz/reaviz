import React, { Fragment, useMemo, ReactElement, FC, useCallback } from 'react';
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
import { CloneElement } from 'rdk';
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
   * Total number of areas in the series. Set internally by `AreaSeries`.
   */
  total: number;

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

export const Area: FC<Partial<AreaProps>> = ({
  id,
  gradient,
  mask,
  data,
  color,
  index,
  total,
  xScale,
  yScale,
  animated,
  interpolation,
  ...rest
}) => {
  const stroke = color(data, index);

  const coords = useMemo(() => {
    return data.map((item: any) => ({
      x: xScale(item.x),
      x1: xScale(item.x) - xScale(item.x1),
      y: yScale(item.y),
      y0: yScale(item.y0),
      y1: yScale(item.y1)
    })) as ChartInternalShallowDataShape[];
  }, [data, xScale, yScale]);

  const getAreaPath = useCallback(
    (d: ChartInternalShallowDataShape[]) => {
      // If the input data is a single value and this is the only
      // area in a series, fill the available space with an area:
      if (d.length === 1 && total === 1) {
        const [point] = d;
        // Assume the single data point's `x` value
        // is the middle of the graph:
        const midpoint = point.x as number;
        d = [{ ...point }, { ...point }];
        const [start, end] = d;
        start.x = 0;
        end.x = midpoint * 2;
      }

      const fn = area()
        .x((d: any) => d.x)
        .y0((d: any) => d.y0)
        .y1((d: any) => d.y1)
        .curve(interpolate(interpolation));

      return fn(d as any);
    },
    [interpolation, total]
  );

  const enter = useMemo(() => {
    const areaPath = getAreaPath(coords);

    return {
      d: areaPath === null ? undefined : areaPath
    };
  }, [coords, getAreaPath]);

  const exit = useMemo(() => {
    const maxY = Math.max(...yScale.range());
    const coords = data.map((item: any) => ({
      x: xScale(item.x),
      x1: 0,
      y: 0,
      y1: maxY,
      y0: maxY
    })) as ChartInternalShallowDataShape[];

    const areaPath = getAreaPath(coords);

    return {
      d: areaPath === null ? undefined : areaPath
    };
  }, [data, getAreaPath, xScale, yScale]);

  const fill = useMemo(() => {
    if (mask) {
      return `url(#mask-pattern-${id})`;
    } else {
      if (gradient) {
        return `url(#gradient-${id})`;
      }

      return '';
    }
  }, [gradient, id, mask]);

  const transition = useMemo(() => {
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
  }, [animated, index]);

  const renderArea = useCallback(() => {
    const maskPath = mask ? `url(#mask-${id})` : '';
    const extras = constructFunctionProps(rest, data);

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
  }, [data, enter, exit, fill, id, mask, rest, transition]);

  return (
    <Fragment>
      {renderArea()}
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
};

Area.defaultProps = {
  gradient: <Gradient />,
  interpolation: 'linear'
};
