import React from 'react';
import { RadialAreaChart } from './RadialAreaChart';
import { medDateData, categoryData } from '../../demo';
import { RadialAreaSeries, RadialArea, RadialLine, RadialPointSeries } from './RadialAreaSeries';
import { number, boolean, object, select } from '@storybook/addon-knobs';
import {
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisArcSeries,
  RadialAxisTickLine
} from '../common/Axis';
import { schemes } from '../common/color';
import { RadialGradient } from '../common/Gradient';

export default {
  title: 'Charts/Area Chart/Radial',
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
  const hasGradient = boolean('Gradient', true);
  const autoRotate = boolean('Auto Rotate Labels', true);
  const color = select('Color Scheme', schemes, 'cybertron');
  const gradient = hasGradient ? <RadialGradient /> : null;
  const tickCount = number('Tick Count', 5);
  const arcCount = number('Arc Count', 10);
  const tickPosition = select(
    'Tick Position',
    {
      inside: 'inside',
      outside: 'outside'
    },
    'inside'
  );
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
      height={450}
      width={450}
      data={data}
      innerRadius={innerRadius}
      series={
        <RadialAreaSeries
          colorScheme={color}
          animated={animated}
          interpolation={interpolation}
          area={<RadialArea gradient={gradient} />}
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
    height={300}
    width={300}
    axis={<RadialAxis type="category" />}
  />
);

export const Resizable = () => (
  <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
    <RadialAreaChart data={medDateData} />
  </div>
);
