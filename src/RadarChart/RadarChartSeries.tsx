import React, { FC } from 'react';
import {
  RadialAreaChart,
  RadialAreaChartProps,
  RadialAreaSeries,
  RadialAreaSeriesProps,
  RadialPointSeries
} from '@/RadialAreaChart';

export interface RadarChartSeriesProps extends RadialAreaSeriesProps {}

export const RadarChartSeries: FC<Partial<RadarChartSeriesProps>> = (props) => (
  <RadialAreaSeries {...props} />
);

RadarChartSeries.defaultProps = {
  area: null,
  type: 'grouped',
  symbols: <RadialPointSeries show />
};
