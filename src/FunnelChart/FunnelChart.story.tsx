import { FunnelChart, FunnelChartProps } from './FunnelChart';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Charts/Funnel Chart',
  component: FunnelChart
}  as Meta;

const Template: Story<FunnelChartProps> =
  args => <FunnelChart {...args} />;

export const SingleStage = Template.bind({});
SingleStage.args = {
  height: 300,
  width: 450,
  data: [
    { key: 'Visited Site', data: 1000 },
  ],
};

export const MultipleStages = Template.bind({});
MultipleStages.args = {
  height: 300,
  width: 450,
  data: [
    { key: 'Visited Site', data: 1000 },
    { key: 'Added to Cart', data: 800 },
    { key: 'Initiated Checkout', data: 600 },
    { key: 'Completed Purchase', data: 400 },
  ],
};

export const ManyStages = Template.bind({});
ManyStages.args = {
  height: 300,
  width: 450,
  data: [
    { key: 'Visited Site', data: 1000 },
    { key: 'Added to Cart', data: 800 },
    { key: 'Initiated Checkout', data: 600 },
    { key: 'Completed Purchase', data: 400 },
    { key: 'Returned for Refund', data: 200 },
  ],
};
