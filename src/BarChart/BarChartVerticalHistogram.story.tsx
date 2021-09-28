import React from 'react';
import { number, object } from '@storybook/addon-knobs';
import {
  medDateData,
  histogramNumberData
} from '../../demo';
import { timeWeek } from 'd3-time';
import {
  Bar,
  BarLabel,
  BarSeries,
  GuideBar,
  HistogramBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  StackedBarSeries,
  StackedNormalizedBarSeries
} from './BarSeries';
import {
  LinearXAxis,
  LinearXAxisTickSeries
} from '../common/Axis/LinearAxis';
import { HistogramBarChart } from './HistogramBarChart';

export default {
  title: 'Charts/Bar Chart/Vertical/Histogram',
  component: HistogramBarChart,
  subcomponents: {
    BarSeries,
    StackedBarSeries,
    StackedNormalizedBarSeries,
    MarimekkoBarSeries,
    RangeLines,
    Bar,
    BarLabel,
    GuideBar,
    HistogramBarSeries
  }
};

export const Dates = () => {
    const binSize = number('Bin Size', 60 * 60 * 24 * 1000);
    const data = object('Data', medDateData);

    return (
      <HistogramBarChart
        width={350}
        height={250}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={<LinearXAxisTickSeries interval={timeWeek} />}
          />
        }
        series={<HistogramBarSeries binSize={binSize} />}
        data={data}
      />
    );
  };

export const Numbers = () => {
    const binSize = number('Bin Size', 1);
    const data = object('Data', histogramNumberData);

    return (
      <HistogramBarChart
        width={350}
        height={250}
        xAxis={<LinearXAxis type="value" />}
        series={<HistogramBarSeries binSize={binSize} />}
        data={data}
      />
    );
  };
