import React from 'react';
import { storiesOf } from '@storybook/react';
import { BubbleChart } from './BubbleChart';
import { ChartShallowDataShape } from '../common/data';
import { number, object, select } from '@storybook/addon-knobs';
import { schemes } from '../common/color';
import { BubbleSeries } from './BubbleSeries';

const simpleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

storiesOf('Charts/Bubble Chart', module)
  .add('Simple', () => {
    const height = number('Height', 450);
    const width = number('Width', 450);
    const data = object('Data', simpleData);
    const scheme = select('Color Scheme', schemes, 'cybertron');

    return (
      <BubbleChart
        data={data}
        height={height}
        width={width}
        series={
          <BubbleSeries
            colorScheme={scheme}
          />
        }
      />
    );
});
