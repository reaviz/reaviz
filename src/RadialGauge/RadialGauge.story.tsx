import React from 'react';
import { RadialGauge } from './RadialGauge';
import {
  number,
  object,
  color,
  array,
  text,
  boolean
} from '@storybook/addon-knobs';
import { categoryData } from '../../demo';
import {
  RadialGaugeArc,
  RadialGaugeSeries,
  StackedRadialGaugeValueLabel,
  StackedRadialGaugeSeries
} from './RadialGaugeSeries';

import { max } from 'd3-array';

export default {
  title: 'Charts/Gauge/Radial'
};

export const Single = () => {
  const startAngle = number('Start Angle', 0);
  const endAngle = number('End Angle', Math.PI * 2);
  const minValue = number('Min Value', 0);
  const maxValue = number('Max Value', 100);
  const arcWidth = number('Arc width', 10);
  const height = number('Height', 300);
  const width = number('Width', 300);
  const colorScheme = color('Color', '#418AD7');
  const data = object('Data', [
    {
      key: 'Austin, TX',
      data: 24
    }
  ]);

  return (
    <RadialGauge
      data={data}
      startAngle={startAngle}
      endAngle={endAngle}
      height={height}
      width={width}
      minValue={minValue}
      maxValue={maxValue}
      series={
        <RadialGaugeSeries arcWidth={arcWidth} colorScheme={[colorScheme]} />
      }
    />
  );
};

export const FilledArc = () => (
  <RadialGauge
    data={[
      {
        key: 'Austin, TX',
        data: 24
      }
    ]}
    width={350}
    height={350}
    series={
      <RadialGaugeSeries
        outerArc={<RadialGaugeArc fill="gray" animated={false} />}
      />
    }
  />
);

export const CustomArc = () => {
  const arcWidth = number('Arc width', 25);
  const arcCornerRadius = number('Arc corner radius', 12.5);

  const colorScheme = color('Color', '#38e52c');
  const animateOuterArc = boolean('Animate background arc', false);
  const data = object('Data', [
    {
      key: 'Austin, TX',
      data: 24
    }
  ]);

  return (
    <RadialGauge
      data={data}
      height={300}
      width={300}
      series={
        <RadialGaugeSeries
          outerArc={
            <RadialGaugeArc disabled={true} animated={animateOuterArc} />
          }
          innerArc={<RadialGaugeArc cornerRadius={arcCornerRadius} />}
          arcWidth={arcWidth}
          colorScheme={[colorScheme]}
        />
      }
    />
  );
};

export const Multi = () => {
  const startAngle = number('Start Angle', 0);
  const endAngle = number('End Angle', Math.PI * 2);
  const height = number('Height', 300);
  const width = number('Width', 700);
  const colorScheme = array('Color Scheme', [
    '#CE003E',
    '#DF8D03',
    '#00ECB1',
    '#9FA9B1'
  ]);
  const data = object('Data', categoryData);
  const maxValue = max(data, (d) => d.data as number);

  return (
    <RadialGauge
      data={data}
      startAngle={startAngle}
      endAngle={endAngle}
      height={height}
      width={width}
      minValue={0}
      maxValue={maxValue}
      series={<RadialGaugeSeries colorScheme={colorScheme} />}
    />
  );
};

export const MultiLine = () => (
  <RadialGauge
    data={categoryData}
    width={350}
    height={350}
    series={<RadialGaugeSeries minGaugeWidth={150} />}
  />
);

export const Stacked = () => {
  const data = object('Data', categoryData);

  const startAngle = number('Start Angle', 0);
  const endAngle = number('End Angle', Math.PI * 2);
  const minValue = number('Min Value', 0);
  const maxValue = number(
    'Max Value',
    max(data, (d) => d.data as number)
  );
  const fillFactor = number('Fill Factor', 0.3, {
    min: 0,
    max: 1,
    step: 0.1
  });
  const arcPadding = number('Arc Padding', 0.1, {
    min: 0,
    max: 1,
    step: 0.1
  });
  const height = number('Height', 300);
  const width = number('Width', 700);
  const colorScheme = array('Color Scheme', [
    '#CE003E',
    '#DF8D03',
    '#00ECB1',
    '#9FA9B1'
  ]);

  const label = text('Label', 'Security Threats');

  return (
    <RadialGauge
      data={data}
      startAngle={startAngle}
      endAngle={endAngle}
      height={height}
      width={width}
      minValue={minValue}
      maxValue={maxValue}
      series={
        <StackedRadialGaugeSeries
          arcPadding={arcPadding}
          fillFactor={fillFactor}
          colorScheme={colorScheme}
          label={<StackedRadialGaugeValueLabel label={label} />}
        />
      }
    />
  );
};

export const Autosize = () => (
  <div style={{ width: 250, height: 250, border: 'solid 1px red' }}>
    <RadialGauge
      data={[
        {
          key: 'Austin, TX',
          data: 24
        }
      ]}
    />
  </div>
);
