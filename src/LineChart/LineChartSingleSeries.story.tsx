import { timeDay } from 'd3-time';
import { Fragment, useState } from 'react';
import { largeDateData, randomNumber, singleDateData } from 'reaviz-data-utils';

import { Line } from '@/AreaChart';
import { LinearXAxis, LinearXAxisTickSeries } from '@/common/Axis/LinearAxis';

import { LineChart } from './LineChart';
import { LineSeries } from './LineSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Line Chart/Single Series',
  component: LineChart,
  subcomponents: {
    LineSeries,
    Line,
  },
};

export const Simple = () => (
  <LineChart
    id="simple"
    width={350}
    height={250}
    data={singleDateData}
    series={
      <LineSeries
        interpolation="linear"
        colorScheme="cybertron"
        line={<Line strokeWidth={4} />}
      />
    }
  />
);

export const NoAnimation = () => (
  <LineChart
    id="no-animation"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries animated={false} />}
  />
);

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <LineChart
      id="autosize"
      data={singleDateData}
      xAxis={<LinearXAxis type="time" />}
    />
  </div>
);

export const Interval = () => (
  <LineChart
    id="interval"
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

export const LargeDataset = () => (
  <LineChart
    id="large-dataset"
    width={400}
    height={250}
    data={largeDateData}
    series={<LineSeries colorScheme="cybertron" interpolation="linear" />}
    xAxis={<LinearXAxis type="time" />}
  />
);
LargeDataset.tags = ['skip-snapshot'];

export const DynamicColors = () => (
  <LineChart
    id="dynamic-colors"
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

LiveUpdating.tags = ['no-snapshot'];

let interval;
let offset = 0;
const startDate = new Date('2020-02-29T08:00:00.000Z');
const LiveUpdatingStory = () => {
  const [data, setData] = useState([...singleDateData]);

  const startData = () => {
    interval = setInterval(() => {
      const newData: any[] = [
        ...data,
        {
          id: randomNumber(1, 10000),
          key: new Date(startDate.getTime() + ++offset * 24 * 60 * 60 * 1000),
          data: randomNumber(1, 20),
        },
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

LiveUpdatingStory.tags = ['no-snapshot'];
