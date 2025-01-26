import React from 'react';
import { categoryData, medDateData } from 'reaviz-data-utils';
import {
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  schemes,
  LinearValueMarker,
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLine,
  RadialAxisArcSeries,
  RadialValueMarker,
  LinearAxisLine,
  LinearXAxisTickSeries,
  LinearXAxisTickLine,
  LinearXAxisTickLabel,
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearYAxisTickLine,
  LinearYAxisTickLabel,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS
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
    RadialBarSeries
  }
};

export const LinearValueMarkersVertical = () => (
  <BarChart
    width={500}
    height={350}
    data={categoryData}
    xAxis={
      <LinearXAxis type="value">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="category">
        <LinearAxisLine />
        <LinearYAxisTickSeries tickSize={20}>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
    series={
      <BarSeries
        colorScheme="cybertron"
        layout="horizontal"
        padding={0.1}
        bar={<Bar guide={null} />}
        valueMarkers={[
          <LinearValueMarker value={12} color="#D740BE" direction="vertical" />,
          <LinearValueMarker value={6} color="#F8A340" direction="vertical" />
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
          <LinearValueMarker value={12} color="#D740BE" />,
          <LinearValueMarker value={6} color="#F8A340" />
        ]}
      />
    }
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
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
          <RadialValueMarker value={12} color="#D740BE" />,
          <RadialValueMarker value={6} color="#F8A340" />
        ]}
      />
    }
    axis={
      <RadialAxis>
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
        <RadialAxisArcSeries count={10} />
      </RadialAxis>
    }
  />
);
