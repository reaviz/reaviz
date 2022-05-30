import React, { ReactElement, useCallback, FC, useMemo, Fragment } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { radialArea, curveCardinalClosed, curveLinearClosed } from 'd3-shape';
import { RadialGradient, RadialGradientProps } from '../../common/Gradient';
import { CloneElement } from 'rdk';
import { RadialInterpolationTypes } from '../../common/utils/interpolation';
import { MotionPath, DEFAULT_TRANSITION } from '../../common/Motion';

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
  className?: any;

  /**
   * Gradient to apply to the area.
   */
  gradient: ReactElement<RadialGradientProps, typeof RadialGradient> | null;
}

export const RadialArea: FC<Partial<RadialAreaProps>> = ({
  id,
  data,
  className,
  yScale,
  color,
  animated,
  outerRadius,
  xScale,
  innerRadius,
  interpolation,
  gradient
}) => {
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

  const getFill = useCallback(
    (c: string) => {
      if (!gradient) {
        return c;
      }

      return `url(#${id}-gradient)`;
    },
    [id, gradient]
  );

  const getPath = useCallback(
    (d: ChartInternalShallowDataShape[]) => {
      const curve =
        interpolation === 'smooth' ? curveCardinalClosed : curveLinearClosed;

      const radialFn = radialArea()
        .angle((dd: any) => xScale(dd.x))
        .innerRadius((_) => innerRadius!)
        .outerRadius((d: any) => yScale(d.y))
        .curve(curve);

      return radialFn(d as any);
    },
    [xScale, yScale, interpolation, innerRadius]
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
  }, [data, getPath, yScale]);

  const fill = color(data, 0);

  return (
    <Fragment>
      <MotionPath
        custom={{
          enter,
          exit
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

RadialArea.defaultProps = {
  gradient: <RadialGradient />
};
