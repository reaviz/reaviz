import type { FC } from 'react';
import React from 'react';

import type { BarChartProps } from '@/BarChart';
import { BarChart } from '@/BarChart';
import { BarSeries } from '@/BarChart';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
} from '@/common/Axis';
import { schemes } from '@/common/color';
import type { ChartShallowDataShape } from '@/common/data';

export interface BarSparklineChartProps extends BarChartProps {
  data: ChartShallowDataShape[];
}

export const BarSparklineChart: FC<Partial<BarSparklineChartProps>> = (
  props,
) => (
  <BarChart
    gridlines={null}
    series={<BarSeries colorScheme={schemes.cybertron[0]} />}
    yAxis={
      <LinearYAxis
        type="value"
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
    xAxis={
      <LinearXAxis
        type="category"
        axisLine={null}
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    }
    {...props}
  />
);
