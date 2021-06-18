import React from 'react';
import { storiesOf } from '@storybook/react';
import { BubbleChart } from './BubbleChart';
import { ChartShallowDataShape } from '../common/data';
import { boolean, number, object, select } from '@storybook/addon-knobs';
import { schemes } from '../common/color';
import { BubbleSeries } from './BubbleSeries';
import { range } from 'd3-array';
import { randomNumber } from '../../demo';
import { Bubble } from './Bubble';
import { Gradient } from '../common/Gradient';
import { Stripes } from '../common/Mask';

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
    const gradient = boolean('Gradient', false);
    const mask = boolean('Mask', false);

    return (
      <BubbleChart
        data={data}
        height={height}
        width={width}
        series={
          <BubbleSeries
            colorScheme={scheme}
            bubble={
              <Bubble
                mask={mask ? <Stripes /> : null}
                gradient={gradient ? <Gradient /> : null}
              />
            }
          />
        }
      />
    );
  })
  .add('Long Text', () => {
    const longData: ChartShallowDataShape[] = [
      { key: 'Department of Curtains and Interior Design', data: 100 },
      { key: 'Fresh Kitchen Pasta Dish and Pizza', data: 45 },
      { key: 'Short Name', data: 25 }
    ];

    return <BubbleChart data={longData} height={450} width={450} />;
  })
  .add('No Animation', () => (
    <BubbleChart
      height={450}
      width={450}
      series={<BubbleSeries animated={false} />}
      data={simpleData}
    />
  ))
  .add('Varying Sizes', () => {
    const longData: ChartShallowDataShape[] = range(15).map((o) => ({
      key: `${o}`,
      data: randomNumber(1, 500)
    }));

    return <BubbleChart data={longData} height={450} width={450} />;
  })
  .add('100 Bubbles', () => {
    const longData: ChartShallowDataShape[] = range(100).map((o) => ({
      key: `${o + 1}`,
      data: 1
    }));

    return <BubbleChart data={longData} height={450} width={450} />;
  })
  .add('Autosize', () => (
    <div style={{ width: '70vw', height: '70vh', border: 'solid 1px red' }}>
      <BubbleChart data={simpleData} />
    </div>
  ));
