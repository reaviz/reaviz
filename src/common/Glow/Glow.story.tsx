import React from 'react';
import { Glow } from './Glow';
import { ScatterPlot, ScatterPoint, ScatterSeries } from '../../ScatterPlot';
import { categoryData, largeSignalChartData } from '../../../demo';
import { Bar, BarChart, BarSeries } from '../../BarChart';
import { Bubble, BubbleChart, BubbleSeries } from '../../BubbleChart';
import { ChartShallowDataShape } from '../data';

export default {
  title: 'Utils/Glow',
  component: Glow
};

export const ScatterGlow = () => (
  <ScatterPlot
    height={400}
    width={750}
    data={largeSignalChartData}
    series={
      <ScatterSeries
        point={
          <ScatterPoint
            glow={<Glow color="#5D25EE" />}
            color="rgba(172, 115, 255, .8)"
            size={v => v.metadata.severity + 5}
          />
        }
      />
    }
  />
);

export const BarGlow = () => (
  <BarChart
    width={400}
    height={350}
    data={categoryData}
    series={
      <BarSeries
        colorScheme="#5D25EE"
        padding={0.1}
        bar={<Bar width={10} glow={<Glow blur={10} color="#5D25EE" />} />}
      />
    }
  />
);

const bubbleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export const BubbleGlow = () => (
  <BubbleChart
    data={bubbleData}
    height={450}
    width={450}
    series={
      <BubbleSeries
        colorScheme="#5D25EE"
        bubble={<Bubble glow={<Glow blur={10} color="#5D25EE" />} />}
      />
    }
  />
);
