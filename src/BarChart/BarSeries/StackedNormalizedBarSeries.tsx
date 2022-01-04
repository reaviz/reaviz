import React, { Component, FC } from 'react';
import { BarSeriesProps, BarSeries } from './BarSeries';
import { Bar } from './Bar';
import { RangeLines } from './RangeLines';
import {
  ChartTooltip,
  TooltipTemplate,
  TooltipArea
} from '../../common/Tooltip';
import { formatValue } from '../../common/utils/formatting';
import { Gradient, GradientStop } from '../../common/Gradient';

export const StackedNormalizedBarSeries: FC<Partial<BarSeriesProps>> = (
  props
) => <BarSeries type="stackedNormalized" {...props} />;

StackedNormalizedBarSeries.defaultProps = {
  ...BarSeries.defaultProps,
  type: 'stackedNormalized',
  tooltip: (
    <TooltipArea
      tooltip={
        <ChartTooltip
          followCursor={true}
          modifiers={{
            offset: '5px, 5px'
          }}
          content={(point, color) => {
            point.data = point.data.map((d) => {
              // Handle horz case
              const start = isNaN(d.y0) ? d.x0 : d.y0;
              const end = isNaN(d.y1) ? d.x1 : d.y1;

              return {
                ...d,
                value: `${formatValue(Math.floor((end - start) * 100))}%`
              };
            });

            return <TooltipTemplate value={point} color={color} />;
          }}
        />
      }
    />
  ),
  bar: (
    <Bar
      gradient={
        <Gradient
          stops={[
            <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
            <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
          ]}
        />
      }
      rangeLines={<RangeLines position="top" strokeWidth={3} />}
    />
  )
};
