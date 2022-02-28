import React from 'react';
import { object, number, select } from '@storybook/addon-knobs';
import chroma from 'chroma-js';
import { multiDateData, longMultiDateData } from '../../demo';
import { LineChart } from './LineChart';
import {
  StackedAreaChart,
  StackedNormalizedAreaChart,
  StackedAreaSeries,
  Line,
  StackedNormalizedAreaSeries
} from '../AreaChart';
import {
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxisTickSeries,
  LinearYAxis
} from '../common/Axis/LinearAxis';
import { schemes } from '../common/color';
import { LineSeries } from './LineSeries';

export default {
  title: 'Charts/Line Chart/Multi Series',
  component: LineChart,
  subcomponents: {
    LineSeries,
    Line,
    StackedAreaChart,
    StackedNormalizedAreaChart,
    StackedAreaSeries,
    StackedNormalizedAreaSeries
  }
};

export const _Simple = () => {
  const height = number('Height', 250);
  const width = number('Width', 550);
  const lineStroke = number('Stroke Width', 4);
  const color = select('Color Scheme', schemes, 'cybertron');
  const data = object('Data', multiDateData);

  return (
    <LineChart
      width={width}
      height={height}
      series={
        <LineSeries
          type="grouped"
          line={<Line strokeWidth={lineStroke} />}
          colorScheme={color}
        />
      }
      data={data}
    />
  );
};

export const LargeData = () => (
  <LineChart
    width={400}
    height={300}
    data={prettyData}
    yAxis={
      <LinearYAxis
        scaled={true}
        type="value"
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
    xAxis={
      <LinearXAxis
        type="value"
        scaled={true}
        axisLine={null}
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    }
    series={
      <LineSeries
        type="grouped"
        line={<Line strokeWidth={1} />}
        colorScheme="cybertron"
      />
    }
  />
);

export const CustomLineStyles = () => (
  <LineChart
    width={550}
    height={350}
    series={
      <LineSeries
        type="grouped"
        line={
          <Line
            strokeWidth={3}
            style={(data) => {
              if (
                data &&
                data.length &&
                data[0] &&
                data[0].key === 'Threat Intel'
              ) {
                console.log('Style callback...', data);
                return {
                  strokeDasharray: '5'
                };
              }
            }}
          />
        }
        colorScheme={chroma
          .scale(['27efb5', '00bfff'])
          .colors(multiDateData.length)}
      />
    }
    data={multiDateData}
  />
);

export const _LargeDataset = () => (
  <LineChart
    width={550}
    height={350}
    series={
      <LineSeries
        type="grouped"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(longMultiDateData.length)}
      />
    }
    data={longMultiDateData}
  />
);

export const Stacked = () => {
  const height = number('Height', 250);
  const width = number('Width', 550);
  const lineStroke = number('Stroke Width', 4);
  const color = select('Color Scheme', schemes, 'cybertron');
  const data = object('Data', multiDateData);

  return (
    <StackedAreaChart
      width={width}
      height={height}
      series={
        <StackedAreaSeries
          colorScheme={color}
          area={null}
          line={<Line strokeWidth={lineStroke} />}
        />
      }
      data={data}
    />
  );
};

export const StackedNormalized = () => {
  const height = number('Height', 250);
  const width = number('Width', 550);
  const lineStroke = number('Stroke Width', 4);
  const color = select('Color Scheme', schemes, 'cybertron');
  const data = object('Data', multiDateData);

  return (
    <StackedNormalizedAreaChart
      width={width}
      height={height}
      data={data}
      series={
        <StackedNormalizedAreaSeries
          colorScheme={color}
          area={null}
          line={<Line strokeWidth={lineStroke} />}
        />
      }
    />
  );
};

const prettyData = (() => {
  const data: any[] = [];
  for (let i = 0; i < 20; i++) {
    const series: any[] = [];
    for (let j = 0; j < 100; j++) {
      series.push({
        key: j,
        data: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50)
      });
    }
    data.push({ key: i, data: series });
  }
  return data;
})();
