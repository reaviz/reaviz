import React from 'react';
import { medDateData, multiDateData } from 'reaviz-data-utils';
import { LinearValueMarker, RadialGradient, RadialValueMarker } from '@/common';
import { RadialArea, RadialAreaSeries } from '@/RadialAreaChart';
import { RadialAreaChart } from '@/RadialAreaChart';
import { AreaChart } from './AreaChart';
import { AreaSeries } from './AreaSeries';

export default {
  tags: ['snapshot'],
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
    id="linear-value-markers"
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
// TODO: figure out why this is failing
LinearValueMarkers.tags = ['skip-snapshot'];

export const VerticalLinearValueMarkers = () => (
  <AreaChart
    id="vertical-linear-value-markers"
    width={550}
    height={350}
    data={multiDateData}
    series={
      <AreaSeries
        type="grouped"
        colorScheme="cybertron"
        valueMarkers={[
          <LinearValueMarker
            key={1}
            value={multiDateData[0].data[1].key}
            color="#D740BE"
            direction="vertical"
          />,
          <LinearValueMarker
            key={2}
            value={multiDateData[0].data[2].key}
            color="#F8A340"
            direction="vertical"
          />
        ]}
      />
    }
  />
);

export const RadialValueMarkers = () => (
  <RadialAreaChart
    id="radial-value-markers"
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
