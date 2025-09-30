import type { FC } from 'react';
import React, { useCallback, useMemo } from 'react';

import {
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries
} from '@/common/Axis';
import type { ChartShallowDataShape } from '@/common/data';
import { ChartTooltip } from '@/common/Tooltip';
import { formatValue } from '@/common/utils/formatting';

import type { CalendarView } from './calendarUtils';
import { addWeeksToDate, buildDataScales, weekDays } from './calendarUtils';
import type { HeatmapProps } from './Heatmap';
import { Heatmap } from './Heatmap';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';

export interface CalendarHeatmapProps extends Omit<HeatmapProps, 'data'> {
  /**
   * Chart data shape.
   */
  data: ChartShallowDataShape[];

  /**
   * Height of the component.
   */
  height: number;

  /**
   * Width of the component.
   */
  width: number;

  /**
   * View of the calendar renderer.
   */
  view: CalendarView;
}

export const CalendarHeatmap: FC<Partial<CalendarHeatmapProps>> = ({
  view = 'year',
  data,
  series = (
    <HeatmapSeries
      padding={0.3}
      emptyColor="transparent"
      cell={
        <HeatmapCell
          tooltip={
            <ChartTooltip
              content={(d) =>
                `${formatValue(d.data.metadata.date)} ∙ ${formatValue(
                  d.data.value
                )}`
              }
            />
          }
        />
      }
    />
  ),
  ...rest
}) => {
  const {
    data: domainData,
    yDomain,
    xDomain,
    start
  } = useMemo(() => buildDataScales(data, view), [data, view]);

  // For month, only pass 1 tick value
  const xTickValues = view === 'year' ? undefined : [1];

  const getDayOfWeek = useCallback((day: number) => weekDays[day], []);

  // Get the yAxis label formatting based on view type
  const yAxisLabelFormat = useMemo(
    () => (view === 'year' ? getDayOfWeek : () => null),
    [getDayOfWeek, view]
  );

  // Format the xAxis label for the start + n week
  const xAxisLabelFormat = useCallback(
    (weeks: number) =>
      addWeeksToDate(start, weeks).toLocaleString('default', { month: 'long' }),
    [start]
  );

  return (
    <Heatmap
      {...rest}
      series={series}
      data={domainData}
      yAxis={
        <LinearYAxis
          type="category"
          axisLine={null}
          domain={yDomain}
          tickSeries={
            <LinearYAxisTickSeries
              tickSize={20}
              line={null}
              label={
                <LinearYAxisTickLabel padding={5} format={yAxisLabelFormat} />
              }
            />
          }
        />
      }
      xAxis={
        <LinearXAxis
          type="category"
          axisLine={null}
          domain={xDomain}
          tickSeries={
            <LinearXAxisTickSeries
              line={null}
              tickValues={xTickValues}
              label={
                <LinearXAxisTickLabel
                  padding={5}
                  align="end"
                  format={xAxisLabelFormat}
                />
              }
            />
          }
        />
      }
    />
  );
};
