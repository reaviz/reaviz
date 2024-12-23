import Reac from 'react';
import { singleDateData } from 'reaviz-data-utils';
import { AreaChart } from './AreaChart';
import { GridlineSeries, Gridline } from '@/common/Gridline';
import {
  Area,
  AreaSeries,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries
} from './AreaSeries';
import { LinearAxisLine, LinearXAxis, LinearYAxis } from '@/common';

export default {
  tags: ['snapshot'],
  title: 'Charts/Area Chart/Gridlines',
  component: AreaChart,
  subcomponents: {
    AreaSeries,
    Area,
    Line,
    PointSeries,
    StackedAreaSeries,
    StackedNormalizedAreaSeries
  }
};

export const AllAxes = () => (
  <AreaChart
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
  <AreaChart
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
  <AreaChart
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
