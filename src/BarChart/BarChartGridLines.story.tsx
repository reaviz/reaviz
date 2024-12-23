import React from 'react';
import { BarChart } from './BarChart';
import { categoryData } from 'reaviz-data-utils';
import { GridlineSeries, Gridline } from '@/common/Gridline';
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
  LinearAxisLine,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis
} from '@/common';

export default {
  tags: ['snapshot'],
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
    xAxis={
      <LinearXAxis
        type="category"
        tickSeries={<LinearXAxisTickSeries tickSize={20} />}
      >
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

export const XAxis = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    xAxis={
      <LinearXAxis
        type="category"
        tickSeries={<LinearXAxisTickSeries tickSize={20} />}
      >
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

XAxis.story = {
  name: 'X-Axis'
};

export const YAxis = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    xAxis={
      <LinearXAxis
        type="category"
        tickSeries={<LinearXAxisTickSeries tickSize={20} />}
      >
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

YAxis.story = {
  name: 'Y-Axis'
};
