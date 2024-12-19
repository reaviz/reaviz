import React, { FC } from 'react';
import {
  BarSeriesProps,
  BarSeries,
  BAR_SERIES_DEFAULT_PROPS
} from './BarSeries';
import { Bar, BAR_DEFAULT_PROPS, BarType } from './Bar';
import { RangeLines } from './RangeLines';
import { Gradient, GradientStop } from '@/common';

export const StackedBarSeries: FC<Partial<BarSeriesProps>> = (props) => (
  <BarSeries {...STACKED_BAR_SERIES_DEFAULT_PROPS} {...props} />
);

export const STACKED_BAR_SERIES_DEFAULT_PROPS = {
  ...BAR_SERIES_DEFAULT_PROPS,
  type: 'stacked' as BarType,
  bar: (
    <Bar
      {...BAR_DEFAULT_PROPS}
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
