import type { FC, ReactElement } from 'react';
import React from 'react';

import {
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries,
} from '@/common/Axis/LinearAxis';
import type { ChartNestedDataShape } from '@/common/data';

import type { BarChartProps } from './BarChart';
import { BarChart } from './BarChart';
import type { BarSeriesProps } from './BarSeries';
import {
  MARIMEKKO_BAR_SERIES_DEFAULT_PROPS,
  MarimekkoBarSeries,
} from './BarSeries';

export interface MarimekkoChartProps extends BarChartProps {
  data: ChartNestedDataShape[];
  series: ReactElement<BarSeriesProps, typeof MarimekkoBarSeries>;
}

export const MarimekkoChart: FC<Partial<MarimekkoChartProps>> = (props) => (
  <BarChart
    {...MARIMEKKO_CHART_DEFAULT_PROPS}
    {...props}
    series={
      <MarimekkoBarSeries
        {...MARIMEKKO_BAR_SERIES_DEFAULT_PROPS}
        {...props.series.props}
      />
    }
  />
);

const MARIMEKKO_CHART_DEFAULT_PROPS = {
  xAxis: (
    <LinearXAxis
      type="category"
      tickSeries={<LinearXAxisTickSeries tickSize={15} />}
    />
  ),
  yAxis: (
    <LinearYAxis
      type="value"
      tickSeries={
        <LinearYAxisTickSeries
          label={
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              rotation={false}
              format={(data) => `${data * 100}%`}
            />
          }
        />
      }
    />
  ),
};
