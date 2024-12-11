import React, { FC } from 'react';
import { ChartNestedDataShape } from '@/common/data';
import { BarChartProps, BarChart } from './BarChart';
import {
  STACKED_NORMALIZED_BAR_SERIES_DEFAULT_PROPS,
  StackedNormalizedBarSeries
} from './BarSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS
} from '@/common/Axis/LinearAxis';

export interface StackedNormalizedBarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export const StackedNormalizedBarChart: FC<
  Partial<StackedNormalizedBarChartProps>
> = (props) => (
  <BarChart
    {...props}
    series={
      <StackedNormalizedBarSeries
        {...STACKED_NORMALIZED_BAR_SERIES_DEFAULT_PROPS}
        {...props.series.props}
      />
    }
  />
);

StackedNormalizedBarChart.defaultProps = {
  series: <StackedNormalizedBarSeries />,
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
