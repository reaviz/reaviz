import React, { Fragment, useState } from 'react';
import chroma from 'chroma-js';
import {
  multiDateData,
  singleDateData,
  randomNumber
} from '../../demo';
import { AreaChart } from './AreaChart';
import {
  Area,
  AreaSeries,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries
} from './AreaSeries';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxisTickLabel
} from '../common/Axis/LinearAxis';
import { getYScale, getXScale } from '../common/scales';

export default {
  title: 'Charts/Area Chart/Axis',
  component: AreaChart,
  subcomponents: {
    AreaSeries,
    Area,
    Line,
    PointSeries,
    StackedAreaSeries,
    StackedNormalizedAreaSeries
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
      ]
    });

    return (
      <AreaChart
        width={450}
        height={200}
        margins={0}
        data={singleDateData}
        xAxis={
          <LinearXAxis
            type="time"
            orientation="horizontal"
            position="end"
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries
                line={null}
                label={<LinearXAxisTickLabel padding={5} position="end" />}
              />
            }
          />
        }
        secondaryAxis={[
          <LinearXAxis
            type="category"
            orientation="horizontal"
            position="start"
            scale={scale}
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries
                line={null}
                label={<LinearXAxisTickLabel padding={20} position="start" />}
              />
            }
          />
        ]}
        yAxis={<LinearYAxis type="value" axisLine={null} />}
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
          key: 'Low',
          data: 0,
          y: 'Low'
        },
        {
          key: 'High',
          data: 0,
          y: 'High'
        }
      ]
    });

    return (
      <AreaChart
        width={450}
        height={200}
        margins={0}
        data={singleDateData}
        yAxis={
          <LinearYAxis
            position="end"
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={<LinearYAxisTickLabel padding={5} position="end" />}
              />
            }
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
        xAxis={<LinearXAxis type="time" axisLine={null} />}
      />
    );
  };

LeftRightAxis.story = {
  name: 'Left + Right Axis',
};

const LiveUpdatingStory = () => {
  const [data, setData] = useState(multiDateData.map((d) => ({ ...d })));

  const updateData = () => {
    const newData = [...data];
    const idx = randomNumber(0, newData.length - 1);
    const set = newData[idx];

    const updateIndex = randomNumber(0, set.data.length - 1);
    set.data[updateIndex].data = randomNumber(10, 50);

    setData(newData);
  };

  return (
    <Fragment>
      <AreaChart
        width={550}
        height={350}
        series={
          <AreaSeries
            type="grouped"
            colorScheme={chroma
              .scale(['27efb5', '00bfff'])
              .colors(multiDateData.length)}
          />
        }
        data={data}
      />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};
