import { singleDateData } from 'reaviz-data-utils';

import { Gridline, GridlineSeries } from '@/common/Gridline';

import { AreaChart } from './AreaChart';
import {
  Area,
  AreaSeries,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries,
} from './AreaSeries';

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
    StackedNormalizedAreaSeries,
  },
};

export const AllAxes = () => (
  <AreaChart
    id="all-axes"
    width={350}
    height={250}
    data={singleDateData}
    gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
  />
);

export const XAxis = () => (
  <AreaChart
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
  <AreaChart
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
