import React from 'react';
import { storiesOf } from '@storybook/react';
import { RadialAreaChart } from './RadialAreaChart';
import { medDateData, categoryData } from '../../demo';
import { RadialAreaSeries } from './RadialAreaSeries';
import { number, boolean, object, select } from '@storybook/addon-knobs';
import {
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisArcSeries,
  RadialAxisTickLine,
} from '../common/Axis';
import { schemes } from '../common/color';

storiesOf('Charts/Line/Radial', module)
  .add(
    'Simple',
    () => {
      const innerRadius = number('Inner Radius', 0.1);
      const animated = boolean('Animated', true);
      const color = select('Color Scheme', schemes, 'cybertron');
      const autoRotate = boolean('Auto Rotate Labels', true);
      const tickCount = number('Tick Count', 5);
      const tickPosition = select(
        'Tick Position',
        {
          inside: 'inside',
          outside: 'outside',
        },
        'outside'
      );
      const arcCount = number('Arc Count', 10);
      const interpolation = select(
        'Interpolation',
        {
          linear: 'linear',
          smooth: 'smooth',
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
    },
    { options: { showPanel: true } }
  )
  .add('Categorical Data', () => (
    <RadialAreaChart
      data={categoryData}
      height={300}
      width={300}
      series={<RadialAreaSeries area={null} />}
      axis={<RadialAxis type="category" />}
    />
  ));
