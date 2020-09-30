import React, { Component } from 'react';
import { AreaChart, AreaChartProps } from './AreaChart';
import { ChartNestedDataShape } from '../common/data';
import { StackedNormalizedAreaSeries } from './AreaSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
} from '../common/Axis/LinearAxis';

interface StackedNormalizedAreaChartProps extends AreaChartProps {
  data: ChartNestedDataShape[];
}

export class StackedNormalizedAreaChart extends Component<
  StackedNormalizedAreaChartProps,
  {}
> {
  static defaultProps: Partial<StackedNormalizedAreaChartProps> = {
    series: <StackedNormalizedAreaSeries />,
    yAxis: (
      <LinearYAxis
        type="value"
        tickSeries={
          <LinearYAxisTickSeries
            label={
              <LinearYAxisTickLabel
                rotation={false}
                format={(data) => `${data * 100}%`}
              />
            }
          />
        }
      />
    ),
  };

  render() {
    return <AreaChart {...this.props} />;
  }
}
