import React from 'react';
import { BarChart } from './BarChart';
import {
  categoryData
} from '../../demo';
import { GridlineSeries, Gridline } from '../common/Gridline';
import { Bar, BarLabel, BarSeries, GuideBar, HistogramBarSeries, MarimekkoBarSeries, RangeLines, StackedBarSeries, StackedNormalizedBarSeries } from './BarSeries';

export default {
  title: 'Charts/Bar Chart/Gridlines',
  component: BarChart,
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

export const AllAxes = () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  );

export const XAxis = () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    />
  );

XAxis.story = {
  name: 'X-Axis',
};

export const YAxis = () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    />
  );

YAxis.story = {
  name: 'Y-Axis',
};
