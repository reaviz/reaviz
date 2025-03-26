import React, { FC } from 'react';
import { BarChart, BarChartProps } from '@/BarChart';
import { ChartShallowDataShape } from '@/common/data';
import {
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickSeries
} from '@/common/Axis';
import { BarSeries } from '@/BarChart';
import { schemes } from '@/common/color';

export interface BarSparklineChartProps extends BarChartProps {
  data: ChartShallowDataShape[];
}

export const BarSparklineChart: FC<Partial<BarSparklineChartProps>> = (
  props
) => (
  <BarChart
    gridlines={null}
    series={<BarSeries colorScheme={schemes.cybertron[0]} />}
    yAxis={
      <LinearYAxis
        type="value"
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
    xAxis={
      <LinearXAxis
        type="category"
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    }
    {...props}
  />
);
