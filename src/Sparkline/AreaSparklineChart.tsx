import type { FC } from 'react';
import React from 'react';

import type { AreaChartProps } from '@/AreaChart';
import { Area, AreaChart, AreaSeries, Line } from '@/AreaChart';
import { PointSeries } from '@/AreaChart';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
} from '@/common/Axis/LinearAxis';
import type { ChartShallowDataShape } from '@/common/data';
import { Gradient, GradientStop } from '@/common/Gradient';
import { Stripes } from '@/common/Mask';

export interface AreaSparklineChartProps extends AreaChartProps {
  data: ChartShallowDataShape[];
}

export const AreaSparklineChart: FC<Partial<AreaSparklineChartProps>> = (
  props,
) => (
  <AreaChart
    gridlines={null}
    series={
      <AreaSeries
        symbols={<PointSeries show="hover" />}
        interpolation="smooth"
        markLine={null}
        area={
          <Area
            mask={<Stripes />}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="10%" stopOpacity={0} key="start" />,
                  <GradientStop offset="80%" stopOpacity={1} key="stop" />,
                ]}
              />
            }
          />
        }
        line={<Line strokeWidth={3} />}
      />
    }
    yAxis={
      <LinearYAxis
        type="value"
        scaled={true}
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
