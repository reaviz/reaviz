import React from 'react';
import { medDateData, multiDateData } from '../../demo';
import {
  LinearValueMarker,
  RadialGradient,
  RadialValueMarker
} from '../common';
import { RadialArea, RadialAreaSeries } from '../RadialAreaChart';
import { RadialAreaChart } from '../RadialAreaChart';
import { AreaChart } from './AreaChart';
import { AreaSeries } from './AreaSeries';

export default {
  title: 'Charts/Area Chart/Markers',
  component: AreaChart,
  subcomponents: {
    AreaSeries,
    LinearValueMarker,
    RadialAreaChart,
    RadialAreaSeries,
    RadialArea,
    RadialGradient,
    RadialValueMarker
  }
};

export const LinearValueMarkers = () => (
  <AreaChart
    width={550}
    height={350}
    data={multiDateData}
    series={
      <AreaSeries
        type="grouped"
        colorScheme="cybertron"
        valueMarkers={[
          <LinearValueMarker value={12} color="#D740BE" />,
          <LinearValueMarker value={6} color="#F8A340" />
        ]}
      />
    }
  />
);

export const RadialValueMarkers = () => (
  <RadialAreaChart
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        colorScheme="cybertron"
        animated
        interpolation="smooth"
        area={<RadialArea gradient={<RadialGradient />} />}
        valueMarkers={[
          <RadialValueMarker value={12} color="#D740BE" />,
          <RadialValueMarker value={6} color="#F8A340" />
        ]}
      />
    }
  />
);
