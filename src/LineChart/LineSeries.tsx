import type { FC } from 'react';
import React from 'react';

import type { AreaSeriesProps } from '@/AreaChart';
import { AreaSeries, Line } from '@/AreaChart';

export type LineSeriesProps = AreaSeriesProps;

export const LineSeries: FC<Partial<LineSeriesProps>> = (props) => (
  <AreaSeries area={null} line={<Line strokeWidth={3} />} {...props} />
);
