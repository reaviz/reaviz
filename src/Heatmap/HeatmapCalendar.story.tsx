import React, { useState } from 'react';
import { CalendarHeatmap } from './CalendarHeatmap';
import {
  heatmapCalendarData,
  janHeatMapData,
  febHeatMapData,
  marchHeatMapData,
  heatmapCalendarOffsetData
} from '../../demo';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';
import { ChartTooltip, formatValue } from '@/common';

export default {
  title: 'Charts/Heatmap/Calendar',
  component: CalendarHeatmap,
  subcomponents: {
    HeatmapSeries,
    HeatmapCell
  }
};

export const YearCalendar = () => (
  <CalendarHeatmap height={115} width={715} data={heatmapCalendarData} />
);

export const YearCalendarMarchStart = () => (
  <CalendarHeatmap height={115} width={715} data={heatmapCalendarOffsetData} />
);

export const MonthCalendar = () => (
  <CalendarHeatmap
    height={115}
    width={100}
    view="month"
    data={janHeatMapData}
  />
);

export const MultiMonthCalendar = () => (
  <div style={{ display: 'flex' }}>
    <CalendarHeatmap
      height={115}
      width={100}
      view="month"
      data={janHeatMapData}
    />
    <CalendarHeatmap
      height={115}
      width={100}
      view="month"
      data={febHeatMapData}
    />
    <CalendarHeatmap
      height={115}
      width={100}
      view="month"
      data={marchHeatMapData}
    />
  </div>
);

export const SelectCell = () => {
  const [activePoints, setActivePoints] = useState<any | null>(null);

  return (
    <div style={{ width: '300px' }}>
      <CalendarHeatmap
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
      />
      <div>Selected Date:{activePoints?.[0]?.metadata.date.toDateString()}</div>
    </div>
  );
};
