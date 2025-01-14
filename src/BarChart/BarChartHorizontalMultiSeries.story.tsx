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
  LinearXAxisTickLabel,
  LinearAxisLine,
  LinearXAxisTickLine,
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearYAxisTickLine,
  LinearYAxisTickLabel,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS
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

export const Simple = () => (
  <BarChart
    width={500}
    height={350}
    data={multiCategory}
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
      <LinearYAxis
        type="category"
        tickSeries={<LinearYAxisTickSeries tickSize={20} />}
      >
        <LinearAxisLine />
        <LinearYAxisTickSeries tickSize={20}>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
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
      <LinearYAxis type="category" position="center">
        <LinearAxisLine />
        <LinearYAxisTickSeries tickSize={20} />
      </LinearYAxis>
    }
    xAxis={
      <LinearXAxis roundDomains={true} type="value">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLabel padding={5} />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
  />
);

export const StackedNormalized = () => (
  <StackedNormalizedBarChart
    width={500}
    height={350}
    data={multiCategory}
    yAxis={
      <LinearYAxis type="category">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
    xAxis={
      <LinearXAxis type="value">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel
            rotation={false}
            format={(data) => `${data * 100}%`}
          />
        </LinearXAxisTickSeries>
      </LinearXAxis>
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
