import React, { FC, Fragment, ReactElement } from 'react';
import { RadialAxisTick, RadialAxisTickProps } from './RadialAxisTick';
import { CloneElement } from 'rdk';
import { getTicks } from '../../../utils/ticks';
import { TimeInterval } from 'd3-time';

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
  tick: ReactElement<RadialAxisTickProps, typeof RadialAxisTick>;

  /**
   * Whether to render a semicircle or a full circle
   * Renders a full circle by default
   */
  isSemiCircle?: boolean;
}

export const RadialAxisTickSeries: FC<Partial<RadialAxisTickSeriesProps>> = ({
  scale,
  count,
  outerRadius,
  tick,
  tickValues,
  innerRadius,
  interval,
  type,
  isSemiCircle
}) => {
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
          isSemiCircle={isSemiCircle}
        />
      ))}
    </Fragment>
  );
};

RadialAxisTickSeries.defaultProps = {
  count: 12,
  type: 'time',
  tick: <RadialAxisTick />,
  isSemiCircle: false
};
