import React, { Component } from 'react';
import { BarSeriesProps, BarSeries } from './BarSeries';
import { Bar } from './Bar';
import { RangeLines } from './RangeLines';
import { Gradient, GradientStop } from '../../common';

export class StackedBarSeries extends Component<BarSeriesProps> {
  static defaultProps: Partial<BarSeriesProps> = {
    ...BarSeries.defaultProps,
    type: 'stacked',
    bar: (
      <Bar
        rounded={false}
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

  render() {
    const { type, ...rest } = this.props;
    return <BarSeries type={type} {...rest} />;
  }
}
