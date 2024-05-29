import React from 'react';
import { ChartShallowDataShape } from '@/common/data';
import { SunburstChart } from './SunburstChart';

export default {
  title: 'Charts/Sunburst Chart',
  component: SunburstChart,
  subcomponents: {
  }
};

const simpleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export const Simple = () => (
  <SunburstChart
    height={450}
    width={450}
    data={simpleData}
  />
);
