import React, { Component, FC } from 'react';
import {
  AreaChart,
  AreaChartProps,
  AreaSeries,
  Area,
  Line
} from '../AreaChart';
import { ChartShallowDataShape } from '../common/data';
import { PointSeries } from '../AreaChart';
import {
  LinearYAxisTickSeries,
  LinearYAxis,
  LinearXAxis,
  LinearXAxisTickSeries
} from '../common/Axis/LinearAxis';
import { GradientStop, Gradient } from '../common/Gradient';
import { Stripes } from '../common/Mask';

export interface AreaSparklineChartProps extends AreaChartProps {
  data: ChartShallowDataShape[];
}

export const AreaSparklineChart: FC<Partial<AreaSparklineChartProps>> = (props) => <AreaChart {...props} />;

AreaSparklineChart.defaultProps = {
  gridlines: null,
  series: (
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
                <GradientStop offset="80%" stopOpacity={1} key="stop" />
              ]}
            />
          }
        />
      }
      line={<Line strokeWidth={3} />}
    />
  ),
  yAxis: (
    <LinearYAxis
      type="value"
      scaled={true}
      axisLine={null}
      tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
    />
  ),
  xAxis: (
    <LinearXAxis
      type="time"
      scaled={true}
      axisLine={null}
      tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
    />
  )
};
