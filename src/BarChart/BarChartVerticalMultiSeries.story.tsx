import React from 'react';
import { boolean, number, object, select } from '@storybook/addon-knobs';
import { BarChart } from './BarChart';
import { MarimekkoChart } from './MarimekkoChart';
import { StackedBarChart } from './StackedBarChart';
import { StackedNormalizedBarChart } from './StackedNormalizedBarChart';
import {
  multiCategory,
  binnedDateData,
  binnedDatePositiveOnly,
  binnedDateNegativeOnly
} from '../../demo';
import chroma from 'chroma-js';
import {
  BarSeries,
  Bar,
  StackedBarSeries,
  StackedNormalizedBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  GuideBar,
  BarLabel,
  HistogramBarSeries
} from './BarSeries';
import { GridlineSeries, Gridline } from '../common/Gridline';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '../common/Axis/LinearAxis';
import { Gradient, GradientStop } from '../common/Gradient';
import { schemes } from '../common/color';

export default {
  title: 'Charts/Bar Chart/Vertical/Multi Series',
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
  const height = number('Height', 350);
  const width = number('Width', 350);
  const rangeWidth = number('Rangeline', 3);
  const hasGradient = boolean('Gradient', true);
  const hasRangelines = boolean('Rangelines', false);
  const color = select('Color Scheme', schemes, 'cybertron');
  const hasGuideBar = boolean('Guide Bar', false);
  const guide = hasGuideBar ? <GuideBar /> : null;

  const gradient = hasGradient ? <Gradient /> : null;
  const rangelines = hasRangelines ? (
    <RangeLines position="top" strokeWidth={rangeWidth} />
  ) : null;

  return (
    <BarChart
      width={width}
      height={height}
      data={multiCategory}
      series={
        <BarSeries
          type="grouped"
          bar={
            <Bar gradient={gradient} rangeLines={rangelines} guide={guide} />
          }
          colorScheme={color}
          padding={0.8}
        />
      }
    />
  );
};

export const Stacked = () => {
  const rx = number('rx', 0);
  const ry = number('ry', 0);
  const height = number('Height', 350);
  const width = number('Width', 350);
  const rangeWidth = number('Rangeline', 3);
  const hasGradient = boolean('Gradient', true);
  const hasRangelines = boolean('Rangelines', true);
  const color = select('Color Scheme', schemes, 'cybertron');
  const hasGuideBar = boolean('Guide Bar', false);
  const data = object('Data', multiCategory);

  const guide = hasGuideBar ? <GuideBar /> : null;
  const gradient = hasGradient ? (
    <Gradient
      stops={[
        <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
        <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
      ]}
    />
  ) : null;

  const rangelines = hasRangelines ? (
    <RangeLines position="top" strokeWidth={rangeWidth} />
  ) : null;

  return (
    <StackedBarChart
      width={width}
      height={height}
      data={data}
      series={
        <StackedBarSeries
          bar={
            <Bar
              rx={rx}
              ry={ry}
              gradient={gradient}
              rangeLines={rangelines}
              guide={guide}
            />
          }
          colorScheme={color}
        />
      }
    />
  );
};

export const StackedCustomStyle = () => (
  <StackedBarChart
    width={350}
    height={350}
    data={multiCategory}
    gridlines={null}
    series={
      <StackedBarSeries
        bar={[
          { start: '#d7b5d8', end: '#980043' },
          { start: '#fbb4b9', end: '#7a0177' },
          { start: '#c2e699', end: '#006837' },
          { start: '#a1dab4', end: '#253494' }
        ].map((gradient) => (
          <Bar
            gradient={
              <Gradient
                stops={[
                  <GradientStop
                    offset="0%"
                    key="start"
                    color={gradient.start}
                  />,
                  <GradientStop offset="100%" key="stop" color={gradient.end} />
                ]}
              />
            }
            width={10}
          />
        ))}
      />
    }
    yAxis={
      <LinearYAxis
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
  />
);

export const StackedDiverging = () => {
  const data = select(
    'Example Data',
    {
      'Opened/Closed': binnedDateData,
      'Opened Only': binnedDatePositiveOnly,
      'Closed Only': binnedDateNegativeOnly
    },
    binnedDateData as any
  );

  const rx = number('rx', 0);
  const ry = number('ry', 0);
  const height = number('Height', 250);
  const width = number('Width', 400);
  const rangeWidth = number('Rangeline', 3);
  const hasGradient = boolean('Gradient', true);
  const hasRangelines = boolean('Rangelines', true);
  const hasGuideBar = boolean('Guide Bar', false);
  const guide = hasGuideBar ? <GuideBar /> : null;

  const gradientBottom = hasGradient ? (
    <Gradient
      stops={[
        <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
        <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
      ]}
    />
  ) : null;

  const gradientTop = hasGradient ? (
    <Gradient
      stops={[
        <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
        <GradientStop offset="90%" stopOpacity={0.1} key="start" />
      ]}
    />
  ) : null;

  const rangelines = hasRangelines ? (
    <RangeLines position="top" strokeWidth={rangeWidth} />
  ) : null;

  return (
    <StackedBarChart
      style={{ filter: 'drop-shadow(0 0 10px 2px white)' }}
      width={width}
      height={height}
      margins={0}
      data={data}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
      series={
        <StackedBarSeries
          bar={[
            <Bar
              rx={rx}
              ry={ry}
              guide={guide}
              gradient={gradientTop}
              rangeLines={rangelines}
            />,
            <Bar
              rx={rx}
              ry={ry}
              guide={guide}
              gradient={gradientBottom}
              rangeLines={rangelines}
            />
          ]}
          type="stackedDiverging"
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(data[0].data.length)}
        />
      }
      yAxis={
        <LinearYAxis
          roundDomains={true}
          tickSeries={
            <LinearYAxisTickSeries
              line={null}
              label={<LinearYAxisTickLabel padding={5} />}
            />
          }
        />
      }
      xAxis={
        <LinearXAxis
          type="category"
          position="center"
          tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
        />
      }
    />
  );
};

export const StackedNormalized = () => {
  const rx = number('rx', 0);
  const ry = number('ry', 0);
  const height = number('Height', 350);
  const width = number('Width', 350);
  const rangeWidth = number('Rangeline', 3);
  const hasGradient = boolean('Gradient', true);
  const hasRangelines = boolean('Rangelines', true);
  const color = select('Color Scheme', schemes, 'cybertron');
  const data = object('Data', multiCategory);

  const gradient = hasGradient ? (
    <Gradient
      stops={[
        <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
        <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
      ]}
    />
  ) : null;

  const rangelines = hasRangelines ? (
    <RangeLines position="top" strokeWidth={rangeWidth} />
  ) : null;

  return (
    <StackedNormalizedBarChart
      width={width}
      height={height}
      data={data}
      series={
        <StackedNormalizedBarSeries
          bar={
            <Bar
              key="stacked-normalized-bar"
              rx={rx}
              ry={ry}
              gradient={gradient}
              rangeLines={rangelines}
            />
          }
          colorScheme={color}
        />
      }
    />
  );
};

export const Marimekko = () => {
  const rx = number('rx', 0);
  const ry = number('ry', 0);
  const height = number('Height', 350);
  const width = number('Width', 350);
  const rangeWidth = number('Rangeline', 3);
  const hasGradient = boolean('Gradient', true);
  const hasRangelines = boolean('Rangelines', true);
  const color = select('Color Scheme', schemes, 'cybertron');
  const data = object('Data', multiCategory);

  const gradient = hasGradient ? (
    <Gradient
      stops={[
        <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
        <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
      ]}
    />
  ) : null;

  const rangelines = hasRangelines ? (
    <RangeLines position="top" strokeWidth={rangeWidth} />
  ) : null;

  return (
    <MarimekkoChart
      width={width}
      height={height}
      data={data}
      series={
        <MarimekkoBarSeries
          bar={
            <Bar
              key="marimekko-bar"
              rx={rx}
              ry={ry}
              padding={10}
              gradient={gradient}
              rangeLines={rangelines}
            />
          }
          colorScheme={color}
        />
      }
    />
  );
};
