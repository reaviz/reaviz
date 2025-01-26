import React, { useState } from 'react';
import { CalendarHeatmap } from './CalendarHeatmap';
import {
  heatmapCalendarData,
  janHeatMapData,
  febHeatMapData,
  marchHeatMapData,
  heatmapCalendarOffsetData
} from 'reaviz-data-utils';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';
import {
  ChartTooltip,
  formatValue,
  LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries
} from '@/common';

export default {
  tags: ['snapshot'],
  title: 'Charts/Heatmap/Calendar',
  component: CalendarHeatmap,
  subcomponents: {
    HeatmapSeries,
    HeatmapCell
  }
};

export const YearCalendar = () => (
  <CalendarHeatmap
    id="year-calendar"
    height={115}
    width={715}
    data={heatmapCalendarData}
  />
);

export const YearCalendarMarchStart = () => (
  <CalendarHeatmap height={115} width={715} data={heatmapCalendarOffsetData} />
);

export const MonthCalendar = () => (
  <CalendarHeatmap
    id="month-calendar"
    height={115}
    width={100}
    view="month"
    data={janHeatMapData}
  />
);

export const MultiMonthCalendar = () => (
  <div style={{ display: 'flex' }}>
    <CalendarHeatmap
      id="multi-month-calendar-1"
      height={115}
      width={100}
      view="month"
      data={janHeatMapData}
      yAxis={
        <LinearYAxis type="category">
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      xAxis={
        <LinearXAxis type="category">
          <LinearXAxisTickSeries>
            <LinearXAxisTickLabel
              {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
    />
    <CalendarHeatmap
      id="multi-month-calendar-2"
      height={115}
      width={100}
      view="month"
      data={febHeatMapData}
      yAxis={
        <LinearYAxis type="category">
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      xAxis={
        <LinearXAxis type="category">
          <LinearXAxisTickSeries>
            <LinearXAxisTickLabel
              {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
    />
    <CalendarHeatmap
      id="multi-month-calendar-3"
      height={115}
      width={100}
      view="month"
      data={marchHeatMapData}
      yAxis={
        <LinearYAxis type="category">
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      xAxis={
        <LinearXAxis type="category">
          <LinearXAxisTickSeries>
            <LinearXAxisTickLabel
              {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
    />
  </div>
);

export const SelectCell = () => {
  const [activePoints, setActivePoints] = useState<any | null>(null);

  return (
    <div style={{ width: '300px' }}>
      <CalendarHeatmap
        id="select-cell"
        height={115}
        width={100}
        data={janHeatMapData}
        view="month"
        series={
          <HeatmapSeries
            padding={0.3}
            colorScheme={(data, index, active) =>
              data.metadata.date.valueOf() ===
              active?.[0]?.metadata.date.valueOf()
                ? 'red'
                : 'blue'
            }
            selections={activePoints}
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
                onClick={(e) => {
                  if (
                    activePoints?.[0]?.metadata.date.valueOf() ===
                    e.value?.metadata.date.valueOf()
                  ) {
                    setActivePoints(null);
                  } else {
                    setActivePoints([e.value]);
                  }
                }}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis type="category">
            <LinearYAxisTickSeries>
              <LinearYAxisTickLabel
                {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
                padding={5}
              />
            </LinearYAxisTickSeries>
          </LinearYAxis>
        }
        xAxis={
          <LinearXAxis type="category">
            <LinearXAxisTickSeries>
              <LinearXAxisTickLabel
                {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
                padding={5}
              />
            </LinearXAxisTickSeries>
          </LinearXAxis>
        }
      />
      <div>Selected Date:{activePoints?.[0]?.metadata.date.toDateString()}</div>
    </div>
  );
};
