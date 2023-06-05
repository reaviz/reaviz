import React from 'react';
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

export const Dates = () => (
    <HistogramBarChart
      width={350}
      height={250}
      xAxis={
        <LinearXAxis
          type="time"
          tickSeries={<LinearXAxisTickSeries interval={timeWeek} />}
        />
      }
      series={<HistogramBarSeries binSize={60 * 60 * 24 * 1000} />}
      data={medDateData}
    />
  );

export const Numbers = () => (
    <HistogramBarChart
      width={350}
      height={250}
      xAxis={<LinearXAxis type="value" />}
      series={<HistogramBarSeries binSize={1} />}
      data={histogramNumberData}
    />
  );
