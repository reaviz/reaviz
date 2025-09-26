import type { FC } from 'react';
import React from 'react';

import type { ChartShallowDataShape } from '@/common/data';

import type { BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
import {
  HISTOGRAM_BAR_SERIES_DEFAULT_PROPS,
  HistogramBarSeries,
} from './BarSeries';

export interface HistogramBarChartProps extends BarChartProps {
  data: ChartShallowDataShape[];
}

export const HistogramBarChart: FC<Partial<HistogramBarChartProps>> = (
  props,
) => (
  <BarChart
    {...props}
    series={
      <HistogramBarSeries
        {...HISTOGRAM_BAR_SERIES_DEFAULT_PROPS}
        {...props.series.props}
      />
    }
  />
);
