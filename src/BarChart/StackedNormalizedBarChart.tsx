import type { FC } from 'react';
import React from 'react';

import {
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries
} from '@/common/Axis/LinearAxis';
import type { ChartNestedDataShape } from '@/common/data';

import type { BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
import {
  STACKED_NORMALIZED_BAR_SERIES_DEFAULT_PROPS,
  StackedNormalizedBarSeries
} from './BarSeries';

export interface StackedNormalizedBarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export const StackedNormalizedBarChart: FC<
  Partial<StackedNormalizedBarChartProps>
> = (props) => (
  <BarChart
    {...STACKED_NORMALIZED_BAR_CHART_DEFAULT_PROPS}
    {...props}
    series={
      <StackedNormalizedBarSeries
        {...STACKED_NORMALIZED_BAR_SERIES_DEFAULT_PROPS}
        {...props.series.props}
      />
    }
  />
);

const STACKED_NORMALIZED_BAR_CHART_DEFAULT_PROPS = {
  yAxis: (
    <LinearYAxis
      type="value"
      tickSeries={
        <LinearYAxisTickSeries
          label={
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              rotation={false}
              format={(data) => `${data * 100}%`}
            />
          }
        />
      }
    />
  )
};
