import React, { Fragment, useState } from 'react';
import { boolean, number, object, select, color } from '@storybook/addon-knobs';
import { BarChart } from './BarChart';
import {
  categoryData,
  largeCategoryData,
  randomNumber,
  nonZeroCategoryData
} from '../../demo';
import chroma from 'chroma-js';
import { range } from 'd3-array';
import {
  BarSeries,
  Bar,
  BarLabel,
  GuideBar,
  RangeLines,
  StackedBarSeries,
  StackedNormalizedBarSeries,
  MarimekkoBarSeries,
  HistogramBarSeries
} from './BarSeries';
import { Stripes } from '../common/Mask';
import { schemes } from '../common/color';

export default {
  title: 'Charts/Bar Chart/Vertical/Single Series',
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
    const color = select('Color Scheme', schemes, 'cybertron');
    const hasGradient = boolean('Gradient', true);
    const hasGuideBar = boolean('Guide Bar', true);
    const padding = number('Padding', 0.1);
    const height = number('Height', 350);
    const width = number('Width', 400);
    const gradient = hasGradient ? Bar.defaultProps.gradient : null;
    const guide = hasGuideBar ? <GuideBar /> : null;

    return (
      <BarChart
        width={width}
        height={height}
        data={categoryData}
        series={
          <BarSeries
            colorScheme={color}
            padding={padding}
            bar={<Bar gradient={gradient} guide={guide} />}
          />
        }
      />
    );
  };

export const CustomStyle = () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      series={
        <BarSeries
          bar={
            <Bar
              gradient={null}
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

export const LargeDataset = () => {
    const height = number('Height', 350);
    const width = number('Width', 350);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', largeCategoryData);

    return (
      <BarChart
        width={width}
        height={height}
        data={data}
        series={<BarSeries colorScheme={color} />}
      />
    );
  };

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

export const Labels = () => {
    const position = select(
      'Position',
      {
        top: 'top',
        center: 'center',
        bottom: 'bottom'
      },
      'top'
    );
    const fill = color('Color', '');

    return (
      <BarChart
        width={350}
        height={250}
        data={categoryData}
        series={
          <BarSeries
            bar={<Bar label={<BarLabel fill={fill} position={position} />} />}
          />
        }
      />
    );
  };

export const CustomBarWidth = () => {
    const barWidth = number('Bar Width', 5);

    return (
      <BarChart
        width={350}
        height={250}
        series={<BarSeries bar={<Bar width={barWidth} />} />}
        data={categoryData}
      />
    );
  };

export const LiveUpdating = () => <LiveDataDemo />;

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

export const Waterfall = () => {
    const height = number('Height', 350);
    const width = number('Width', 350);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', categoryData);

    return (
      <BarChart
        width={width}
        height={height}
        data={data}
        series={<BarSeries type="waterfall" colorScheme={color} />}
      />
    );
  };

export const NonZero = () => {
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', nonZeroCategoryData);
    return (
      <BarChart
        width={350}
        height={250}
        data={data}
        series={<BarSeries colorScheme={color} />}
      />
    );
  };

NonZero.story = {
  name: 'Non-Zero',
};

const LiveDataDemo = () => {
  const [data, setData] = useState([...largeCategoryData]);

  const updateData = () => {
    const updateCount = randomNumber(1, 4);
    const newData = [...data];

    let idx = 0;
    while (idx <= updateCount) {
      const updateIndex = randomNumber(0, data.length - 1);
      newData[updateIndex].data = randomNumber(10, 100);
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
