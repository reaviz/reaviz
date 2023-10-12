import { TooltipArea } from '../common';
import { Story, Meta } from '@storybook/react';
import { FunnelSeries, FunnelChart, FunnelChartProps, FunnelAxis, FunnelAxisLabel, FunnelAxisLine, FunnelArc } from './';

export default {
  title: 'Charts/Funnel Chart',
  component: FunnelChart,
  subcomponents: {
    FunnelArc,
    FunnelAxis,
    FunnelAxisLabel,
    FunnelAxisLine,
    FunnelSeries
  }
}  as Meta;

const Template: Story<FunnelChartProps> =
  args => <FunnelChart {...args} />;

export const Basic = Template.bind({});
Basic.args = {
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
  series:
    <FunnelSeries
      arc={<FunnelArc tooltip={<TooltipArea />} />}
      onSegmentClick={(e) => console.log(e)}
    />,
};

export const Interpolation = () => (
  <FunnelChart
    height={300}
    width={500}
    series={<FunnelSeries arc={<FunnelArc interpolation='step'/>} />}
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
