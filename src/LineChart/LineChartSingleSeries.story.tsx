import { Fragment, useState } from 'react';
import { timeDay } from 'd3-time';
import moment from 'moment';
import { singleDateData, largeDateData, randomNumber } from '../../demo';
import { LineChart } from './LineChart';
import { Line } from '../AreaChart';
import { LinearXAxisTickSeries, LinearXAxis } from '../common/Axis/LinearAxis';
import { LineSeries } from './LineSeries';

export default {
  title: 'Charts/Line Chart/Single Series',
  component: LineChart,
  subcomponents: {
    LineSeries,
    Line
  }
};

export const Simple = () => (
  <LineChart
    width={250}
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

export const LargeDataset = () => (
  <LineChart
    width={400}
    height={250}
    data={largeDateData}
    series={<LineSeries colorScheme="cybertron" interpolation="linear" />}
    xAxis={<LinearXAxis type="time" />}
  />
);

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
          key: moment('2020-02-29T08:00:00.000Z').add(++offset, 'day').toDate(),
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
