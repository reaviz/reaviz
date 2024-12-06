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
    width={550}
    height={350}
    data={multiDateData}
    series={<AreaSeries type="grouped" colorScheme="cybertron" />}
  />
);

export const LargeDataset = () => (
  <AreaChart
    width={550}
    height={350}
    series={<AreaSeries type="grouped" colorScheme="cybertron" />}
    data={longMultiDateData}
  />
);

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

export const Stacked = () => (
  <StackedAreaChart
    width={550}
    height={350}
    series={<StackedAreaSeries colorScheme="cybertron" />}
    data={multiDateData}
  />
);

export const StackedNormalized = () => (
  <StackedNormalizedAreaChart
    width={550}
    height={350}
    data={multiDateData}
    series={<StackedNormalizedAreaSeries colorScheme="cybertron" />}
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
