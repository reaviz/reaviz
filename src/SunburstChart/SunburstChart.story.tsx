import React from 'react';
import { SunburstChart } from './SunburstChart';
import { heatmapSimpleData } from 'reaviz-data-utils';
import { SunburstSeries } from './SunburstSeries';
import { SunburstArc } from './SunburstArc';
import { SunburstArcLabel } from './SunburstArcLabel';
import { Gradient } from '@/common/Gradient';

export default {
  title: 'Charts/Sunburst Chart',
  component: SunburstChart,
  subcomponents: {
    SunburstSeries,
    SunburstArc,
    SunburstArcLabel
  }
};

export const Simple = () => (
  <SunburstChart height={450} width={450} data={heatmapSimpleData} />
);

export const Gradients = () => (
  <SunburstChart
    height={450}
    width={450}
    data={heatmapSimpleData}
    series={<SunburstSeries arc={<SunburstArc gradient={<Gradient />} />} />}
  />
);

export const NoAnimation = () => (
  <SunburstChart
    height={450}
    width={450}
    data={heatmapSimpleData}
    series={<SunburstSeries animated={false} />}
  />
);

export const Autosize = () => (
  <div style={{ width: '75vw', height: '75vh', border: 'solid 1px red' }}>
    <SunburstChart data={heatmapSimpleData} />
  </div>
);
