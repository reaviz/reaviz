import React, { useState } from 'react';
import { medDateData, histogramNumberData } from 'reaviz-data-utils';
import { timeWeek } from 'd3-time';
import {
  Bar,
  BarLabel,
  BarSeries,
  GuideBar,
  HistogramBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  StackedBarSeries,
  StackedNormalizedBarSeries
} from './BarSeries';
import {
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisLine,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries
} from '@/common/Axis/LinearAxis';
import { HistogramBarChart } from './HistogramBarChart';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Vertical/Histogram',
  component: HistogramBarChart,
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

export const Dates = () => (
  <HistogramBarChart
    width={350}
    height={250}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries interval={timeWeek}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
    series={<HistogramBarSeries binSize={60 * 60 * 24 * 1000} />}
    data={medDateData}
  />
);

export const Numbers = () => (
  <HistogramBarChart
    width={350}
    height={250}
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
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
    series={<HistogramBarSeries binSize={1} />}
    data={histogramNumberData}
  />
);

export const MultiMonth = () => {
  const [data] = useState(
    [
      {
        id: '2024-03-03T00:00:00.000Z',
        key: '2024-03-03T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-04T00:00:00.000Z',
        key: '2024-03-04T00:00:00.000Z',
        data: 1
      },
      {
        id: '2024-03-05T00:00:00.000Z',
        key: '2024-03-05T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-06T00:00:00.000Z',
        key: '2024-03-06T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-07T00:00:00.000Z',
        key: '2024-03-07T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-08T00:00:00.000Z',
        key: '2024-03-08T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-09T00:00:00.000Z',
        key: '2024-03-09T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-10T00:00:00.000Z',
        key: '2024-03-10T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-11T00:00:00.000Z',
        key: '2024-03-11T00:00:00.000Z',
        data: 2
      },
      {
        id: '2024-03-12T00:00:00.000Z',
        key: '2024-03-12T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-13T00:00:00.000Z',
        key: '2024-03-13T00:00:00.000Z',
        data: 1
      },
      {
        id: '2024-03-14T00:00:00.000Z',
        key: '2024-03-14T00:00:00.000Z',
        data: 1
      },
      {
        id: '2024-03-15T00:00:00.000Z',
        key: '2024-03-15T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-16T00:00:00.000Z',
        key: '2024-03-16T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-17T00:00:00.000Z',
        key: '2024-03-17T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-18T00:00:00.000Z',
        key: '2024-03-18T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-19T00:00:00.000Z',
        key: '2024-03-19T00:00:00.000Z',
        data: 4
      },
      {
        id: '2024-03-20T00:00:00.000Z',
        key: '2024-03-20T00:00:00.000Z',
        data: 3
      },
      {
        id: '2024-03-21T00:00:00.000Z',
        key: '2024-03-21T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-22T00:00:00.000Z',
        key: '2024-03-22T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-23T00:00:00.000Z',
        key: '2024-03-23T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-24T00:00:00.000Z',
        key: '2024-03-24T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-25T00:00:00.000Z',
        key: '2024-03-25T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-26T00:00:00.000Z',
        key: '2024-03-26T00:00:00.000Z',
        data: 1
      },
      {
        id: '2024-03-27T00:00:00.000Z',
        key: '2024-03-27T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-28T00:00:00.000Z',
        key: '2024-03-28T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-29T00:00:00.000Z',
        key: '2024-03-29T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-30T00:00:00.000Z',
        key: '2024-03-30T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-03-31T00:00:00.000Z',
        key: '2024-03-31T00:00:00.000Z',
        data: 0
      },
      {
        id: '2024-04-01T00:00:00.000Z',
        key: '2024-04-01T00:00:00.000Z',
        data: 1
      },
      {
        id: '2024-04-02T00:00:00.000Z',
        key: '2024-04-02T00:00:00.000Z',
        data: 0
      }
    ].map((item) => ({ ...item, key: new Date(item.key) }))
  );
  const MILLISECONDS_IN_1_DAY = 24 * 60 * 60 * 1000;

  return (
    <HistogramBarChart
      width={300}
      height={250}
      gridlines={null}
      xAxis={
        <LinearXAxis type="time">
          <LinearAxisLine />
          <LinearXAxisTickSeries interval={timeWeek}>
            <LinearXAxisTickLine />
            <LinearXAxisTickLabel />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
      yAxis={
        <LinearYAxis type="value">
          <LinearAxisLine />
          <LinearYAxisTickSeries tickSize={25}>
            <LinearYAxisTickLine />
            <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      series={<HistogramBarSeries binSize={MILLISECONDS_IN_1_DAY} />}
      data={data}
    />
  );
};
