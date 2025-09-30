import type { TimeInterval } from 'd3-time';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment } from 'react';

import { getTicks } from '@/common/utils/ticks';

import type { RadialAxisTickProps } from './RadialAxisTick';
import { RadialAxisTick } from './RadialAxisTick';

export interface TickCallback {
  index?: number;
}

export interface RadialAxisTickSeriesProps {
  /**
   * Scale to use for the tick.
   */
  scale: any;

  /**
   * Number of ticks to render.
   */
  count?: number;

  /**
   * Interval between ticks.
   */
  interval?: number | TimeInterval;

  /**
   * Tick values to render.
   */
  tickValues: any[];

  /**
   * Outer radius of the arc.
   */
  outerRadius: number;

  /**
   * Type of the axis.
   */
  type: 'value' | 'category' | 'time' | 'duration';

  /**
   * Inner radius of the arc.
   */
  innerRadius: number;

  /**
   * Tick element to render.
   */
  tick:
    | ((
        tick: TickCallback
      ) => ReactElement<RadialAxisTickProps, typeof RadialAxisTick>)
    | ReactElement<RadialAxisTickProps, typeof RadialAxisTick>;

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

export const RadialAxisTickSeries: FC<Partial<RadialAxisTickSeriesProps>> = ({
  scale,
  count = 12,
  outerRadius,
  tick = <RadialAxisTick />,
  tickValues,
  innerRadius,
  interval,
  type = 'time',
  startAngle = 0,
  endAngle = 2 * Math.PI
}) => {
  const ticks = getTicks(scale, tickValues, type, count, interval || count);

  return (
    <Fragment>
      {ticks.map((data, i) => {
        const tickElement =
          typeof tick === 'function' ? tick({ index: i }) : tick;
        return (
          <CloneElement<RadialAxisTickProps>
            element={tickElement}
            key={i}
            index={i}
            scale={scale}
            data={data}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
          />
        );
      })}
    </Fragment>
  );
};
