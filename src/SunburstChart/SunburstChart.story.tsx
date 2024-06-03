import React from 'react';
import { SunburstChart } from './SunburstChart';
import { heatmapSimpleData } from 'reaviz-data-utils';
import { SunburstSeries } from './SunburstSeries';
import { SunburstArc } from './SunburstArc';
import { SunburstArcLabel } from './SunburstArcLabel';
import { Gradient } from '@/common/Gradient';
import chroma from 'chroma-js';

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
    series={
      <SunburstSeries
        colorScheme={chroma
          .scale(['#7c3aed', '#4f46e5'])
          .correctLightness()
          .colors(12)}
        arc={<SunburstArc gradient={<Gradient />} />}
      />
    }
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
  ]
}) => (
  <SunburstChart
    height={450}
    width={450}
    data={data}
    series={
      <SunburstSeries
        colorScheme={chroma
          .scale(['#2d60e8', '#0037b5'])
          .correctLightness()
          .colors(12)}
      />
    }
  />
);
