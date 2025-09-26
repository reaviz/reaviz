import {
  curveCardinal,
  curveCardinalClosed,
  curveLinear,
  curveLinearClosed,
  radialArea,
} from 'd3-shape';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment, useCallback, useMemo } from 'react';

import type { ChartInternalShallowDataShape } from '@/common/data';
import type { RadialGradientProps } from '@/common/Gradient';
import { RadialGradient } from '@/common/Gradient';
import { DEFAULT_TRANSITION, MotionPath } from '@/common/Motion';
import type { RadialInterpolationTypes } from '@/common/utils/interpolation';

export interface RadialAreaProps {
  /**
   * Parsed data shape. Set internally by `RadialAreaChart`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * D3 scale for X Axis. Set internally by `RadialAreaChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialAreaChart`.
   */
  yScale: any;

  /**
   * Interpolation for the area. Set internally by `RadialAreaSeries`.
   */
  interpolation: RadialInterpolationTypes;

  /**
   * Color for the area. Set internally by `RadialAreaSeries`.
   */
  color: any;

  /**
   * Id set internally by `RadialAreaSeries`.
   */
  id: string;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;

  /**
   * The outer radius for the chart center.
   */
  outerRadius: number;

  /**
   * CSS classes to apply.
   */
  className?: string;

  /**
   * Index of the area in the series. Set internally by `RadialAreaSeries`.
   */
  index: number;

  /**
   * Gradient to apply to the area.
   */
  gradient: ReactElement<RadialGradientProps, typeof RadialGradient> | null;

  /**
   * Whether the curve should be closed. Set to true by deafult
   */
  isClosedCurve: boolean;
}

export const RadialArea: FC<Partial<RadialAreaProps>> = ({
  id,
  data,
  className,
  yScale,
  color,
  animated,
  index,
  outerRadius,
  xScale,
  innerRadius,
  interpolation,
  gradient = <RadialGradient />,
  isClosedCurve = true,
}) => {
  const transition = useMemo(
    () =>
      animated
        ? {
            ...DEFAULT_TRANSITION,
            delay: index * 0.05,
          }
        : {
            type: false as const,
            delay: 0,
          },
    [animated, index],
  );

  const getFill = useCallback(
    (c: string) => {
      if (!gradient) {
        return c;
      }

      return `url(#${id}-gradient)`;
    },
    [id, gradient],
  );

  const getPath = useCallback(
    (d: ChartInternalShallowDataShape[]) => {
      const curve =
        interpolation === 'smooth'
          ? isClosedCurve
            ? curveCardinalClosed
            : curveCardinal
          : isClosedCurve
            ? curveLinearClosed
            : curveLinear;

      const radialFn = radialArea()
        .angle((dd: any) => xScale(dd.x))
        .innerRadius((_) => innerRadius!)
        .outerRadius((d: any) => yScale(d.y))
        .curve(curve);

      return radialFn(d as any);
    },
    [interpolation, isClosedCurve, xScale, innerRadius, yScale],
  );

  const enter = useMemo(
    () => ({
      d: getPath(data!),
      opacity: 1,
    }),
    [data, getPath],
  );

  const exit = useMemo(() => {
    const [yStart] = yScale.domain();
    return {
      d: getPath(data!.map((d) => ({ ...d, y: yStart }))),
      opacity: 0,
    };
  }, [data, getPath, yScale]);

  const fill = color(data, 0);

  return (
    <Fragment>
      <MotionPath
        custom={{
          enter,
          exit,
        }}
        transition={transition}
        pointerEvents="none"
        className={className}
        fill={getFill(color)}
      />
      {gradient && (
        <CloneElement<RadialGradientProps>
          element={gradient}
          id={`${id}-gradient`}
          radius={outerRadius}
          color={fill}
        />
      )}
    </Fragment>
  );
};
