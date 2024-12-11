import React, { FC } from 'react';
import { ChartShallowDataShape } from '@/common/data';
import { BarChartProps, BarChart } from './BarChart';
import {
  HISTOGRAM_BAR_SERIES_DEFAULT_PROPS,
  HistogramBarSeries,
  MARIMEKKO_BAR_SERIES_DEFAULT_PROPS,
  MarimekkoBarSeries
} from './BarSeries';

export interface HistogramBarChartProps extends BarChartProps {
  data: ChartShallowDataShape[];
}

export const HistogramBarChart: FC<Partial<HistogramBarChartProps>> = (
  props
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

HistogramBarChart.defaultProps = {
  series: <HistogramBarSeries />
};
