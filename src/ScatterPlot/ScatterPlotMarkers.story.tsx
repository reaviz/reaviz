import React from 'react';
import {
  histogramNumberData,
  medDateData,
  medSignalChartData
} from 'reaviz-data-utils';
import {
  RadialAxis,
  RadialValueMarker,
  RadialAxisTickLine,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickSeries,
  schemes,
  LinearValueMarker,
  LinearXAxis,
  LinearYAxis
} from '@/common';
import {
  RadialScatterPlot,
  RadialScatterPoint,
  RadialScatterSeries
} from '@/RadialScatterPlot';
import { ScatterPlot } from './ScatterPlot';
import { ScatterPoint, ScatterSeries } from './ScatterSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Scatter Plot/Markers',
  component: RadialScatterPlot,
  subcomponents: {
    ScatterPlot,
    ScatterSeries,
    ScatterPoint,
    RadialScatterSeries,
    RadialScatterPoint
  }
};

export const LinearValueMarkers = () => (
  <ScatterPlot
    id="simple"
    height={400}
    width={750}
    data={medSignalChartData}
    series={
      <ScatterSeries
        point={<ScatterPoint color={schemes.cybertron[0]} size={4} />}
        valueMarkers={[
          <LinearValueMarker value={2} color="#D740BE" />,
          <LinearValueMarker value={5} color="#F8A340" />
        ]}
      />
    }
  />
);

export const LinearValueMarkersVertical = () => (
  <ScatterPlot
    id="vertical"
    height={400}
    width={750}
    data={histogramNumberData}
    xAxis={<LinearXAxis type="value" domain={[0, 50]} />}
    yAxis={<LinearYAxis type="value" domain={[0, 10]} />}
    series={
      <ScatterSeries
        point={<ScatterPoint color={schemes.cybertron[0]} size={4} />}
        valueMarkers={[
          <LinearValueMarker value={5} color="#D740BE" direction="vertical" />,
          <LinearValueMarker value={25} color="#F8A340" direction="vertical" />
        ]}
      />
    }
  />
);

export const RadialValueMarkers = () => (
  <RadialScatterPlot
    id="simple"
    height={450}
    width={450}
    data={medDateData}
    innerRadius={80}
    series={
      <RadialScatterSeries
        animated
        point={<RadialScatterPoint size={5} color="rgba(45, 96, 232, .8)" />}
        valueMarkers={[
          <RadialValueMarker value={12} color="#D740BE" />,
          <RadialValueMarker value={6} color="#F8A340" />
        ]}
      />
    }
    axis={
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
  />
);
