import React from 'react';
import { timeDay } from 'd3-time';
import { object, number, select } from '@storybook/addon-knobs';
import {
  singleDateData,
  singleDateBigIntData,
  nonZeroDateData
} from '../../demo';
import { AreaChart } from './AreaChart';
import { range } from 'd3-array';
import {
  AreaSeries,
  Area,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries
} from './AreaSeries';
import { LinearXAxis, LinearXAxisTickSeries } from '../common/Axis/LinearAxis';
import { Gradient, GradientStop } from '../common/Gradient';
import { Stripes } from '../common/Mask';
import { ChartDataShape } from '../common/data';
import { schemes } from '../common/color';

export default {
  title: 'Charts/Area Chart/Single Series',
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
    <AreaChart
      width={width}
      height={height}
      data={data}
      series={
        <AreaSeries
          interpolation={interpolation}
          colorScheme={color}
          line={<Line strokeWidth={lineStroke} />}
        />
      }
    />
  );
};

export const Masks = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        area={
          <Area
            mask={<Stripes />}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="10%" stopOpacity={0} />,
                  <GradientStop offset="80%" stopOpacity={1} />
                ]}
              />
            }
          />
        }
        line={<Line strokeWidth={3} />}
      />
    }
  />
);

export const NoAnimation = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries animated={false} />}
  />
);

export const NonZero = () => (
  <AreaChart
    width={350}
    height={250}
    data={nonZeroDateData as ChartDataShape[]}
  />
);

NonZero.story = {
  name: 'Non-Zero'
};

export const Interval = () => (
  <AreaChart
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

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <AreaChart data={singleDateData} />
  </div>
);

export const SingleValue = () => (
  <AreaChart data={[singleDateData[0]]} width={350} height={250} />
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
      <AreaChart data={singleDateData} />
    </div>
  ));

export const BigInt = () => (
  <AreaChart width={350} height={250} data={singleDateBigIntData} />
);
