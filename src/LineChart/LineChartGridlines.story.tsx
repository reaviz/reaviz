import React from 'react';
import {
  singleDateData
} from '../../demo';
import { LineChart } from './LineChart';
import { GridlineSeries, Gridline } from '../common/Gridline';

export default {
  title: 'Charts/Line Chart/Gridlines',
  component: LineChart
};

export const AllAxes = () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  );

export const XAxis = () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    />
  );

XAxis.story = {
  name: 'X-Axis',
};

export const YAxis = () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    />
  );

YAxis.story = {
  name: 'Y-Axis',
};
