import { Fragment, useState } from 'react';
import chroma from 'chroma-js';
import {
  multiDateData,
  randomNumber,
  longMultiDateData
} from 'reaviz-data-utils';
import { AreaChart } from './AreaChart';
import { StackedNormalizedAreaChart } from './StackedNormalizedAreaChart';
import { StackedAreaChart } from './StackedAreaChart';
import {
  Area,
  AreaSeries,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries
} from './AreaSeries';
import {
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
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
} from '@/common';

export default {
  tags: ['snapshot'],
  title: 'Charts/Area Chart/Multi Series',
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

export const Simple = () => (
  <AreaChart
    id="simple"
    width={550}
    height={350}
    data={multiDateData}
    series={<AreaSeries type="grouped" colorScheme="cybertron" />}
    xAxis={
      <LinearXAxis type="time">
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
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const LargeDataset = () => (
  <AreaChart
    id="large-dataset"
    width={550}
    height={350}
    series={<AreaSeries type="grouped" colorScheme="cybertron" />}
    data={longMultiDateData}
    xAxis={
      <LinearXAxis type="time">
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
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);
LargeDataset.tags = ['skip-snapshot'];

export const LiveUpdating = () => <LiveUpdatingStory />;
LiveUpdating.tags = ['no-snapshot'];

export const CustomColors = () => (
  <AreaChart
    id="custom-colors"
    width={550}
    height={350}
    series={
      <AreaSeries
        type="grouped"
        colorScheme={(_data, index) => (index % 2 ? 'blue' : 'green')}
      />
    }
    data={multiDateData}
    xAxis={
      <LinearXAxis type="time">
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
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const Stacked = () => (
  <StackedAreaChart
    id="stacked"
    width={550}
    height={350}
    series={<StackedAreaSeries colorScheme="cybertron" />}
    data={multiDateData}
    xAxis={
      <LinearXAxis type="time">
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
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const StackedNormalized = () => (
  <StackedNormalizedAreaChart
    id="stacked-normalized"
    width={550}
    height={350}
    data={multiDateData}
    series={<StackedNormalizedAreaSeries colorScheme="cybertron" />}
    xAxis={
      <LinearXAxis type="time">
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
          <LinearYAxisTickLabel
            rotation={false}
            format={(data) => `${data * 100}%`}
          />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

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
        id="live-updating"
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
        xAxis={
          <LinearXAxis type="time">
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
              <LinearYAxisTickLabel />
            </LinearYAxisTickSeries>
          </LinearYAxis>
        }
      />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};
LiveUpdatingStory.tags = ['no-snapshot'];
