import React from 'react';
import { singleDateData } from 'reaviz-data-utils';

import { Area, AreaChart, AreaSeries, Line } from '@/AreaChart';
import { LineChart, LineSeries } from '@/LineChart';

import { Gradient } from './Gradient';
import { GradientStop } from './GradientStop';

export default {
  title: 'Utils/Gradient/Linear',
  component: Gradient,
  subcomponents: {
    GradientStop,
  },
};

export const Simple = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        interpolation="linear"
        colorScheme="cybertron"
        area={<Area gradient={<Gradient />} />}
      />
    }
  />
);

export const LineGradient = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <LineSeries
        interpolation="linear"
        colorScheme="cybertron"
        line={<Line strokeWidth={4} gradient={<Gradient />} />}
      />
    }
  />
);
