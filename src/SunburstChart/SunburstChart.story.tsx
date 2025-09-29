import chroma from 'chroma-js';
import React from 'react';
import { heatmapSimpleData } from 'reaviz-data-utils';

import { Gradient } from '@/common/Gradient';

import { SunburstArc } from './SunburstArc';
import { SunburstArcLabel } from './SunburstArcLabel';
import { SunburstChart } from './SunburstChart';
import { SunburstSeries } from './SunburstSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Sunburst Chart',
  component: SunburstChart,
  subcomponents: {
    SunburstSeries,
    SunburstArc,
    SunburstArcLabel
  }
};

const exampleColorScheme = chroma
  .scale(['#2d60e8', '#0037b5'])
  .correctLightness()
  .colors(12);

export const Simple = () => (
  <SunburstChart
    id="simple"
    height={450}
    width={450}
    data={heatmapSimpleData}
  />
);

export const Gradients = ({ colorScheme = exampleColorScheme }: any) => (
  <SunburstChart
    id="gradients"
    height={450}
    width={450}
    data={heatmapSimpleData}
    series={
      <SunburstSeries
        colorScheme={colorScheme}
        arc={<SunburstArc gradient={<Gradient />} />}
      />
    }
  />
);

export const NoAnimation = () => (
  <SunburstChart
    id="no-animation"
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

export const MultiLevel = ({
  data = [
    {
      key: 'Network',
      data: [
        {
          key: 'Traffic',
          data: [
            { key: 'HTTP', data: 100 },
            { key: 'HTTPS', data: 200 }
          ]
        }
      ]
    },
    {
      key: 'FileTransfer',
      data: [
        {
          key: 'Protocol',
          data: [
            { key: 'FTP', data: 50 },
            { key: 'SFTP', data: 70 }
          ]
        }
      ]
    },
    {
      key: 'Database',
      data: [
        {
          key: 'Queries',
          data: [
            { key: 'SELECT', data: 150 },
            { key: 'INSERT', data: 20 }
          ]
        }
      ]
    },
    {
      key: 'Authentication',
      data: [
        {
          key: 'Methods',
          data: [
            { key: 'OAuth', data: 60 },
            { key: 'SAML', data: 25 }
          ]
        }
      ]
    },
    {
      key: 'Storage',
      data: [
        {
          key: 'Types',
          data: [
            { key: 'SSD', data: 300 },
            { key: 'HDD', data: 100 }
          ]
        }
      ]
    }
  ],
  colorScheme = exampleColorScheme
}: any) => (
  <SunburstChart
    id="multi-level"
    height={450}
    width={450}
    data={data}
    series={<SunburstSeries colorScheme={colorScheme} />}
  />
);
