import chroma from 'chroma-js';
import { multiDateData, longMultiDateData } from 'reaviz-data-utils';
import { LineChart } from './LineChart';
import {
  StackedAreaChart,
  StackedNormalizedAreaChart,
  StackedAreaSeries,
  Line,
  StackedNormalizedAreaSeries,
  PointSeries
} from '@/AreaChart';
import {
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxisTickSeries,
  LinearYAxis,
  LinearAxisLine,
  LinearXAxisTickLine,
  LinearXAxisTickLabel,
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearYAxisTickLine,
  LinearYAxisTickLabel,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS
} from '@/common/Axis/LinearAxis';
import { LineSeries } from './LineSeries';
import { ScatterPoint } from '../ScatterPlot';

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
    StackedNormalizedAreaSeries
  }
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const LargeData = () => (
  <LineChart
    id="large-data"
    width={400}
    height={300}
    data={prettyData}
    yAxis={
      <LinearYAxis scaled={true} type="value">
        <LinearYAxisTickSeries />
      </LinearYAxis>
    }
    xAxis={
      <LinearXAxis type="value" scaled={true}>
        <LinearXAxisTickSeries />
      </LinearXAxis>
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
                  strokeDasharray: '5'
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel
            {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
            rotation={false}
            format={(data) => `${data * 100}%`}
          />
        </LinearYAxisTickSeries>
      </LinearYAxis>
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
        data: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50)
      });
    }
    data.push({ key: i, data: series });
  }
  return data;
})();
