import { TooltipArea } from '@/common';
import { StoryFn, Meta } from '@storybook/react';
import {
  FunnelSeries,
  FunnelChart,
  FunnelChartProps,
  FunnelAxis,
  FunnelAxisLabel,
  FunnelAxisLine,
  FunnelArc
} from './';

export default {
  tags: ['snapshot'],
  title: 'Charts/Funnel Chart',
  component: FunnelChart,
  subcomponents: {
    FunnelArc,
    FunnelAxis,
    FunnelAxisLabel,
    FunnelAxisLine,
    FunnelSeries
  }
} as Meta;

const Template: StoryFn<FunnelChartProps> = (args) => <FunnelChart {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  id: 'basic',
  height: 300,
  width: 500,
  data: [
    { key: 'Visited Site', data: 1000 },
    { key: 'Added to Cart', data: 900 },
    { key: 'Initiated Checkout', data: 600 },
    { key: 'Purchased', data: 400 }
  ]
};

export const LargeDataset = Template.bind({});
LargeDataset.args = {
  id: 'large-dataset',
  height: 300,
  width: 500,
  data: [
    { key: 'Visited Site', data: 15000 },
    { key: 'Added to Cart', data: 12000 },
    { key: 'Initiated Checkout', data: 11000 },
    { key: 'Purchased', data: 6000 },
    { key: 'Subscribed', data: 5000 },
    { key: 'Became a Member', data: 3000 },
    { key: 'Upgraded to Premium', data: 1000 },
    { key: 'Became a VIP', data: 900 }
  ],
  series: (
    <FunnelSeries
      arc={<FunnelArc tooltip={<TooltipArea />} />}
      onSegmentClick={(e) => console.log(e)}
    />
  )
};

export const Interpolation = () => (
  <FunnelChart
    id="interpolation"
    height={300}
    width={500}
    series={<FunnelSeries arc={<FunnelArc interpolation="step" />} />}
    interpolation="curveBasis"
    data={[
      { key: 'Visited Site', data: 1000 },
      { key: 'Added to Cart', data: 900 },
      { key: 'Initiated Checkout', data: 600 },
      { key: 'Purchased', data: 400 }
    ]}
  />
);

export const Autosize = () => (
  <div style={{ width: '90vw', height: '90vh', border: 'solid 1px red' }}>
    <FunnelChart
      id="autosize"
      data={[
        { key: 'Visited Site', data: 1000 },
        { key: 'Added to Cart', data: 900 },
        { key: 'Initiated Checkout', data: 600 },
        { key: 'Purchased', data: 400 }
      ]}
    />
  </div>
);

export const Layered = () => (
  <FunnelChart
    id="layered"
    height={400}
    width={800}
    data={[
      { key: 'Visited Site', data: 1000 },
      { key: 'Added to Cart', data: 900 },
      { key: 'Initiated Checkout', data: 600 },
      { key: 'Purchased', data: 400 }
    ]}
    series={
      <FunnelSeries
        arc={
          <FunnelArc
            variant="layered"
            colorScheme={['#013027', '#047662', '#06B899']}
            gradient={null}
          />
        }
      />
    }
  />
);

export const LabelPosition = () => (
  <FunnelChart
    id="label-position"
    height={300}
    width={500}
    series={
      <FunnelSeries
        axis={<FunnelAxis label={<FunnelAxisLabel position="bottom" />} />}
      />
    }
    data={[
      { key: 'Visited Site', data: 1000 },
      { key: 'Added to Cart', data: 900 },
      { key: 'Initiated Checkout', data: 600 },
      { key: 'Purchased', data: 400 }
    ]}
  />
);

export const NoValue = () => (
  <FunnelChart
    id="no-value"
    height={300}
    width={500}
    series={
      <FunnelSeries
        arc={<FunnelArc tooltip={<TooltipArea />} />}
        axis={<FunnelAxis label={<FunnelAxisLabel showValue={false} />} />}
      />
    }
    data={[
      { key: 'Visited Site', data: 1000 },
      { key: 'Added to Cart', data: 900 },
      { key: 'Initiated Checkout', data: 600 },
      { key: 'Purchased', data: 400 }
    ]}
  />
);
