import type { FC } from 'react';
import React from 'react';

import type {
  RadialAreaSeriesProps,
  RadialPointSeriesType,
} from '@/RadialAreaChart';
import { RadialAreaSeries, RadialPointSeries } from '@/RadialAreaChart';

export type RadarChartSeriesProps = RadialAreaSeriesProps;

export const RadarChartSeries: FC<Partial<RadarChartSeriesProps>> = (props) => (
  <RadialAreaSeries {...RADAR_CHART_SERIES_DEFAULT_PROPS} {...props} />
);

export const RADAR_CHART_SERIES_DEFAULT_PROPS = {
  area: null,
  type: 'grouped' as RadialPointSeriesType,
  symbols: <RadialPointSeries show />,
};
