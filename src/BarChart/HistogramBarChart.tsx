import React, { FC } from 'react';
import { ChartShallowDataShape } from '../common/data';
import { BarChartProps, BarChart } from './BarChart';
import { HistogramBarSeries } from './BarSeries';

interface HistogramBarChartProps extends BarChartProps {
  data: ChartShallowDataShape[];
}

export const HistogramBarChart: FC<Partial<HistogramBarChartProps>> = ({
  series = <HistogramBarSeries />,
  ...rest
}) => <BarChart {...rest} series={series} />;
