import React, { FC } from 'react';
import { ChartNestedDataShape } from '../common/data';
import {
  RadialAreaChart,
  RadialAreaChartProps,
  RadialAreaSeries,
  RadialAreaSeriesProps,
  RadialPointSeries
} from '../RadialAreaChart';
import {
  RadialAxis,
  RadialAxisArcLine,
  RadialAxisArcSeries
} from '../common/Axis/RadialAxis';

export interface RadarChartSeriesProps extends RadialAreaSeriesProps {}

export const RadarChartSeries: FC<Partial<RadarChartSeriesProps>> = (props) => (
  <RadialAreaSeries {...props} />
);

RadarChartSeries.defaultProps = {
  area: null,
  type: 'grouped',
  symbols: <RadialPointSeries show />
};
