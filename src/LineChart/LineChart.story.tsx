import { storiesOf } from '@storybook/react';
import chroma from 'chroma-js';
import { timeDay } from 'd3-time';
import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { object, number, select } from '@storybook/addon-knobs';

import {
  multiDateData,
  singleDateData,
  largeDateData,
  randomNumber,
  longMultiDateData
} from '../../demo';
import { LineChart, LineSeries } from './LineChart';
import {
  StackedAreaChart,
  StackedNormalizedAreaChart,
  StackedAreaSeries,
  Line,
  StackedNormalizedAreaSeries
} from '../AreaChart';
import { GridlineSeries, Gridline } from '../common/Gridline';
import { PointSeries } from '../AreaChart';
import {
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxisTickSeries,
  LinearYAxis
} from '../common/Axis/LinearAxis';
import { ScatterPoint } from '../ScatterPlot';
import { symbol, symbolStar } from 'd3-shape';
import { schemes } from '../common/color';

const prettyData = (() => {
  const data: any[] = [];
  for (let i = 0; i < 20; i++) {
    const series: any[] = [];
    for (let j = 0; j < 100; j++) {
      series.push({
        key: j,
        data: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50)
      });
    }
    data.push({ key: i, data: series });
  }
  return data;
})();

storiesOf('Charts|Line/Single Series', module)
  .add(
    'Simple',
    () => {
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
    },
    { options: { showPanel: true } }
  )
  .add('No Animation', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries animated={false} />}
    />
  ))
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <LineChart data={singleDateData} xAxis={<LinearXAxis type="time" />} />
    </div>
  ))
  .add('Interval', () => (
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
  ))
  .add(
    'Large Dataset',
    () => {
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
          series={
            <LineSeries colorScheme={color} interpolation={interpolation} />
          }
          xAxis={<LinearXAxis type="time" />}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Dynamic Colors', () => (
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
  ))
  .add('Live Updating', () => <LiveUpdatingStory />);

storiesOf('Charts|Line/Multi Series', module)
  .add(
    'Simple',
    () => {
      const height = number('Height', 250);
      const width = number('Width', 550);
      const lineStroke = number('Stroke Width', 4);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', multiDateData);

      return (
        <LineChart
          width={width}
          height={height}
          series={
            <LineSeries
              type="grouped"
              line={<Line strokeWidth={lineStroke} />}
              colorScheme={color}
            />
          }
          data={data}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Large Data', () => (
    <LineChart
      width={400}
      height={300}
      data={prettyData}
      yAxis={
        <LinearYAxis
          scaled={true}
          type="value"
          axisLine={null}
          tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
        />
      }
      xAxis={
        <LinearXAxis
          type="value"
          scaled={true}
          axisLine={null}
          tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
        />
      }
      series={
        <LineSeries
          type="grouped"
          line={<Line strokeWidth={1} />}
          colorScheme="cybertron"
        />
      }
    />
  ))
  .add('Custom Line Styles', () => (
    <LineChart
      width={550}
      height={350}
      series={
        <LineSeries
          type="grouped"
          line={
            <Line
              strokeWidth={3}
              style={data => {
                if (
                  data &&
                  data.length &&
                  data[0] &&
                  data[0].key === 'Threat Intel'
                ) {
                  console.log('Style callback...', data);
                  return {
                    strokeDasharray: '5'
                  };
                }
              }}
            />
          }
          colorScheme={chroma
            .scale(['27efb5', '00bfff'])
            .colors(multiDateData.length)}
        />
      }
      data={multiDateData}
    />
  ))
  .add('Large Dataset', () => (
    <LineChart
      width={550}
      height={350}
      series={
        <LineSeries
          type="grouped"
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(longMultiDateData.length)}
        />
      }
      data={longMultiDateData}
    />
  ))
  .add(
    'Stacked',
    () => {
      const height = number('Height', 250);
      const width = number('Width', 550);
      const lineStroke = number('Stroke Width', 4);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', multiDateData);

      return (
        <StackedAreaChart
          width={width}
          height={height}
          series={
            <StackedAreaSeries
              colorScheme={color}
              area={null}
              line={<Line strokeWidth={lineStroke} />}
            />
          }
          data={data}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add(
    'Stacked Normalized',
    () => {
      const height = number('Height', 250);
      const width = number('Width', 550);
      const lineStroke = number('Stroke Width', 4);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', multiDateData);

      return (
        <StackedNormalizedAreaChart
          width={width}
          height={height}
          data={data}
          series={
            <StackedNormalizedAreaSeries
              colorScheme={color}
              area={null}
              line={<Line strokeWidth={lineStroke} />}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  );

storiesOf('Charts|Line/Gridlines', module)
  .add('All Axes', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  ))
  .add('X-Axis', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    />
  ))
  .add('Y-Axis', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    />
  ));

storiesOf('Charts|Line/Circle Series', module)
  .add('On', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<PointSeries show={true} />} />}
    />
  ))
  .add('Off', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={null} />}
    />
  ))
  .add('On Hover', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<PointSeries show="hover" />} />}
    />
  ))
  .add('Only First', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<PointSeries show="first" />} />}
    />
  ))
  .add('Only Last', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={<LineSeries symbols={<PointSeries show="last" />} />}
    />
  ))
  .add('Shapes', () => (
    <LineChart
      width={350}
      height={250}
      data={singleDateData}
      series={
        <LineSeries
          symbols={
            <PointSeries
              show={true}
              point={
                <ScatterPoint
                  symbol={() => {
                    const d = symbol()
                      .type(symbolStar)
                      .size(175)();

                    return (
                      <path
                        d={d!}
                        style={{
                          fill: 'lime',
                          stroke: 'purple',
                          strokeWidth: 1.5
                        }}
                      />
                    );
                  }}
                />
              }
            />
          }
        />
      }
    />
  ));

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
          key: moment()
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
