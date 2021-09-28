import React from 'react';
import { CalendarHeatmap } from './CalendarHeatmap';
import {
  heatmapCalendarData,
  janHeatMapData,
  febHeatMapData,
  marchHeatMapData,
  heatmapCalendarOffsetData
} from '../../demo';
import { number, object } from '@storybook/addon-knobs';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';

export default {
  title: 'Charts/Heatmap/Calendar',
  component: CalendarHeatmap,
  subcomponents: {
    HeatmapSeries,
    HeatmapCell
  }
};

export const YearCalendar = () => {
    const height = number('Height', 115);
    const width = number('Width', 715);
    const data = object('Data', heatmapCalendarData);

    return <CalendarHeatmap height={height} width={width} data={data} />;
  };

export const YearCalendarWMarchStart = () => {
    const height = number('Height', 115);
    const width = number('Width', 715);
    const data = object('Data', heatmapCalendarOffsetData);

    return <CalendarHeatmap height={height} width={width} data={data} />;
  };

YearCalendarWMarchStart.story = {
  name: 'Year Calendar w/ March Start',
};

export const MonthCalendar = () => {
    const height = number('Height', 115);
    const width = number('Width', 100);
    const data = object('Data', janHeatMapData);

    return (
      <CalendarHeatmap height={height} width={width} view="month" data={data} />
    );
  };

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
