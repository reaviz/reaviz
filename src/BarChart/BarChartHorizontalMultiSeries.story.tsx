import React from 'react';
import { BarChart } from './BarChart';
import { StackedBarChart } from './StackedBarChart';
import { StackedNormalizedBarChart } from './StackedNormalizedBarChart';
import {
  multiCategory,
  binnedDateData,
  binnedDatePositiveOnly,
  binnedDateNegativeOnly
} from 'reaviz-data-utils';
import chroma from 'chroma-js';
import {
  BarSeries,
  Bar,
  StackedBarSeries,
  StackedNormalizedBarSeries,
  RangeLines
} from './BarSeries';
import { GridlineSeries, Gridline } from '@/common/Gridline';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickLabel
} from '@/common/Axis/LinearAxis';
import { Gradient, GradientStop } from '@/common/Gradient';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Horizontal/Multi Series',
  component: BarChart,
  subcomponents: {
    BarSeries,
    StackedBarSeries,
    StackedNormalizedBarSeries,
    RangeLines,
    Bar
  }
};

const multiCategoryWithUrl = multiCategory.map((x) => ({
  key_url: x.key,
  ...x,
  data: x.data.map((y, i) => ({
    key_url: `${i}`,
    ...y
  }))
}));

export const Simple = () => (
  <BarChart
    width={500}
    height={350}
    data={multiCategoryWithUrl}
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
        type="grouped"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(multiCategory[0].data.length)}
        padding={0.8}
      />
    }
  />
);

export const Stacked = () => (
  <StackedBarChart
    width={500}
    height={350}
    data={multiCategory}
    xAxis={<LinearXAxis type="value" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      />
    }
    series={
      <StackedBarSeries
        layout="horizontal"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(multiCategory.length)}
      />
    }
  />
);

export const StackedDiverging = () => (
  <StackedBarChart
    width={400}
    height={250}
    data={binnedDateData}
    gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    series={
      <StackedBarSeries
        layout="horizontal"
        type="stackedDiverging"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(binnedDateData[0].data.length)}
      />
    }
    yAxis={
      <LinearYAxis
        type="category"
        position="center"
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
    xAxis={
      <LinearXAxis
        roundDomains={true}
        type="value"
        tickSeries={
          <LinearXAxisTickSeries
            line={null}
            label={<LinearXAxisTickLabel padding={5} />}
          />
        }
      />
    }
  />
);

export const StackedNormalized = () => (
  <StackedNormalizedBarChart
    width={500}
    height={350}
    data={multiCategory}
    yAxis={<LinearYAxis type="category" />}
    xAxis={
      <LinearXAxis
        type="value"
        tickSeries={
          <LinearXAxisTickSeries
            tickSize={20}
            label={
              <LinearXAxisTickLabel
                rotation={false}
                format={(data) => `${data * 100}%`}
              />
            }
          />
        }
      />
    }
    series={
      <StackedNormalizedBarSeries
        layout="horizontal"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(multiCategory.length)}
        bar={
          <Bar
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
                  <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                ]}
              />
            }
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
          />
        }
      />
    }
  />
);
