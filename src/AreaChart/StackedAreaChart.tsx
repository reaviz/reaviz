import React, { FC } from 'react';
import { AreaChart, AreaChartProps } from './AreaChart';
import { ChartNestedDataShape } from '@/common/data';
import { StackedAreaSeries } from './AreaSeries';

export interface StackedAreaChartProps extends AreaChartProps {
  data: ChartNestedDataShape[];
}

export const StackedAreaChart: FC<Partial<StackedAreaChartProps>> = (props) => (
  <AreaChart {...STACKED_AREA_CHART_DEFAULT_PROPS} {...props} />
);

export const STACKED_AREA_CHART_DEFAULT_PROPS = {
  series: <StackedAreaSeries />
};
