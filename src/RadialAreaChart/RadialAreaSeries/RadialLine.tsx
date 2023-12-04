import React, { useCallback, useMemo, FC } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import {
  radialLine,
  curveCardinalClosed,
  curveLinearClosed,
  curveCardinal,
  curveLinear
} from 'd3-shape';
import { RadialInterpolationTypes } from '../../common/utils/interpolation';
import { MotionPath, DEFAULT_TRANSITION } from '../../common/Motion';

export interface RadialLineProps {
  /**
   * Parsed data shape. Set internally by `RadialAreaChart`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Whether to animate the enter/update/exit. Set internally by `RadialAreaSeries`.
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
   * Color for the area. Set internally by `RadialAreaSeries`.
   */
  color: any;

  /**
   * Interpolation for the area. Set internally by `RadialAreaSeries`.
   */
  interpolation: RadialInterpolationTypes;

  /**
   * Index of the area in the series. Set internally by `RadialAreaSeries`.
   */
  index: number;

  /**
   * Stroke width of the line.
   */
  strokeWidth: number;

  /**
   * CSS classes to apply.
   */
  className?: string;

  /**
   * Internal property to identify if there is a area or not.
   */
  hasArea: boolean;

  /**
   * Whether the curve should be closed. Set to true by deafult
   */
  isClosedCurve: boolean;

  /**
   * A callback function that is invoked when the animation of the chart finishes. Set internally by `RadialAreaSeries`.
   */
  onAnimationFinished: () => void;
}

export const RadialLine: FC<Partial<RadialLineProps>> = ({
  xScale,
  yScale,
  className,
  index,
  hasArea,
  color,
  data,
  interpolation,
  strokeWidth,
  animated,
  isClosedCurve,
  onAnimationFinished
}) => {
  const fill = color(data, index);

  const getPath = useCallback(
    (preData: ChartInternalShallowDataShape[]) => {
      const curve =
        interpolation === 'smooth' ? (isClosedCurve ? curveCardinalClosed : curveCardinal) : isClosedCurve ? curveLinearClosed : curveLinear;

      const radialFn = radialLine()
        .angle((d: any) => xScale(d.x))
        .radius((d: any) => yScale(d.y))
        .curve(curve);

      return radialFn(preData as any);
    },
    [interpolation, isClosedCurve, xScale, yScale]
  );

  const transition = useMemo(
    () =>
      animated
        ? {
          ...DEFAULT_TRANSITION,
          delay: hasArea ? 0 : index * 0.05
        }
        : {
          type: false,
          delay: 0
        },
    [animated, index, hasArea]
  );

  const enter = useMemo(
    () => ({
      d: getPath(data!),
      opacity: 1
    }),
    [data, getPath]
  );

  const exit = useMemo(() => {
    const [yStart] = yScale.domain();
    return {
      d: getPath(data!.map((d) => ({ ...d, y: yStart }))),
      opacity: 0
    };
  }, [data, yScale, getPath]);

  return (
    <MotionPath
      custom={{
        enter,
        exit
      }}
      transition={transition}
      className={className}
      pointerEvents="none"
      stroke={fill}
      fill="none"
      strokeWidth={strokeWidth}
      onAnimationFinished={onAnimationFinished}
    />
  );
};

RadialLine.defaultProps = {
  strokeWidth: 2,
  animated: true,
  isClosedCurve: true
};
