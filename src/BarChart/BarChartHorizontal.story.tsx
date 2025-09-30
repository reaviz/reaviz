import React from 'react';
import { BarChart } from './BarChart';
import { BarSeries, Bar, BarLabel, GuideBar } from './BarSeries';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickLabel
} from '@/common/Axis/LinearAxis';
import chroma from 'chroma-js';
import {
  categoryData,
  largeCategoryData,
  nonZeroCategoryData,
  durationCategoryData
} from 'reaviz-data-utils';
import {
  HistogramBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  StackedBarSeries,
  StackedNormalizedBarSeries
} from './BarSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Horizontal/Single Series',
  component: BarChart,
  subcomponents: {
    BarSeries,
    StackedBarSeries,
    StackedNormalizedBarSeries,
    MarimekkoBarSeries,
    RangeLines,
    Bar,
    BarLabel,
    GuideBar,
    HistogramBarSeries
  }
};

const data = categoryData;

export const Simple = () => (
  <BarChart
    width={500}
    height={350}
    data={data}
    xAxis={<LinearXAxis type="value" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
    series={
      <BarSeries
        colorScheme={'cybertron'}
        layout="horizontal"
        padding={0.1}
        bar={<Bar guide={null} />}
      />
    }
  />
);

export const WithScroll = () => (
  <div style={{ minHeight: '200vh' }}>
    <div style={{ minHeight: '50vh' }}></div>
    <BarChart
      width={500}
      height={350}
      data={data}
      xAxis={<LinearXAxis type="value" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
      series={
        <BarSeries
          colorScheme={'cybertron'}
          layout="horizontal"
          padding={0.1}
          bar={<Bar guide={null} />}
        />
      }
    />
  </div>
);

export const LargeDataset = () => (
  <BarChart
    height={350}
    width={500}
    data={largeCategoryData}
    xAxis={<LinearXAxis type="value" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
    series={
      <BarSeries
        layout="horizontal"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(largeCategoryData.length)}
      />
    }
  />
);

export const Labels = () => (
  <BarChart
    width={350}
    height={250}
    data={data}
    xAxis={<LinearXAxis type="value" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
    series={
      <BarSeries
        layout="horizontal"
        bar={<Bar label={<BarLabel fill={''} position={'top'} />} />}
      />
    }
  />
);

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <BarChart
      data={data}
      series={<BarSeries layout="horizontal" />}
      xAxis={<LinearXAxis type="value" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
    />
  </div>
);

export const Waterfall = () => (
  <BarChart
    height={350}
    width={500}
    data={data}
    xAxis={<LinearXAxis type="value" />}
    series={<BarSeries layout="horizontal" type="waterfall" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
  />
);

export const Duration = () => (
  <BarChart
    height={350}
    width={500}
    data={durationCategoryData}
    xAxis={
      <LinearXAxis
        type="duration"
        tickSeries={
          <LinearXAxisTickSeries
            label={<LinearXAxisTickLabel format={(d) => d / 3600 + 'h'} />}
          />
        }
      />
    }
    series={<BarSeries layout="horizontal" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
  />
);

export const NonZero = () => (
  <BarChart
    height={350}
    width={500}
    data={nonZeroCategoryData}
    xAxis={<LinearXAxis type="value" />}
    series={<BarSeries layout="horizontal" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
  />
);

NonZero.story = {
  name: 'Non-Zero'
};
