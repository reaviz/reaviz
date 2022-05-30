import React, { useCallback, useMemo, FC } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { radialLine, curveCardinalClosed, curveLinearClosed } from 'd3-shape';
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
   * Stroke width of the line.
   */
  strokeWidth: number;

  /**
   * CSS classes to apply.
   */
  className?: string;
}

export const RadialLine: FC<Partial<RadialLineProps>> = ({
  xScale,
  yScale,
  className,
  color,
  data,
  interpolation,
  strokeWidth,
  animated
}) => {
  const getPath = useCallback(
    (preData: ChartInternalShallowDataShape[]) => {
      const curve =
        interpolation === 'smooth' ? curveCardinalClosed : curveLinearClosed;

      const radialFn = radialLine()
        .angle((d: any) => xScale(d.x))
        .radius((d: any) => yScale(d.y))
        .curve(curve);

      return radialFn(preData as any);
    },
    [xScale, yScale, interpolation]
  );

  const transition = useMemo(
    () =>
      animated
        ? { ...DEFAULT_TRANSITION }
        : {
          type: false,
          delay: 0
        },
    [animated]
  );

  const fill = color(data, 0);

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
    />
  );
};

RadialLine.defaultProps = {
  strokeWidth: 2,
  animated: true
};
