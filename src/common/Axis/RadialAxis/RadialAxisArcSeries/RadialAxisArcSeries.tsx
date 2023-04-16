import React, { FC, Fragment, ReactElement } from 'react';
import { RadialAxisArc, RadialAxisArcProps } from './RadialAxisArc';
import { CloneElement } from 'rdk';
import { scaleLinear } from 'd3-scale';

export interface RadialAxisArcSeriesProps {
  /**
   * Arc element to render.
   */
  arc: ReactElement<RadialAxisArcProps, typeof RadialAxisArc>;

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
}

export const RadialAxisArcSeries: FC<Partial<RadialAxisArcSeriesProps>> = ({
  count,
  innerRadius,
  outerRadius,
  arc
}) => {
  const scale = scaleLinear()
    .domain([0, count])
    .range([innerRadius, outerRadius]);

  const arcs = scale.ticks(count);

  return (
    <Fragment>
      {arcs.map((d) => (
        <CloneElement<RadialAxisArcProps>
          element={arc}
          key={d}
          index={d}
          scale={scale}
        />
      ))}
    </Fragment>
  );
};

RadialAxisArcSeries.defaultProps = {
  count: 12,
  arc: <RadialAxisArc />
};
