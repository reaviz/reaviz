import React, { FC } from 'react';
import { AreaChart, AreaChartProps } from './AreaChart';
import { ChartNestedDataShape } from '@/common/data';
import { StackedNormalizedAreaSeries } from './AreaSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS
} from '@/common/Axis/LinearAxis';

export interface StackedNormalizedAreaChartProps extends AreaChartProps {
  data: ChartNestedDataShape[];
}

export const StackedNormalizedAreaChart: FC<
  Partial<StackedNormalizedAreaChartProps>
> = (props) => (
  <AreaChart
    {...props}
    series={
      <StackedNormalizedAreaSeries
        {...props.series?.props}
        type="stackedNormalized"
      />
    }
    yAxis={
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
    }
  />
);
