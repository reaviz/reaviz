import { offset } from '@floating-ui/dom';
import type { FC } from 'react';
import React from 'react';

import type { BarChartProps } from '@/BarChart';
import {
  Bar,
  BAR_DEFAULT_PROPS,
  StackedBarChart,
  StackedBarSeries,
} from '@/BarChart';
import type { ChartNestedDataShape } from '@/common';
import {
  ChartTooltip,
  formatValue,
  Gradient,
  GradientStop,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  TooltipArea,
  TooltipTemplate,
} from '@/common';

export interface SonarChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
}

export const SonarChart: FC<Partial<SonarChartProps>> = (props) => (
  <StackedBarChart
    {...props}
    margins={0}
    gridlines={null}
    series={
      <StackedBarSeries
        type="stackedDiverging"
        colorScheme="rgb(17, 207, 247)"
        tooltip={
          <TooltipArea
            tooltip={
              <ChartTooltip
                followCursor={true}
                modifiers={[offset(5)]}
                content={(data, color) => (
                  <TooltipTemplate
                    color={color}
                    value={{
                      x: formatValue(data.x),
                      y: `${formatValue(Math.abs(data.data[0].y))}`,
                    }}
                  />
                )}
              />
            }
          />
        }
        bar={[
          <Bar
            {...BAR_DEFAULT_PROPS}
            key="first"
            width={1}
            rangeLines={null}
            minHeight={1}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={0.7} key="start" />,
                  <GradientStop offset="90%" stopOpacity={1} key="stop" />,
                ]}
              />
            }
          />,
          <Bar
            key="second"
            width={1}
            rangeLines={null}
            minHeight={1}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={1} key="stop" />,
                  <GradientStop offset="90%" stopOpacity={0.7} key="start" />,
                ]}
              />
            }
          />,
        ]}
      />
    }
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
  />
);
