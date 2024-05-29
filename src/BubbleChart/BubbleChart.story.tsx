import { BubbleChart } from './BubbleChart';
import { ChartShallowDataShape } from '@/common/data';
import { BubbleSeries } from './BubbleSeries';
import { range } from 'd3-array';
import { randomNumber } from '../../demo';
import { Bubble } from './Bubble';
import { Gradient as GradientBG } from '@/common/Gradient';
import { Stripes } from '@/common/Mask';
import { BubbleLabel } from './BubbleLabel';

import oktaLogo from '../../demo/okta.svg';
import awsLogo from '../../demo/aws.svg';
import twilloLogo from '../../demo/twillo.svg';
import sendgridLogo from '../../demo/sendgrid.svg';

const simpleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export default {
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
                AWS: awsLogo,
                SendGrid: sendgridLogo,
                Okta: oktaLogo,
                Twillo: twilloLogo
              };

              return (
                <g>
                  <foreignObject height={40} width={40} x={-40 / 2} y={-50 / 2}>
                    <img src={logos[data.data.key]} width={40} height={40} />
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

export const _100Bubbles = () => {
  const longData: ChartShallowDataShape[] = range(100).map((o) => ({
    key: `${o + 1}`,
    data: 1
  }));

  return <BubbleChart data={longData} height={450} width={450} />;
};

export const Autosize = () => (
  <div style={{ width: '70vw', height: '70vh', border: 'solid 1px red' }}>
    <BubbleChart data={simpleData} />
  </div>
);
