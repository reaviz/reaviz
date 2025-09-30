import React from 'react';
import { largeSignalChartData, categoryData } from 'reaviz-data-utils';
import { ScatterPlot } from '@/ScatterPlot';
import { Bar, BarChart, BarSeries } from '@/BarChart';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLine,
  LinearYAxisTickLabel
} from './LinearYAxis';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLine,
  LinearXAxisTickLabel
} from './LinearXAxis';

export default {
  title: 'Utils/Axis/Linear'
};

export const CenterAxes = () => {
  const data = [...largeSignalChartData].splice(0, 50);
  return (
    <ScatterPlot
      height={400}
      width={400}
      data={data}
      gridlines={null}
      yAxis={
        <LinearYAxis
          type="value"
          position="center"
          tickSeries={
            <LinearYAxisTickSeries
              line={<LinearYAxisTickLine position="center" />}
              label={<LinearYAxisTickLabel padding={3} />}
            />
          }
        />
      }
      xAxis={
        <LinearXAxis
          type="category"
          position="center"
          tickSeries={
            <LinearXAxisTickSeries
              line={<LinearXAxisTickLine position="center" />}
              label={<LinearXAxisTickLabel padding={3} />}
            />
          }
        />
      }
    />
  );
};

export const CustomLabelRotation = () => (
  <BarChart
    width={350}
    height={350}
    data={categoryData}
    xAxis={
      <LinearXAxis
        position="end"
        type="category"
        tickSeries={
          <LinearXAxisTickSeries
            label={<LinearXAxisTickLabel rotation={-90} />}
          />
        }
      />
    }
  />
);

const data = categoryData.map((x) => ({
  ...x,
  key_url: `https://example.com/${x?.key}`
}));

export const OnclickLabels = () => (
  <BarChart
    width={500}
    height={350}
    data={data}
    xAxis={<LinearXAxis type="value" />}
    yAxis={
      <LinearYAxis
        type="category"
        tickSeries={
          <LinearYAxisTickSeries
            tickSize={20}
            onClick={(e, t) => {
              const { key_url } = data.find((datum) => datum.key === t.tick);
              if (key_url) {
                window.open(key_url);
              }
            }}
          />
        }
      />
    }
    series={
      <BarSeries
        colorScheme={'cybertron'}
        layout="horizontal"
        padding={0.1}
        bar={<Bar guide={null} />}
      />
    }
  />
);
