import React, { FC } from 'react';
import {
  RadialAreaSeries,
  RadialAreaSeriesProps,
  RadialPointSeries,
  RadialPointSeriesType
} from '@/RadialAreaChart';

export interface RadarChartSeriesProps extends RadialAreaSeriesProps {}

export const RadarChartSeries: FC<Partial<RadarChartSeriesProps>> = (props) => (
  <RadialAreaSeries {...RADAR_CHART_SERIES_DEFAULT_PROPS} {...props} />
);

export const RADAR_CHART_SERIES_DEFAULT_PROPS = {
  area: null,
  type: 'grouped' as RadialPointSeriesType,
  symbols: <RadialPointSeries show />
};
