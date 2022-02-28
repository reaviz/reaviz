import React, { FC } from 'react';
import { AreaChart, AreaChartProps } from './AreaChart';
import { ChartNestedDataShape } from '../common/data';
import { StackedAreaSeries } from './AreaSeries';

export interface StackedAreaChartProps extends AreaChartProps {
  data: ChartNestedDataShape[];
}

export const StackedAreaChart: FC<Partial<StackedAreaChartProps>> = (props) => (
  <AreaChart {...props} />
);

StackedAreaChart.defaultProps = {
  series: <StackedAreaSeries />
};
