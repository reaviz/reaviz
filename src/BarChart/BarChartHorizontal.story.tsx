import React from 'react';
import { boolean, number, object, select, color } from '@storybook/addon-knobs';
import { BarChart } from './BarChart';
import {
  categoryData,
  largeCategoryData,
  nonZeroCategoryData,
  durationCategoryData
} from '../../demo';
import chroma from 'chroma-js';
import {
  BarSeries,
  Bar,
  BarLabel,
  GuideBar,
  HistogramBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  StackedBarSeries,
  StackedNormalizedBarSeries
} from './BarSeries';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickLabel
} from '../common/Axis/LinearAxis';
import { schemes } from '../common/color';

export default {
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

export const Simple = () => {
    const hasGradient = boolean('Gradient', true);
    const padding = number('Padding', 0.1);
    const height = number('Height', 350);
    const width = number('Width', 500);
    const color = select('Color Scheme', schemes, 'cybertron');
    const hasGuideBar = boolean('Guide Bar', false);
    const guide = hasGuideBar ? <GuideBar /> : null;
    const data = object('Data', categoryData);
    const gradient = hasGradient ? Bar.defaultProps.gradient : null;

    return (
      <BarChart
        width={width}
        height={height}
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
            colorScheme={color}
            layout="horizontal"
            padding={padding}
            bar={<Bar gradient={gradient} guide={guide} />}
          />
        }
      />
    );
  };

export const _LargeDataset = () => (
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

export const _Labels = () => {
    const position = select(
      'Position',
      {
        top: 'top',
        center: 'center',
        bottom: 'bottom'
      },
      'top'
    );
    const fill = color('Color', '');

    return (
      <BarChart
        width={350}
        height={250}
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
            layout="horizontal"
            bar={<Bar label={<BarLabel fill={fill} position={position} />} />}
          />
        }
      />
    );
  };

export const _Autosize = () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <BarChart
        data={categoryData}
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

export const _Waterfall = () => (
    <BarChart
      height={350}
      width={500}
      data={categoryData}
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

export const _NonZero = () => (
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

_NonZero.story = {
  name: 'Non-Zero',
};
