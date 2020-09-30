import React, { Component } from 'react';
import { AreaChart, AreaChartProps } from './AreaChart';
import { ChartNestedDataShape } from '../common/data';
import { StackedAreaSeries } from './AreaSeries';

interface StackedAreaChartProps extends AreaChartProps {
  data: ChartNestedDataShape[];
}

export class StackedAreaChart extends Component<StackedAreaChartProps, {}> {
  static defaultProps: Partial<StackedAreaChartProps> = {
    series: <StackedAreaSeries />,
  };

  render() {
    return <AreaChart {...this.props} />;
  }
}
