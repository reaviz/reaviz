import React from 'react';
import { SunburstChart } from './SunburstChart';
import { heatmapSimpleData } from 'reaviz-data-utils';
import { SunburstSeries } from './SunburstSeries';
import { SunburstArc } from './SunburstArc';
import { SunburstArcLabel } from './SunburstArcLabel';

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

export const Gradient = () => (
  <SunburstChart
    height={450}
    width={450}
    data={heatmapSimpleData}
    series={<SunburstSeries arc={<SunburstArc gradient={<Gradient />} />} />}
  />
);
