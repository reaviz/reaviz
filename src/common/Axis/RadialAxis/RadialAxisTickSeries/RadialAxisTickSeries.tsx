import React, { FC, Fragment, ReactElement, useCallback, useMemo } from 'react';
import { RadialAxisTick, RadialAxisTickProps } from './RadialAxisTick';
import { CloneElement } from 'reablocks';
import { getTicks } from '@/common/utils/ticks';
import { TimeInterval } from 'd3-time';
import { ChartDataShape } from '@/common/data';

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

  /**
   * Url Map .
   */
  urls?: Map<string | number, string | undefined>;
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
  endAngle = 2 * Math.PI,
  urls
}) => {
  const ticks = getTicks(scale, tickValues, type, count, interval || count);

  /**
   * Gets the url *if any* of the tick.
   */
  const getUrl = useCallback((tick: number) => urls.get(tick), [urls]);

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
            url={urls && getUrl(data)}
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
