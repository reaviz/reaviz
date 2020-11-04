import React, { Component, Fragment, ReactElement } from 'react';
import { RadialAxisArc, RadialAxisArcProps } from './RadialAxisArc';
import { CloneElement } from 'rdk';
import { scaleLinear } from 'd3-scale';

export interface RadialAxisArcSeriesProps {
  arc: ReactElement<RadialAxisArcProps, typeof RadialAxisArc>;
  count: number;
  innerRadius: number;
  outerRadius: number;
}

export class RadialAxisArcSeries extends Component<RadialAxisArcSeriesProps> {
  static defaultProps: Partial<RadialAxisArcSeriesProps> = {
    count: 12,
    arc: <RadialAxisArc />
  };

  render() {
    const { count, innerRadius, outerRadius, arc } = this.props;

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
  }
}
