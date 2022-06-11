import React from 'react';
import {
  medDateData,
  largeSignalChartData,
  medSignalChartData
} from '../../demo';
import { number, boolean, object, color, select } from '@storybook/addon-knobs';
import { RadialScatterPlot } from './RadialScatterPlot';
import { RadialScatterSeries, RadialScatterPoint } from './RadialScatterSeries';
import {
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLine
} from '../common/Axis/RadialAxis';

export default {
  title: 'Charts/Scatter Plot/Radial',
  component: RadialScatterPlot,
  subcomponents: {
    RadialScatterSeries,
    RadialScatterPoint
  }
};

export const Simple = () => {
  const innerRadius = number('Inner Radius', 80);
  const size = number('Size', 5);
  const animated = boolean('Animated', true);
  const fill = color('Fill', 'rgba(45, 96, 232, .8)');
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
  const data = object('Data', medDateData);

  return (
    <RadialScatterPlot
      height={450}
      width={450}
      data={data}
      innerRadius={innerRadius}
      series={
        <RadialScatterSeries
          animated={animated}
          point={<RadialScatterPoint size={size} color={fill} />}
        />
      }
      axis={
        <RadialAxis
          ticks={
            <RadialAxisTickSeries
              count={tickCount}
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

export const Bubble = () => {
  const innerRadius = number('Inner Radius', 0.1);
  const animated = boolean('Animated', true);
  const fill = color('Fill', 'rgba(45, 96, 232, .6)');
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
  const data = object('Data', largeSignalChartData);

  return (
    <RadialScatterPlot
      height={450}
      width={450}
      data={data}
      innerRadius={innerRadius}
      series={
        <RadialScatterSeries
          animated={animated}
          point={
            <RadialScatterPoint
              color={fill}
              size={(v) => v.metadata.severity + 5}
            />
          }
        />
      }
      axis={
        <RadialAxis
          ticks={
            <RadialAxisTickSeries
              count={tickCount}
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

export const Symbols = () => {
  const innerRadius = number('Inner Radius', 80);
  const animated = boolean('Animated', true);
  const fill = color('Fill', 'rgba(206, 0, 62, .7)');
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
  const data = object('Data', medSignalChartData);

  return (
    <RadialScatterPlot
      height={450}
      width={450}
      data={data}
      innerRadius={innerRadius}
      series={
        <RadialScatterSeries
          animated={animated}
          point={
            <RadialScatterPoint
              symbol={(d) => {
                const scale = d.metadata.severity / 50;
                const size = scale * 100;
                return (
                  <g transform={`translate(-${size}, -${size})`}>
                    <polygon
                      points="225,10 100,210 350,210"
                      transform={`scale(${scale})`}
                      style={{
                        fill,
                        stroke: '#FF004D',
                        strokeWidth: 5
                      }}
                    />
                  </g>
                );
              }}
            />
          }
        />
      }
      axis={
        <RadialAxis
          ticks={
            <RadialAxisTickSeries
              count={tickCount}
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

export const Resizable = () => {
  const innerRadius = number('Inner Radius', 10);
  const animated = boolean('Animated', true);
  const fill = color('Fill', 'rgba(45, 96, 232, .6)');
  const size = number('Size', 5);
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
  const data = object('Data', largeSignalChartData);
  
  return (
    <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
      <RadialScatterPlot
        height={210}
        width={210}
        data={data}
        innerRadius={innerRadius}
        series={
          <RadialScatterSeries
            animated={animated}
            point={<RadialScatterPoint size={size} color={fill} />}
          />
        }
        axis={
          <RadialAxis
            ticks={
              <RadialAxisTickSeries
                count={tickCount}
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
    </div>
  )
};
