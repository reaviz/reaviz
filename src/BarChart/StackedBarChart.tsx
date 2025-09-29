import type { FC } from 'react';
import React from 'react';

import type { ChartNestedDataShape } from '@/common/data';

import type { BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
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
  />
);
