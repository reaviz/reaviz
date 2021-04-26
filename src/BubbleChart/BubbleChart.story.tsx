import React from 'react';
import { storiesOf } from '@storybook/react';
import { BubbleChart } from './BubbleChart';
import { ChartShallowDataShape } from '../common/data';

const simpleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

storiesOf('Charts/Bubble Chart', module)
  .add('Simple', () => (
    <BubbleChart
      data={simpleData}
      height={500}
      width={500}
    />
  ));
