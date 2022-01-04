import React, { FC } from 'react';
import { BarSeriesProps, BarSeries } from './BarSeries';
import { Bar } from './Bar';
import { RangeLines } from './RangeLines';
import { Gradient, GradientStop } from '../../common';

export const StackedBarSeries: FC<Partial<BarSeriesProps>> = (props) => (
  <BarSeries type="stackedNormalized" {...props} />
);

StackedBarSeries.defaultProps = {
  ...BarSeries.defaultProps,
  type: 'stacked',
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
