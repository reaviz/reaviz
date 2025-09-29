import type { FC } from 'react';
import React from 'react';

import {
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries
} from '@/common/Axis/LinearAxis';
import type { ChartNestedDataShape } from '@/common/data';

import type { AreaChartProps } from './AreaChart';
import { AreaChart } from './AreaChart';
import { StackedNormalizedAreaSeries } from './AreaSeries';

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
        {...props.yAxis?.props}
      />
    }
  />
);
