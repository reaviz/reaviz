import React from 'react';
import { Gradient } from './Gradient';
import { Area, AreaChart, AreaSeries } from '../../AreaChart';
import { singleDateData } from '../../../demo';
import { GradientStop } from './GradientStop';

export default {
  title: 'Utils/Gradient/Linear',
  component: Gradient,
  subcomponents: {
    GradientStop
  }
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
