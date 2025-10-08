import React, { FC } from 'react';
import { offset } from '@floating-ui/dom';
import {
  BarSeriesProps,
  BarSeries,
  BAR_SERIES_DEFAULT_PROPS
} from './BarSeries';
import { Bar, BAR_DEFAULT_PROPS, BarType } from './Bar';
import { RangeLines } from './RangeLines';
import { ChartTooltip, TooltipTemplate, TooltipArea } from '@/common/Tooltip';
import { formatValue } from '@/common/utils/formatting';
import { Gradient, GradientStop } from '@/common/Gradient';

export const MarimekkoBarSeries: FC<Partial<BarSeriesProps>> = (props) => (
  <BarSeries {...MARIMEKKO_BAR_SERIES_DEFAULT_PROPS} {...props} />
);

export const MARIMEKKO_BAR_SERIES_DEFAULT_PROPS: Partial<BarSeriesProps> = {
  ...BAR_SERIES_DEFAULT_PROPS,
  type: 'marimekko' as BarType,
  padding: 10,
  tooltip: (
    <TooltipArea
      tooltip={
        <ChartTooltip
          followCursor={true}
          modifiers={[offset(5)]}
          content={(point, color) => {
            const data = {
              ...point,
              data: point.data.map((d) => ({
                ...d,
                value: `${formatValue(d.value)} ∙ ${formatValue(
                  Math.floor((d.y1 - d.y0) * 100)
                )}%`
              }))
            };

            return <TooltipTemplate value={data} color={color} />;
          }}
        />
      }
    />
  ),
  bar: (
    <Bar
      {...BAR_DEFAULT_PROPS}
      padding={10}
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
