import React, { FC } from 'react';
import { AreaSeries, Line, AreaSeriesProps } from '../AreaChart';

export type LineSeriesProps = AreaSeriesProps;

export const LineSeries: FC<Partial<LineSeriesProps>> = (props) => (
  <AreaSeries {...props} />
);

LineSeries.defaultProps = {
  ...AreaSeries.defaultProps,
  area: null,
  line: <Line strokeWidth={3} />
};
