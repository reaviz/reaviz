import React, { FC } from 'react';
import { ChartShallowDataShape } from '../common/data';
import { BarChartProps, BarChart } from './BarChart';
import { HistogramBarSeries } from './BarSeries';

export interface HistogramBarChartProps extends BarChartProps {
  data: ChartShallowDataShape[];
}

export const HistogramBarChart: FC<Partial<HistogramBarChartProps>> = (
  props
) => <BarChart {...props} />;

HistogramBarChart.defaultProps = {
  series: <HistogramBarSeries />
};
