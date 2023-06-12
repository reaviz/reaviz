import { FunnelArc } from './FunnelArc';
import { FunnelChart, FunnelChartProps } from './FunnelChart';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Charts/Funnel Chart',
  component: FunnelChart
}  as Meta;

const Template: Story<FunnelChartProps> =
  args => <FunnelChart {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  height: 300,
  width: 450,
  data: [
    { key: 'Visited Site', data: 1000 },
    { key: 'Added to Cart', data: 900 },
    { key: 'Initiated Checkout', data: 600 },
    { key: 'Completed Purchase', data: 400 },
  ],
};

export const LargeDataset = Template.bind({});
LargeDataset.args = {
  height: 300,
  width: 450,
  data: [
    { key: 'Visited Site', data: 15000 },
    { key: 'Added to Cart', data: 12000 },
    { key: 'Initiated Checkout', data: 11000 },
    { key: 'Completed Purchase', data: 6000 },
    { key: 'Subscribed', data: 3000 },
    { key: 'Became a Member', data: 2000 },
    { key: 'Upgraded to Premium', data: 500 },
    { key: 'Became a VIP', data: 400 },
  ],
};

export const Interpolation = () => (
  <FunnelChart
    height={300}
    width={450}
    arc={<FunnelArc interpolation="step" />}
    interpolation="curveBasis"
    data={[
      { key: 'Visited Site', data: 1000 },
      { key: 'Added to Cart', data: 900 },
      { key: 'Initiated Checkout', data: 600 },
      { key: 'Completed Purchase', data: 400 },
    ]}
  />
);
