import React, { Fragment, useState } from 'react';
import { timeDay } from 'd3-time';
import moment from 'moment';
import { object, number, select } from '@storybook/addon-knobs';
import { singleDateData, largeDateData, randomNumber } from '../../demo';
import { LineChart } from './LineChart';
import { Line } from '../AreaChart';
import { LinearXAxisTickSeries, LinearXAxis } from '../common/Axis/LinearAxis';
import { schemes } from '../common/color';
import { LineSeries } from './LineSeries';

export default {
  title: 'Charts/Line Chart/Single Series',
  component: LineChart,
  subcomponents: {
    LineSeries,
    Line
  }
};

export const Simple = () => {
  const height = number('Height', 250);
  const width = number('Width', 350);
  const lineStroke = number('Stroke Width', 4);
  const color = select('Color Scheme', schemes, 'cybertron');
  const interpolation = select(
    'Interpolation',
    {
      linear: 'linear',
      step: 'step',
      smooth: 'smooth'
    },
    'linear'
  );
  const data = object('Data', singleDateData);

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      series={
        <LineSeries
          interpolation={interpolation}
          colorScheme={color}
          line={<Line strokeWidth={lineStroke} />}
        />
      }
    />
  );
};

export const NoAnimation = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries animated={false} />}
  />
);

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <LineChart data={singleDateData} xAxis={<LinearXAxis type="time" />} />
  </div>
);

export const Interval = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    xAxis={
      <LinearXAxis
        type="time"
        tickSeries={<LinearXAxisTickSeries interval={timeDay} />}
      />
    }
  />
);

export const LargeDataset = () => {
  const height = number('Height', 250);
  const width = number('Width', 400);
  const color = select('Color Scheme', schemes, 'cybertron');
  const interpolation = select(
    'Interpolation',
    {
      linear: 'linear',
      step: 'step',
      smooth: 'smooth'
    },
    'linear'
  );
  const data = object('Data', largeDateData);

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      series={<LineSeries colorScheme={color} interpolation={interpolation} />}
      xAxis={<LinearXAxis type="time" />}
    />
  );
};

export const DynamicColors = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <LineSeries
        colorScheme={(_data, _index, active) => (active ? 'blue' : 'green')}
      />
    }
  />
);

export const LiveUpdating = () => <LiveUpdatingStory />;

let interval;
let offset = 0;
const LiveUpdatingStory = () => {
  const [data, setData] = useState([...singleDateData]);

  const startData = () => {
    interval = setInterval(() => {
      const newData: any[] = [
        ...data,
        {
          id: randomNumber(1, 10000),
          key: moment('2020-02-29T08:00:00.000Z')
            .add(++offset, 'day')
            .toDate(),
          data: randomNumber(1, 20)
        }
      ];

      setData(newData);
    }, 500);
  };

  return (
    <Fragment>
      <LineChart width={550} height={350} data={data} />
      <br />
      <button onClick={startData}>Start</button>
      <button onClick={() => clearInterval(interval)}>Stop</button>
    </Fragment>
  );
};
