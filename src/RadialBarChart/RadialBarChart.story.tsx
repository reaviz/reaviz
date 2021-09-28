import React from 'react';
import { RadialBarChart } from './RadialBarChart';
import { largeCategoryData, medDateData } from '../../demo';
import { number, boolean, object, select } from '@storybook/addon-knobs';
import { RadialBarSeries, RadialBar, RadialGuideBar } from './RadialBarSeries';
import {
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLine
} from '../common/Axis/RadialAxis';
import { schemes } from '../common/color';

export default {
  title: 'Charts/Bar Chart/Radial',
  component: RadialBarChart,
  subcomponents: {
    RadialBarSeries,
    RadialBar,
    RadialGuideBar
  }
};

export const Simple = () => {
  const innerRadius = number('Inner Radius', 50);
  const curved = boolean('Curved', false);
  const hasGradient = boolean('Gradient', true);
  const animated = boolean('Animated', true);
  const hasGuide = boolean('Show Guide', true);
  const color = select('Color Scheme', schemes, 'cybertron');
  const arcCount = number('Arc Count', 10);
  const tickPosition = select(
    'Tick Position',
    {
      inside: 'inside',
      outside: 'outside'
    },
    'inside'
  );
  const data = object('Data', medDateData);
  const gradient = hasGradient ? RadialBar.defaultProps.gradient : false;
  const colorScheme = schemes[color][0];
  const guide = hasGuide ? <RadialGuideBar /> : null;

  return (
    <RadialBarChart
      height={450}
      width={450}
      innerRadius={innerRadius}
      data={data}
      series={
        <RadialBarSeries
          animated={animated}
          colorScheme={colorScheme}
          bar={<RadialBar curved={curved} gradient={gradient} guide={guide} />}
        />
      }
      axis={
        <RadialAxis
          ticks={
            <RadialAxisTickSeries
              tick={
                <RadialAxisTick
                  line={<RadialAxisTickLine position={tickPosition} />}
                />
              }
            />
          }
          arcs={<RadialAxisArcSeries count={arcCount} />}
        />
      }
    />
  );
};

export const Resizable = () => (
  <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
    <RadialBarChart data={largeCategoryData} innerRadius={10} />
  </div>
);
