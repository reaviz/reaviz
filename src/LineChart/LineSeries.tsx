import React, { FC } from 'react';
import {
  AreaSeries,
  Line,
  AreaSeriesProps,
  AREA_SERIES_DEFAULT_PROPS
} from '@/AreaChart';

export type LineSeriesProps = AreaSeriesProps;

export const LineSeries: FC<Partial<LineSeriesProps>> = (props) => (
  <AreaSeries {...props} />
);

LineSeries.defaultProps = {
  ...AREA_SERIES_DEFAULT_PROPS,
  area: null,
  line: <Line strokeWidth={3} />
} as Partial<LineSeriesProps>;
