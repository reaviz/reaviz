import React from 'react';
import { RadialAreaChart } from './RadialAreaChart';
import { medDateData, categoryData, multiCategory } from '../../demo';
import {
  RadialArea,
  RadialAreaSeries,
  RadialLine,
  RadialPointSeries
} from './RadialAreaSeries';
import { number, boolean, object, select } from '@storybook/addon-knobs';
import {
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisArcSeries,
  RadialAxisTickLine,
  RadialAxisArcLine
} from '../common/Axis';
import { schemes } from '../common/color';

export default {
  title: 'Charts/Line Chart/Radial',
  component: RadialAreaChart,
  subcomponents: {
    RadialAreaSeries,
    RadialArea,
    RadialLine,
    RadialPointSeries
  }
};

export const Simple = () => {
  const innerRadius = number('Inner Radius', 0.1);
  const animated = boolean('Animated', true);
  const color = select('Color Scheme', schemes, 'cybertron');
  const autoRotate = boolean('Auto Rotate Labels', true);
  const tickCount = number('Tick Count', 5);
  const tickPosition = select(
    'Tick Position',
    {
      inside: 'inside',
      outside: 'outside'
    },
    'outside'
  );
  const arcCount = number('Arc Count', 5);
  const interpolation = select(
    'Interpolation',
    {
      linear: 'linear',
      smooth: 'smooth'
    },
    'smooth'
  );
  const data = object('Data', medDateData);

  return (
    <RadialAreaChart
      height={500}
      width={500}
      data={data}
      innerRadius={innerRadius}
      series={
        <RadialAreaSeries
          area={null}
          colorScheme={color}
          animated={animated}
          interpolation={interpolation}
        />
      }
      axis={
        <RadialAxis
          arcs={<RadialAxisArcSeries count={arcCount} />}
          ticks={
            <RadialAxisTickSeries
              count={tickCount}
              tick={
                <RadialAxisTick
                  line={<RadialAxisTickLine position={tickPosition} />}
                  label={<RadialAxisTickLabel autoRotate={autoRotate} />}
                />
              }
            />
          }
        />
      }
    />
  );
};

export const CategoricalData = () => (
  <RadialAreaChart
    data={categoryData}
    height={500}
    width={500}
    series={<RadialAreaSeries area={null} />}
    axis={<RadialAxis type="category" />}
  />
);

export const MultiSeries = () => (
  <RadialAreaChart
    data={multiCategory}
    height={500}
    width={500}
    series={<RadialAreaSeries area={null} type="grouped" />}
    axis={<RadialAxis type="category" />}
  />
);

export const Spider = () => (
  <RadialAreaChart
    data={multiCategory}
    height={500}
    width={500}
    series={
      <RadialAreaSeries
        area={null}
        type="grouped"
        symbols={<RadialPointSeries show />}
      />
    }
    axis={
      <RadialAxis
        type="category"
        arcs={
          <RadialAxisArcSeries
            count={5}
            arc={null}
            line={<RadialAxisArcLine />}
          />
        }
      />
    }
  />
);
