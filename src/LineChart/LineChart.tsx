import React, { FC } from 'react';
import { AreaChart, AreaChartProps } from '@/AreaChart';
import { LineSeries } from './LineSeries';

export type LineChartProps = AreaChartProps;

export const LineChart: FC<Partial<LineChartProps>> = (props) => (
  <AreaChart series={<LineSeries />} {...props} />
);
