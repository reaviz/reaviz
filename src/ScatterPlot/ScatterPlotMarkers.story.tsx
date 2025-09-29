import React from 'react';
import {
  histogramNumberData,
  medDateData,
  medSignalChartData
} from 'reaviz-data-utils';

import {
  LinearValueMarker,
  LinearXAxis,
  LinearYAxis,
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLine,
  RadialAxisTickSeries,
  RadialValueMarker,
  schemes
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
          <LinearValueMarker key={2} value={2} color="#D740BE" />,
          <LinearValueMarker key={5} value={5} color="#F8A340" />
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
          <LinearValueMarker
            key={5}
            value={5}
            color="#D740BE"
            direction="vertical"
          />,
          <LinearValueMarker
            key={25}
            value={25}
            color="#F8A340"
            direction="vertical"
          />
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
          <RadialValueMarker key={12} value={12} color="#D740BE" />,
          <RadialValueMarker key={6} value={6} color="#F8A340" />
        ]}
      />
    }
    axis={
      <RadialAxis
        ticks={
          <RadialAxisTickSeries
            count={5}
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
