import Reac from 'react';
import {
  singleDateData
} from '../../demo';
import { AreaChart } from './AreaChart';
import { GridlineSeries, Gridline } from '../common/Gridline';

export default {
  title: 'Charts/Area Chart/Gridlines',
};

export const AllAxes = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  );

export const XAxis = () => (
    <AreaChart
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
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    />
  );

YAxis.story = {
  name: 'Y-Axis',
};
