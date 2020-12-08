import React, { FC } from 'react';
import { BarChart, BarChartProps } from './BarChart';
import { ChartNestedDataShape } from '../common/data';
import { MarimekkoBarSeries } from './BarSeries';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '../common/Axis/LinearAxis';

interface MarimekkoChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export const MarimekkoChart: FC<Partial<MarimekkoChartProps>> = ({
  series = <MarimekkoBarSeries />,
  xAxis = (
    <LinearXAxis
      type="category"
      tickSeries={<LinearXAxisTickSeries tickSize={15} />}
    />
  ),
  yAxis = (
    <LinearYAxis
      type="value"
      tickSeries={
        <LinearYAxisTickSeries
          label={
            <LinearYAxisTickLabel
              rotation={false}
              format={(data) => `${data * 100}%`}
            />
          }
        />
      }
    />
  ),
  data,
  brush,
  gridlines
}) => (
  <BarChart
    series={series}
    data={data}
    yAxis={yAxis}
    xAxis={xAxis}
    brush={brush}
    gridlines={gridlines}
  />
);
