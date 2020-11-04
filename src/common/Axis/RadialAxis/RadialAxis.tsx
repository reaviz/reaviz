import React, { Component, Fragment, ReactElement } from 'react';
import {
  RadialAxisTickSeries,
  RadialAxisTickSeriesProps
} from './RadialAxisTickSeries';
import {
  RadialAxisArcSeries,
  RadialAxisArcSeriesProps
} from './RadialAxisArcSeries';
import { CloneElement } from 'rdk';

export interface RadialAxisProps {
  height: number;
  width: number;
  xScale: any;
  innerRadius: number;
  type: 'value' | 'time' | 'category';
  arcs: ReactElement<
    RadialAxisArcSeriesProps,
    typeof RadialAxisArcSeries
  > | null;
  ticks: ReactElement<
    RadialAxisTickSeriesProps,
    typeof RadialAxisTickSeries
  > | null;
}

export class RadialAxis extends Component<RadialAxisProps, {}> {
  static defaultProps: Partial<RadialAxisProps> = {
    innerRadius: 10,
    type: 'value',
    arcs: <RadialAxisArcSeries />,
    ticks: <RadialAxisTickSeries />
  };

  render() {
    const {
      arcs,
      ticks,
      xScale,
      height,
      width,
      innerRadius,
      type
    } = this.props;
    const outerRadius = Math.min(height, width) / 2;

    return (
      <Fragment>
        {arcs && (
          <CloneElement<RadialAxisArcSeriesProps>
            element={arcs}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
          />
        )}
        {ticks && (
          <CloneElement<RadialAxisTickSeriesProps>
            element={ticks}
            scale={xScale}
            type={type}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        )}
      </Fragment>
    );
  }
}
