import React from 'react';
import { singleDateData } from 'reaviz-data-utils';

import { Gridline, GridlineSeries } from '@/common/Gridline';

import { LineChart } from './LineChart';

export default {
  tags: ['snapshot'],
  title: 'Charts/Line Chart/Gridlines',
  component: LineChart,
};

export const AllAxes = () => (
  <LineChart
    id="all-axes"
    width={350}
    height={250}
    data={singleDateData}
    gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
  />
);

export const XAxis = () => (
  <LineChart
    id="x-axis"
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
    id="y-axis"
    width={350}
    height={250}
    data={singleDateData}
    gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
  />
);

YAxis.story = {
  name: 'Y-Axis',
};
