import React from 'react';
import { categoryData, largeSignalChartData } from 'reaviz-data-utils';

import { BarChart } from '@/BarChart';
import { ScatterPlot } from '@/ScatterPlot';

import {
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries
} from './LinearXAxis';
import {
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries
} from './LinearYAxis';

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
