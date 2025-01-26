import React, { FC } from 'react';
import { BarChart, BarChartProps } from './BarChart';
import { ChartNestedDataShape } from '@/common/data';
import {
  STACKED_BAR_SERIES_DEFAULT_PROPS,
  StackedBarSeries
} from './BarSeries';

export interface StackedBarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export const StackedBarChart: FC<Partial<StackedBarChartProps>> = (props) => (
  <BarChart
    {...props}
    series={
      <StackedBarSeries
        {...STACKED_BAR_SERIES_DEFAULT_PROPS}
        {...props.series.props}
      />
    }
  >
    {props.children}
  </BarChart>
);
