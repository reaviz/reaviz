import React, { Fragment, useState } from 'react';
import { ScatterPlot } from './ScatterPlot';
import {
  randomNumber,
  singleDateData,
  largeSignalChartData
} from 'reaviz-data-utils';
import { ScatterSeries, ScatterPoint } from './ScatterSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxisTickLine,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearXAxisTickLine,
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS
} from '@/common/Axis/LinearAxis';
import { getYScale, getXScale } from '@/common/scales';

export default {
  tags: ['snapshot'],
  title: 'Charts/Scatter Plot/Axis',
  component: ScatterPlot,
  subcomponents: {
    ScatterSeries,
    ScatterPoint
  }
};

export const TopBottomAxis = () => {
  const scale = getXScale({
    type: 'category',
    width: 450,
    data: [
      {
        key: 'Before',
        data: 0,
        x: 'Before'
      },
      {
        key: 'After',
        data: 0,
        x: 'After'
      }
    ],
    isMultiSeries: false,
    isDiverging: true
  });

  return (
    <ScatterPlot
      id="top-bottom"
      width={450}
      height={200}
      margins={0}
      data={singleDateData}
      xAxis={
        <LinearXAxis type="time" orientation="horizontal" position="end">
          <LinearXAxisTickSeries>
            <LinearXAxisTickLabel padding={5} position="end" />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
      secondaryAxis={[
        <LinearXAxis
          type="category"
          orientation="horizontal"
          position="start"
          scale={scale}
        >
          <LinearXAxisTickSeries>
            <LinearXAxisTickLabel padding={20} position="start" />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      ]}
      yAxis={
        <LinearYAxis type="value">
          <LinearYAxisTickSeries>
            <LinearYAxisTickLine />
            <LinearYAxisTickLabel />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
    />
  );
};

TopBottomAxis.story = {
  name: 'Top + Bottom Axis'
};

export const LeftRightAxis = () => {
  const scale = getYScale({
    type: 'category',
    height: 200,
    data: [
      {
        key: 'Low',
        data: 0,
        y: 'Low'
      },
      {
        key: 'High',
        data: 0,
        y: 'High'
      }
    ],
    isMultiSeries: false,
    isDiverging: true
  });

  return (
    <ScatterPlot
      id="left-right"
      width={450}
      height={200}
      margins={0}
      data={singleDateData}
      yAxis={
        <LinearYAxis position="end">
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel padding={5} position="end" />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      secondaryAxis={[
        <LinearYAxis type="category" position="start" scale={scale}>
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel
              padding={20}
              position="start"
              rotation={270}
              align="start"
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      ]}
      xAxis={
        <LinearXAxis type="time">
          <LinearXAxisTickSeries>
            <LinearXAxisTickLine />
            <LinearXAxisTickLabel />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
    />
  );
};

LeftRightAxis.story = {
  name: 'Left + Right Axis'
};

const BubbleChartLiveUpdate = () => {
  const [data, setData] = useState(largeSignalChartData.map((d) => ({ ...d })));

  const updateData = () => {
    const d = data.map((item) => {
      item.data = randomNumber(1, 100);
      return { ...item };
    });

    setData(d);
  };

  return (
    <Fragment>
      <ScatterPlot
        height={400}
        width={750}
        data={data}
        margins={20}
        series={
          <ScatterSeries
            point={
              <ScatterPoint
                color="rgba(45, 96, 232, .8)"
                size={(v) => {
                  return v.metadata.severity + 5;
                }}
              />
            }
          />
        }
      />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};
