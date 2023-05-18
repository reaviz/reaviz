import React from 'react';
import { BarChart } from './BarChart';
import { categoryData } from '../../demo';
import { GridlineSeries, Gridline } from '../common/Gridline';
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
import { MarkLineY } from '../common';

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

export const AllAxesShowMarkLineY = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    gridlines={
      <GridlineSeries
        line={<Gridline direction="all" />}
        markLineY={
          <MarkLineY
            height={234}
            pointY={104}
            width={333}
            text="Goal 700k"
            color="white"
          />
        }
      />
    }
  />
);

AllAxesShowMarkLineY.story = {
  name: 'All Axes Show Mark Line Y'
};

export const XAxis = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
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
  />
);

YAxis.story = {
  name: 'Y-Axis'
};
