import React from 'react';
import { medDateData, multiDateData } from 'reaviz-data-utils';
import {
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisLine,
  LinearValueMarker,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries,
  RadialValueMarker
} from '@/common';
import { RadialAreaChart, RadialAreaSeries } from '@/RadialAreaChart';
import { LineChart } from './LineChart';
import { LineSeries } from './LineSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Line Chart/Markers',
  component: LineChart,
  subcomponents: {
    LineSeries,
    LinearValueMarker,
    RadialAreaChart,
    RadialAreaSeries,
    RadialValueMarker
  }
};

export const LinearValueMarkers = () => (
  <LineChart
    id="linear-value-markers"
    width={550}
    height={350}
    data={multiDateData}
    series={
      <LineSeries
        type="grouped"
        colorScheme="cybertron"
        valueMarkers={[
          <LinearValueMarker value={12} color="#D740BE" />,
          <LinearValueMarker value={6} color="#F8A340" />
        ]}
      />
    }
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
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

export const RadialValueMarkersVertical = () => (
  <LineChart
    id="radial-value-markers-vertical"
    width={550}
    height={350}
    data={multiDateData}
    series={
      <LineSeries
        type="grouped"
        colorScheme="cybertron"
        valueMarkers={[
          <LinearValueMarker
            value={multiDateData[0].data[1].key}
            color="#D740BE"
            direction="vertical"
          />,
          <LinearValueMarker
            value={multiDateData[0].data[2].key}
            color="#F8A340"
            direction="vertical"
          />
        ]}
      />
    }
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
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
  <RadialAreaChart
    id="radial-value-markers"
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        area={null}
        colorScheme="cybertron"
        animated
        interpolation="smooth"
        valueMarkers={[
          <RadialValueMarker key={1} value={12} color="#D740BE" />,
          <RadialValueMarker key={2} value={6} color="#F8A340" />
        ]}
      />
    }
  />
);
