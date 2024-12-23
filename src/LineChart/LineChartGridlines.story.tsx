import React from 'react';
import { singleDateData } from 'reaviz-data-utils';
import { LineChart } from './LineChart';
import { GridlineSeries, Gridline } from '@/common/Gridline';
import {
  LinearAxisLine,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis
} from '@/common';

export default {
  tags: ['snapshot'],
  title: 'Charts/Line Chart/Gridlines',
  component: LineChart
};

export const AllAxes = () => (
  <LineChart
    id="all-axes"
    width={350}
    height={250}
    data={singleDateData}
    gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    xAxis={
      <LinearXAxis type="time">
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
  <LineChart
    id="x-axis"
    width={350}
    height={250}
    data={singleDateData}
    gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    xAxis={
      <LinearXAxis type="time">
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
  <LineChart
    id="y-axis"
    width={350}
    height={250}
    data={singleDateData}
    gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    xAxis={
      <LinearXAxis type="time">
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
