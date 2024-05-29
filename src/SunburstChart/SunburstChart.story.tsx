import React from 'react';
import { SunburstChart } from './SunburstChart';
import { heatmapSimpleData } from '../../demo';

export default {
  title: 'Charts/Sunburst Chart',
  component: SunburstChart,
  subcomponents: {
  }
};

export const Simple = () => (
  <SunburstChart
    height={450}
    width={450}
    data={heatmapSimpleData}
  />
);
