import React, { Fragment, useState } from 'react';
import chroma from 'chroma-js';
import { object, number, select } from '@storybook/addon-knobs';
import {
  multiDateData,
  randomNumber,
  longMultiDateData
} from '../../demo';
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
import { schemes } from '../common/color';

export default {
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

export const Simple = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', multiDateData);

    return (
      <AreaChart
        width={width}
        height={height}
        data={data}
        series={<AreaSeries type="grouped" colorScheme={color} />}
      />
    );
  };

export const LargeDataset = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', longMultiDateData);

    return (
      <AreaChart
        width={width}
        height={height}
        series={<AreaSeries type="grouped" colorScheme={color} />}
        data={data}
      />
    );
  };

export const LiveUpdating = () => <LiveUpdatingStory />;

export const CustomColors = () => (
    <AreaChart
      width={550}
      height={350}
      series={
        <AreaSeries
          type="grouped"
          colorScheme={(_data, index) => (index % 2 ? 'blue' : 'green')}
        />
      }
      data={multiDateData}
    />
  );

export const Stacked = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', multiDateData);

    return (
      <StackedAreaChart
        width={width}
        height={height}
        series={<StackedAreaSeries colorScheme={color} />}
        data={data}
      />
    );
  };

export const StackedNormalized = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', multiDateData);

    return (
      <StackedNormalizedAreaChart
        width={width}
        height={height}
        data={data}
        series={<StackedNormalizedAreaSeries colorScheme={color} />}
      />
    );
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
