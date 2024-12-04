import { BubbleChart } from './BubbleChart';
import { ChartShallowDataShape } from '@/common/data';
import { BubbleSeries } from './BubbleSeries';
import { range } from 'd3-array';
import { randomNumber } from 'reaviz-data-utils';
import { Bubble } from './Bubble';
import { Gradient as GradientBG } from '@/common/Gradient';
import { Stripes } from '@/common/Mask';
import { BubbleLabel } from './BubbleLabel';

import { icons } from 'reaviz-data-utils';

const simpleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export default {
  tags: ['snapshot'],
  title: 'Charts/Bubble Chart',
  component: BubbleChart,
  subcomponents: {
    BubbleSeries,
    BubbleLabel,
    Bubble
  }
};

export const Simple = () => (
  <BubbleChart
    data={simpleData}
    height={450}
    width={450}
    series={<BubbleSeries colorScheme="cybertron" />}
  />
);

export const Mask = () => (
  <BubbleChart
    data={simpleData}
    height={450}
    width={450}
    series={
      <BubbleSeries
        colorScheme="cybertron"
        bubble={<Bubble mask={<Stripes />} />}
      />
    }
  />
);

export const Gradient = () => (
  <BubbleChart
    data={simpleData}
    height={450}
    width={450}
    series={
      <BubbleSeries
        colorScheme="cybertron"
        bubble={<Bubble gradient={<GradientBG />} />}
      />
    }
  />
);

export const Icons = () => (
  <BubbleChart
    data={simpleData}
    height={450}
    width={450}
    series={
      <BubbleSeries
        label={
          <BubbleLabel
            format={(data) => {
              const logos = {
                AWS: icons.AWS(),
                SendGrid: icons.SendGrid(),
                Okta: icons.Okta(),
                Twillo: icons.Twillo()
              };

              return (
                <g>
                  <foreignObject height={40} width={40} x={-40 / 2} y={-50 / 2}>
                    {logos[data.data.key]}
                  </foreignObject>
                  <text dy={35} fill="white" textAnchor="middle">
                    {data.data.key}
                  </text>
                </g>
              );
            }}
          />
        }
      />
    }
  />
);

export const LongText = () => {
  const longData: ChartShallowDataShape[] = [
    { key: 'Department of Curtains and Interior Design', data: 100 },
    { key: 'Fresh Kitchen Pasta Dish and Pizza', data: 45 },
    { key: 'Short Name', data: 25 }
  ];

  return <BubbleChart data={longData} height={450} width={450} />;
};

export const NoAnimation = () => (
  <BubbleChart
    height={450}
    width={450}
    series={<BubbleSeries animated={false} />}
    data={simpleData}
  />
);

export const VaryingSizes = () => {
  const longData: ChartShallowDataShape[] = range(15).map((o) => ({
    key: `${o}`,
    data: randomNumber(1, 500)
  }));

  return <BubbleChart data={longData} height={450} width={450} />;
};
VaryingSizes.tags = ['no-snapshot'];

export const _100Bubbles = () => {
  const longData: ChartShallowDataShape[] = range(100).map((o) => ({
    key: `${o + 1}`,
    data: 1
  }));

  return <BubbleChart data={longData} height={450} width={450} />;
};
_100Bubbles.tags = ['no-snapshot'];

export const Autosize = () => (
  <div style={{ width: '70vw', height: '70vh', border: 'solid 1px red' }}>
    <BubbleChart data={simpleData} />
  </div>
);
Autosize.tags = ['no-snapshot'];
