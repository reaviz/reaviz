import { scaleLinear } from 'd3-scale';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React from 'react';

import { mergeDefaultProps } from '@/common/utils';

import type { RadialAxisArcProps } from './RadialAxisArc';
import { RadialAxisArc } from './RadialAxisArc';
import type {
  RadialAxisArcLine,
  RadialAxisArcLineProps
} from './RadialAxisArcLine';
import { getPointsForLevels } from './utils';

export interface RadialAxisArcSeriesProps {
  /**
   * Arc element to render.
   */
  arc: ReactElement<RadialAxisArcProps, typeof RadialAxisArc>;

  /**
   * Line element to render.
   */
  line: ReactElement<RadialAxisArcLineProps, typeof RadialAxisArcLine>;

  /**
   * Number of arcs to render.
   */
  count: number;

  /**
   * Inner radius of the arc.
   */
  innerRadius: number;

  /**
   * Outer radius of the arc.
   */
  outerRadius: number;

  /**
   * Calculated tick values by the Radial Axis.
   */
  tickValues?: any[];

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

export const RadialAxisArcSeries: FC<Partial<RadialAxisArcSeriesProps>> = (
  props
) => {
  const {
    count,
    innerRadius,
    outerRadius,
    line,
    arc,
    tickValues,
    startAngle,
    endAngle
  } = mergeDefaultProps(RADIAL_AXIS_ARC_SERIES_DEFAULT_PROPS, props);

  const scale = scaleLinear()
    .domain([0, count])
    .range([innerRadius, outerRadius]);

  const arcs = scale.ticks(count);

  const points = getPointsForLevels({
    count,
    outerRadius,
    ticks: tickValues.length,
    arcs
  });

  return (
    <>
      {line && (
        <>
          {points.map((d, i) => (
            <CloneElement<RadialAxisArcLineProps>
              element={line}
              key={i}
              data={d}
              index={i}
            />
          ))}
        </>
      )}
      {arc && (
        <>
          {arcs.map((d) => (
            <CloneElement<RadialAxisArcProps>
              element={arc}
              key={d}
              index={d}
              scale={scale}
              startAngle={startAngle}
              endAngle={endAngle}
            />
          ))}
        </>
      )}
    </>
  );
};

export const RADIAL_AXIS_ARC_SERIES_DEFAULT_PROPS = {
  count: 12,
  arc: <RadialAxisArc />,
  startAngle: 0,
  endAngle: 2 * Math.PI
};
