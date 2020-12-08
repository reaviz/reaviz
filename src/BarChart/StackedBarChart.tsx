import React, { FC } from 'react';
import { BarChart, BarChartProps } from './BarChart';
import { ChartNestedDataShape } from '../common/data';
import { StackedBarSeries } from './BarSeries';

interface StackedBarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export const StackedBarChart: FC<Partial<StackedBarChartProps>> = ({
  series = <StackedBarSeries />,
  data,
  yAxis,
  xAxis,
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
