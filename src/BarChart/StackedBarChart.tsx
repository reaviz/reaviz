import React, { FC } from 'react';
import { BarChart, BarChartProps } from './BarChart';
import { ChartNestedDataShape } from '../common/data';
import { StackedBarSeries } from './BarSeries';

interface StackedBarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export const StackedBarChart: FC<Partial<StackedBarChartProps>> = (props) => (
  <BarChart {...props} />
);

StackedBarChart.defaultProps = {
  series: <StackedBarSeries />
};
