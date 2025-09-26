import type { FC } from 'react';
import React from 'react';

import { Gradient, GradientStop } from '@/common';

import type { BarType } from './Bar';
import { Bar, BAR_DEFAULT_PROPS } from './Bar';
import type { BarSeriesProps } from './BarSeries';
import { BAR_SERIES_DEFAULT_PROPS, BarSeries } from './BarSeries';
import { RangeLines } from './RangeLines';

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
            <GradientStop offset="90%" stopOpacity={0.7} key="stop" />,
          ]}
        />
      }
      rangeLines={<RangeLines position="top" strokeWidth={3} />}
    />
  ),
};
