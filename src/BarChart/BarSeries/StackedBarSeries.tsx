import React, { FC } from 'react';
import {
  BarSeriesProps,
  BarSeries,
  BAR_SERIES_DEFAULT_PROPS
} from './BarSeries';
import { Bar, BAR_DEFAULT_PROPS } from './Bar';
import { RangeLines } from './RangeLines';
import { Gradient, GRADIENT_DEFAULT_PROPS, GradientStop } from '@/common';

export const StackedBarSeries: FC<Partial<BarSeriesProps>> = (props) => (
  <BarSeries type="stackedNormalized" {...props} />
);

StackedBarSeries.defaultProps = {
  ...BAR_SERIES_DEFAULT_PROPS,
  type: 'stacked',
  bar: (
    <Bar
      {...BAR_DEFAULT_PROPS}
      gradient={
        <Gradient
          {...GRADIENT_DEFAULT_PROPS}
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
