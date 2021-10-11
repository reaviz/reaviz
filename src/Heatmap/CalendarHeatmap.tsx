import React, { FC, useMemo } from 'react';
import { ChartShallowDataShape } from '../common/data';
import { Heatmap, HeatmapProps } from './Heatmap';
import {
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxisTickLabel
} from '../common/Axis';
import { HeatmapSeries, HeatmapCell } from './HeatmapSeries';
import { ChartTooltip } from '../common/Tooltip';
import { formatValue } from '../common/utils/formatting';
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

// Format the xAxis label for the start + n week
const xAxisLabelFormat = (start: Date) => (weeks: number) =>
  addWeeksToDate(start, weeks).toLocaleString('default', { month: 'long' });

export const CalendarHeatmap: FC<Partial<CalendarHeatmapProps>> = ({
  view,
  series,
  data,
  ...rest
}) => {
  const { data: domainData, yDomain, xDomain, start } = useMemo(() => buildDataScales(data, view), [data, view]);

  // For month, only pass 1 tick value
  const xTickValues = view === 'year' ? undefined : [1];

  // Get the yAxis label formatting based on view type
  const yAxisLabelFormat = view === 'year' ? (d) => weekDays[d] : () => null;

  return (
    <Heatmap
      {...rest}
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
                  format={xAxisLabelFormat(start)}
                />
              }
            />
          }
        />
      }
    />
  );
};

CalendarHeatmap.defaultProps = {
  view: 'year',
  series: (
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
  )
};
