import React from 'react';
import { categoryData, medDateData } from 'reaviz-data-utils';

import {
  LinearValueMarker,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLine,
  RadialAxisTickSeries,
  RadialValueMarker,
  schemes,
} from '@/common';
import { RadialBar, RadialBarChart, RadialBarSeries } from '@/RadialBarChart';

import { BarChart } from './BarChart';
import { Bar, BarSeries } from './BarSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Markers',
  component: BarChart,
  subcomponents: {
    Bar,
    BarSeries,
    RadialBar,
    RadialBarChart,
    RadialBarSeries,
  },
};

export const LinearValueMarkersVertical = () => (
  <BarChart
    width={500}
    height={350}
    data={categoryData}
    xAxis={<LinearXAxis type="value" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
    series={
      <BarSeries
        colorScheme="cybertron"
        layout="horizontal"
        padding={0.1}
        bar={<Bar guide={null} />}
        valueMarkers={[
          <LinearValueMarker
            key={12}
            value={12}
            color="#D740BE"
            direction="vertical"
          />,
          <LinearValueMarker
            key={6}
            value={6}
            color="#F8A340"
            direction="vertical"
          />,
        ]}
      />
    }
  />
);

export const LinearValueMarkersHorizontal = () => (
  <BarChart
    width={400}
    height={350}
    data={categoryData}
    series={
      <BarSeries
        colorScheme="cybertron"
        padding={0.1}
        bar={<Bar />}
        valueMarkers={[
          <LinearValueMarker key={12} value={12} color="#D740BE" />,
          <LinearValueMarker key={6} value={6} color="#F8A340" />,
        ]}
      />
    }
  />
);

export const RadialValueMarkers = () => (
  <RadialBarChart
    height={450}
    width={450}
    innerRadius={50}
    data={medDateData}
    series={
      <RadialBarSeries
        animated
        colorScheme={schemes['cybertron'][0]}
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
        valueMarkers={[
          <RadialValueMarker key={12} value={12} color="#D740BE" />,
          <RadialValueMarker key={6} value={6} color="#F8A340" />,
        ]}
      />
    }
    axis={
      <RadialAxis
        ticks={
          <RadialAxisTickSeries
            tick={
              <RadialAxisTick line={<RadialAxisTickLine position="inside" />} />
            }
          />
        }
        arcs={<RadialAxisArcSeries count={10} />}
      />
    }
  />
);
