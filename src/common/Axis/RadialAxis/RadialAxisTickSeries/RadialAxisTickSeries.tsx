import React, { Component, Fragment, ReactElement } from 'react';
import { RadialAxisTick, RadialAxisTickProps } from './RadialAxisTick';
import { CloneElement } from 'rdk';
import { getTicks } from '../../../utils/ticks';
import { TimeInterval } from 'd3-time';

export interface RadialAxisTickSeriesProps {
  scale: any;
  count?: number;
  interval?: number | TimeInterval;
  tickValues: any[];
  outerRadius: number;
  type: 'value' | 'category' | 'time' | 'duration';
  innerRadius: number;
  tick: ReactElement<RadialAxisTickProps, typeof RadialAxisTick>;
}

export class RadialAxisTickSeries extends Component<RadialAxisTickSeriesProps> {
  static defaultProps: Partial<RadialAxisTickSeriesProps> = {
    count: 12,
    type: 'time',
    tick: <RadialAxisTick />
  };

  render() {
    const {
      scale,
      count,
      outerRadius,
      tick,
      tickValues,
      innerRadius,
      interval,
      type
    } = this.props;
    const ticks = getTicks(scale, tickValues, type, count, interval || count);

    return (
      <Fragment>
        {ticks.map((data, i) => (
          <CloneElement<RadialAxisTickProps>
            element={tick}
            key={i}
            index={i}
            scale={scale}
            data={data}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        ))}
      </Fragment>
    );
  }
}
