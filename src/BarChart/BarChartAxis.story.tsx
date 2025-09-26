import React from 'react';
import { binnedDateData } from 'reaviz-data-utils';

import {
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries,
} from '@/common/Axis/LinearAxis';
import { Gradient, GradientStop } from '@/common/Gradient';
import { Gridline, GridlineSeries } from '@/common/Gridline';
import { getXScale, getYScale } from '@/common/scales';

import { BarChart } from './BarChart';
import {
  Bar,
  BarLabel,
  BarSeries,
  GuideBar,
  HistogramBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  StackedBarSeries,
  StackedNormalizedBarSeries,
} from './BarSeries';
import { StackedBarChart } from './StackedBarChart';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Axis',
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
    HistogramBarSeries,
  },
};

export const TopBottomAxis = () => {
  const scale = getXScale({
    type: 'category',
    width: 450,
    data: [
      {
        key: 'Closed',
        data: 0,
        x: 'Closed',
      },
      {
        key: 'Opened',
        data: 0,
        x: 'Opened',
      },
    ],
    isMultiSeries: false,
    isDiverging: true,
  });

  return (
    <StackedBarChart
      id="top-bottom-axis"
      width={450}
      height={200}
      margins={0}
      data={binnedDateData}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
      series={
        <StackedBarSeries
          layout="horizontal"
          type="stackedDiverging"
          colorScheme={['#ACB7C9', '#418AD7']}
          bar={[
            <Bar
              key="top"
              width={10}
              gradient={
                <Gradient
                  stops={[
                    <GradientStop offset="5%" stopOpacity={0.25} key="start" />,
                    <GradientStop offset="90%" stopOpacity={0.7} key="stop" />,
                  ]}
                />
              }
              rangeLines={<RangeLines position="top" strokeWidth={3} />}
            />,
            <Bar
              key="bottom"
              width={10}
              gradient={
                <Gradient
                  stops={[
                    <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
                    <GradientStop
                      offset="90%"
                      stopOpacity={0.25}
                      key="start"
                    />,
                  ]}
                />
              }
              rangeLines={<RangeLines position="top" strokeWidth={3} />}
            />,
          ]}
        />
      }
      xAxis={
        <LinearXAxis
          orientation="horizontal"
          position="end"
          tickSeries={
            <LinearXAxisTickSeries
              line={null}
              label={
                <LinearXAxisTickLabel
                  padding={5}
                  position="end"
                  format={(d) => `${d < 0 ? d * -1 : d}`}
                />
              }
            />
          }
        />
      }
      secondaryAxis={[
        <LinearYAxis
          key="horizontal"
          orientation="horizontal"
          type="category"
          scale={scale}
          tickSeries={
            <LinearYAxisTickSeries
              line={null}
              label={<LinearYAxisTickLabel padding={20} position="start" />}
            />
          }
        />,
      ]}
      yAxis={
        <LinearYAxis
          type="category"
          position="center"
          orientation="vertical"
          tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
        />
      }
    />
  );
};

TopBottomAxis.story = {
  name: 'Top + Bottom Axis',
};

export const LeftRightAxis = () => {
  const scale = getYScale({
    type: 'category',
    height: 200,
    data: [
      {
        key: 'Closed',
        data: 0,
        y: 'Closed',
      },
      {
        key: 'Opened',
        data: 0,
        y: 'Opened',
      },
    ],
    isMultiSeries: false,
    isDiverging: true,
  });

  return (
    <StackedBarChart
      id="left-right-axis"
      width={450}
      height={200}
      margins={0}
      data={binnedDateData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
      series={
        <StackedBarSeries
          type="stackedDiverging"
          colorScheme={['#ACB7C9', '#418AD7']}
          bar={[
            <Bar
              key="left"
              width={25}
              gradient={
                <Gradient
                  stops={[
                    <GradientStop offset="5%" stopOpacity={0.25} key="start" />,
                    <GradientStop offset="90%" stopOpacity={0.7} key="stop" />,
                  ]}
                />
              }
              rangeLines={<RangeLines position="top" strokeWidth={3} />}
            />,
            <Bar
              key="right"
              width={25}
              gradient={
                <Gradient
                  stops={[
                    <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
                    <GradientStop
                      offset="90%"
                      stopOpacity={0.25}
                      key="start"
                    />,
                  ]}
                />
              }
              rangeLines={<RangeLines position="top" strokeWidth={3} />}
            />,
          ]}
        />
      }
      yAxis={
        <LinearYAxis
          roundDomains={true}
          position="end"
          axisLine={null}
          tickSeries={
            <LinearYAxisTickSeries
              line={null}
              label={
                <LinearYAxisTickLabel
                  padding={5}
                  position="end"
                  format={(d) => `${d < 0 ? d * -1 : d}`}
                />
              }
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
      secondaryAxis={[
        <LinearYAxis
          key="category"
          type="category"
          position="start"
          axisLine={null}
          scale={scale}
          tickSeries={
            <LinearYAxisTickSeries
              line={null}
              label={
                <LinearYAxisTickLabel
                  padding={20}
                  position="start"
                  rotation={270}
                  align="start"
                />
              }
            />
          }
        />,
      ]}
    />
  );
};

LeftRightAxis.story = {
  name: 'Left + Right Axis',
};
