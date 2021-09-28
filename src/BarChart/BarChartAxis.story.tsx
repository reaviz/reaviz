import React from 'react';
import { StackedBarChart } from './StackedBarChart';
import {
  binnedDateData
} from '../../demo';
import {
  Bar,
  StackedBarSeries,
  RangeLines,
  BarSeries,
  StackedNormalizedBarSeries,
  BarLabel,
  GuideBar,
  HistogramBarSeries,
  MarimekkoBarSeries
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
import { getXScale, getYScale } from '../common/scales';
import { BarChart } from './BarChart';

export default {
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
    HistogramBarSeries
  }
};

export const TopBottomAxis = () => {
    const scale = getXScale({
      type: 'category',
      width: 450,
      data: [
        {
          key: 'Closed',
          data: 0,
          x: 'Closed'
        },
        {
          key: 'Opened',
          data: 0,
          x: 'Opened'
        }
      ],
      isMultiSeries: false,
      isDiverging: true
    });

    return (
      <StackedBarChart
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
                width={10}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop
                        offset="5%"
                        stopOpacity={0.25}
                        key="start"
                      />,
                      <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />,
              <Bar
                width={10}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
                      <GradientStop
                        offset="90%"
                        stopOpacity={0.25}
                        key="start"
                      />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />
            ]}
          />
        }
        xAxis={
          <LinearYAxis
            orientation="horizontal"
            position="end"
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
        secondaryAxis={[
          <LinearYAxis
            orientation="horizontal"
            type="category"
            scale={scale}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={<LinearYAxisTickLabel padding={20} position="start" />}
              />
            }
          />
        ]}
        yAxis={
          <LinearXAxis
            type="category"
            position="center"
            orientation="vertical"
            tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
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
          y: 'Closed'
        },
        {
          key: 'Opened',
          data: 0,
          y: 'Opened'
        }
      ],
      isMultiSeries: false,
      isDiverging: true
    });

    return (
      <StackedBarChart
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
                width={25}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop
                        offset="5%"
                        stopOpacity={0.25}
                        key="start"
                      />,
                      <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />,
              <Bar
                width={25}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
                      <GradientStop
                        offset="90%"
                        stopOpacity={0.25}
                        key="start"
                      />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />
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
          />
        ]}
      />
    );
  };

LeftRightAxis.story = {
  name: 'Left + Right Axis',
};
