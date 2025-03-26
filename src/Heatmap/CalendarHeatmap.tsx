import React, { FC, useCallback, useMemo } from 'react';
import { ChartShallowDataShape } from '@/common/data';
import { Heatmap, HeatmapProps } from './Heatmap';
import {
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxisTickLabel,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS
} from '@/common/Axis';
import { HeatmapSeries, HeatmapCell } from './HeatmapSeries';
import { ChartTooltip } from '@/common/Tooltip';
import { formatValue } from '@/common/utils/formatting';
import {
  buildDataScales,
  CalendarView,
  addWeeksToDate,
  weekDays
} from './calendarUtils';

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
        <LinearYAxis type="category" domain={yDomain}>
          <LinearYAxisTickSeries tickSize={20}>
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
              format={yAxisLabelFormat}
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      xAxis={
        <LinearXAxis type="category" domain={xDomain}>
          <LinearXAxisTickSeries tickValues={xTickValues}>
            <LinearXAxisTickLabel
              padding={5}
              align="end"
              format={xAxisLabelFormat}
            />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
    />
  );
};
