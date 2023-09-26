import React from 'react';
import { GradientStop } from './GradientStop';
import { RadialGradient } from './RadialGradient';
import { RadialArea, RadialAreaChart, RadialAreaSeries } from '../../RadialAreaChart';
import { categoryData } from '../../../demo';
import { RadialAxis } from '../Axis/RadialAxis';

export default {
  title: 'Utils/Gradient/Radial',
  component: RadialGradient,
  subcomponents: {
    GradientStop
  }
};

export const Simple = () => (
  <RadialAreaChart
    data={categoryData}
    height={500}
    width={500}
    axis={<RadialAxis type="category" />}
    series={
      <RadialAreaSeries
        area={<RadialArea gradient={<RadialGradient />} />}
      />
    }
  />
);

export const SemiCirlce = () => (
  <RadialAreaChart
    data={categoryData}
    height={500}
    width={500}
    axis={<RadialAxis type="category" />}
    series={
      <RadialAreaSeries
        area={<RadialArea gradient={<RadialGradient />} />}
        interpolation="linear"
      />
    }
    isSemiCircle={true}
  />
);
