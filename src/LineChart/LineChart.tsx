import type { FC } from 'react';
import React from 'react';

import type { AreaChartProps } from '@/AreaChart';
import { AreaChart } from '@/AreaChart';

import { LineSeries } from './LineSeries';

export type LineChartProps = AreaChartProps;

export const LineChart: FC<Partial<LineChartProps>> = (props) => (
  <AreaChart series={<LineSeries />} {...props} />
);
