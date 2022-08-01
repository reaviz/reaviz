import React from 'react';
import { CalendarHeatmap } from './CalendarHeatmap';
import {
  heatmapCalendarData,
  janHeatMapData,
  febHeatMapData,
  marchHeatMapData,
  heatmapCalendarOffsetData
} from '../../demo';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';

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
