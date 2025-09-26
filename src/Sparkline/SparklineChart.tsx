import type { FC } from 'react';
import React from 'react';

import { AreaSeries, Line } from '@/AreaChart';
import { PointSeries } from '@/AreaChart';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
} from '@/common/Axis/LinearAxis';
import type { ChartShallowDataShape } from '@/common/data';
import type { LineChartProps } from '@/LineChart';
import { LineChart } from '@/LineChart';

export interface SparklineChartProps extends LineChartProps {
  data: ChartShallowDataShape[];
}

export const SparklineChart: FC<Partial<SparklineChartProps>> = (props) => (
  <LineChart
    gridlines={null}
    series={
      <AreaSeries
        symbols={<PointSeries show="hover" />}
        interpolation="smooth"
        markLine={null}
        area={null}
        line={<Line strokeWidth={2} />}
      />
    }
    yAxis={
      <LinearYAxis
        scaled={true}
        type="value"
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
    xAxis={
      <LinearXAxis
        type="time"
        scaled={true}
        axisLine={null}
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    }
    {...props}
  />
);
