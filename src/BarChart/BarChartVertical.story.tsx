import React, { Fragment, useState } from 'react';
import { BarChart } from './BarChart';
import {
  categoryData,
  largeCategoryData,
  nonZeroCategoryData
} from 'reaviz-data-utils';
import { BarSeries, Bar, BarLabel, GuideBar } from './BarSeries';
import chroma from 'chroma-js';
import { range } from 'd3-array';
import { Stripes } from '@/common/Mask';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Vertical/Single Series',
  component: BarChart,
  subcomponents: {
    BarSeries,
    Bar,
    BarLabel,
    GuideBar
  }
};

const data = categoryData.map((entry, i) => ({
  key_url: `https://google.com/${i}`,
  ...entry
}));

export const Simple = () => (
  <BarChart
    width={400}
    height={350}
    data={data}
    series={<BarSeries padding={0.1} bar={<Bar />} />}
  />
);

export const CustomStyle = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={
      <BarSeries
        bar={
          <Bar
            style={(data) => {
              if (data.key === 'DLP') {
                console.log('Style callback...', data);
                return {
                  fill: 'blue'
                };
              }
            }}
          />
        }
      />
    }
  />
);

export const LargeDataset = () => (
  <BarChart
    width={350}
    height={350}
    data={largeCategoryData}
    series={<BarSeries />}
  />
);

export const Mask = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={<BarSeries bar={<Bar mask={<Stripes />} />} />}
  />
);

export const CustomColors = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={
      <BarSeries
        colorScheme={(_data, index) => (index % 2 ? '#418AD7' : '#ACB7C9')}
      />
    }
  />
);

export const Labels = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={<BarSeries bar={<Bar label={<BarLabel position={'top'} />} />} />}
  />
);

export const CustomBarWidth = () => (
  <BarChart
    width={350}
    height={250}
    series={<BarSeries bar={<Bar width={5} />} />}
    data={categoryData}
  />
);

export const LiveUpdating = () => {
  const [data, setData] = useState([...largeCategoryData]);

  const updateData = () => {
    const updateCount = Math.floor(Math.random() * 4) + 1;
    const newData = [...data];

    let idx = 0;
    while (idx <= updateCount) {
      const updateIndex = Math.floor(Math.random() * data.length);
      newData[updateIndex].data = Math.floor(Math.random() * 91) + 10;
      idx++;
    }

    setData(newData);
  };

  const sortData = () => {
    setData([...data].reverse());
  };

  return (
    <Fragment>
      <BarChart
        width={350}
        height={350}
        data={data}
        series={
          <BarSeries
            colorScheme={chroma.scale(['ACB7C9', '418AD7']).colors(data.length)}
          />
        }
      />
      <br />
      <button onClick={updateData}>Update</button>
      <button onClick={sortData}>Sort</button>
    </Fragment>
  );
};

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <BarChart data={categoryData} />
  </div>
);

export const Performance = () =>
  range(15).map((i) => (
    <div
      key={i}
      style={{
        width: '250px',
        height: '250px',
        border: 'solid 1px green',
        margin: '25px',
        display: 'inline-block'
      }}
    >
      <BarChart data={categoryData} />
    </div>
  ));

export const NoAnimation = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={<BarSeries animated={false} />}
  />
);

export const Waterfall = () => (
  <BarChart
    width={350}
    height={350}
    data={categoryData}
    series={<BarSeries type="waterfall" />}
  />
);

export const NonZero = () => (
  <BarChart
    width={350}
    height={250}
    data={nonZeroCategoryData}
    series={<BarSeries />}
  />
);

NonZero.story = {
  name: 'Non-Zero'
};
