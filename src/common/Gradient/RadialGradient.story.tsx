import React from 'react';
import { GradientStop } from './GradientStop';
import { RadialGradient } from './RadialGradient';
import {
  RadialArea,
  RadialAreaChart,
  RadialAreaSeries
} from '@/RadialAreaChart';
import { categoryData } from '../../../demo';
import { RadialAxis } from '@/common/Axis/RadialAxis';

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
      <RadialAreaSeries area={<RadialArea gradient={<RadialGradient />} />} />
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
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const Custom = () => (
  <RadialAreaChart
    data={categoryData}
    height={500}
    width={500}
    axis={<RadialAxis type="category" />}
    series={
      <RadialAreaSeries
        area={<RadialArea gradient={<RadialGradient />} />}
        interpolation="smooth"
      />
    }
    startAngle={-0.25 * Math.PI}
    endAngle={0.25 * Math.PI}
    isClosedCurve={false}
  />
);
