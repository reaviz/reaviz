import chroma from 'chroma-js';
import { longMultiDateData, multiDateData } from 'reaviz-data-utils';

import {
  Line,
  PointSeries,
  StackedAreaChart,
  StackedAreaSeries,
  StackedNormalizedAreaChart,
  StackedNormalizedAreaSeries,
} from '@/AreaChart';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
} from '@/common/Axis/LinearAxis';

import { ScatterPoint } from '../ScatterPlot';
import { LineChart } from './LineChart';
import { LineSeries } from './LineSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Line Chart/Multi Series',
  component: LineChart,
  subcomponents: {
    LineSeries,
    Line,
    StackedAreaChart,
    StackedNormalizedAreaChart,
    StackedAreaSeries,
    StackedNormalizedAreaSeries,
  },
};

export const _Simple = () => (
  <LineChart
    id="simple"
    width={550}
    height={250}
    series={
      <LineSeries
        type="grouped"
        line={<Line strokeWidth={4} />}
        colorScheme="cybertron"
      />
    }
    data={multiDateData}
  />
);

export const Clicked = () => (
  <LineChart
    id="clicked"
    width={550}
    height={250}
    series={
      <LineSeries
        type="grouped"
        line={<Line strokeWidth={4} />}
        colorScheme="cybertron"
        symbols={
          <PointSeries
            point={
              <ScatterPoint
                visible={(data, index) => true}
                onClick={(data) => {
                  console.log('Clicked node:' + JSON.stringify(data));
                }}
              />
            }
          />
        }
      />
    }
    data={multiDateData}
  />
);

export const LargeData = () => (
  <LineChart
    id="large-data"
    width={400}
    height={300}
    data={prettyData}
    yAxis={
      <LinearYAxis
        scaled={true}
        type="value"
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
    xAxis={
      <LinearXAxis
        type="value"
        scaled={true}
        axisLine={null}
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    }
    series={
      <LineSeries
        type="grouped"
        line={<Line strokeWidth={1} />}
        colorScheme="cybertron"
      />
    }
  />
);
LargeData.tags = ['skip-snapshot'];

export const CustomLineStyles = () => (
  <LineChart
    id="custom-line-styles"
    width={550}
    height={350}
    series={
      <LineSeries
        type="grouped"
        line={
          <Line
            strokeWidth={3}
            style={(data) => {
              if (
                data &&
                data.length &&
                data[0] &&
                data[0].key === 'Threat Intel'
              ) {
                console.log('Style callback...', data);
                return {
                  strokeDasharray: '5',
                };
              }
            }}
          />
        }
        colorScheme={chroma
          .scale(['27efb5', '00bfff'])
          .colors(multiDateData.length)}
      />
    }
    data={multiDateData}
  />
);

export const _LargeDataset = () => (
  <LineChart
    id="large-dataset"
    width={550}
    height={350}
    series={
      <LineSeries
        type="grouped"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(longMultiDateData.length)}
      />
    }
    data={longMultiDateData}
  />
);
_LargeDataset.tags = ['skip-snapshot'];

export const Stacked = () => (
  <StackedAreaChart
    id="stacked"
    width={550}
    height={250}
    series={
      <StackedAreaSeries
        colorScheme="cybertron"
        area={null}
        line={<Line strokeWidth={4} />}
      />
    }
    data={multiDateData}
  />
);

export const StackedNormalized = () => (
  <StackedNormalizedAreaChart
    id="stacked-normalized"
    width={550}
    height={250}
    data={multiDateData}
    series={
      <StackedNormalizedAreaSeries
        colorScheme="cybertron"
        area={null}
        line={<Line strokeWidth={4} />}
      />
    }
  />
);

const prettyData = (() => {
  const data: any[] = [];
  for (let i = 0; i < 20; i++) {
    const series: any[] = [];
    for (let j = 0; j < 100; j++) {
      series.push({
        key: j,
        data: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50),
      });
    }
    data.push({ key: i, data: series });
  }
  return data;
})();
