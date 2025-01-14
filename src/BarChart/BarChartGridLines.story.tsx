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
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisLine,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries
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
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
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
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
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
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

YAxis.story = {
  name: 'Y-Axis'
};
