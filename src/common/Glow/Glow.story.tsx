import { ScatterPlot, ScatterPoint, ScatterSeries } from '@/ScatterPlot';
import {
  categoryData,
  largeSignalChartData,
  singleDateData
} from '../../../demo';
import { Bar, BarChart, BarSeries } from '@/BarChart';
import { Bubble, BubbleChart, BubbleSeries } from '@/BubbleChart';
import { Area, AreaChart, AreaSeries, Line } from '@/AreaChart';
import { LineChart, LineSeries } from '@/LineChart';
import { ChartShallowDataShape } from '@/common/data';

export default {
  title: 'Utils/Glow'
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
            glow={{ color: '#5D25EE' }}
            color="rgba(172, 115, 255, .8)"
            size={(v) => v.metadata.severity + 5}
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
        bar={<Bar width={10} glow={{ color: '#5D25EE', blur: 10 }} />}
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
        bubble={<Bubble glow={{ color: '#5D25EE', blur: 10 }} />}
      />
    }
  />
);

export const AreaGlow = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        colorScheme="#5D25EE"
        area={<Area glow={{ color: '#5D25EE', blur: 20 }} />}
      />
    }
  />
);

export const LineGlow = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <LineSeries
        colorScheme="#5D25EE"
        line={<Line glow={{ color: '#5D25EE', blur: 10 }} />}
      />
    }
  />
);
