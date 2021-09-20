import React from 'react';
import { largeSignalChartData, categoryData } from '../../../../demo';
import { ScatterPlot } from '../../../ScatterPlot';
import { BarChart } from '../../../BarChart';
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
