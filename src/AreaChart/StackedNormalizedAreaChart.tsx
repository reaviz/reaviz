import React, { FC } from 'react';
import { AreaChart, AreaChartProps } from './AreaChart';
import { ChartNestedDataShape } from '../common/data';
import { StackedNormalizedAreaSeries } from './AreaSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '../common/Axis/LinearAxis';

export interface StackedNormalizedAreaChartProps extends AreaChartProps {
  data: ChartNestedDataShape[];
}

export const StackedNormalizedAreaChart: FC<
  Partial<StackedNormalizedAreaChartProps>
> = (props) => <AreaChart {...props} />;

StackedNormalizedAreaChart.defaultProps = {
  series: <StackedNormalizedAreaSeries />,
  yAxis: (
    <LinearYAxis
      type="value"
      tickSeries={
        <LinearYAxisTickSeries
          label={
            <LinearYAxisTickLabel
              rotation={false}
              format={(data) => `${data * 100}%`}
            />
          }
        />
      }
    />
  )
};
