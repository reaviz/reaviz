import type { FC } from 'react';
import React from 'react';

import type { ChartNestedDataShape } from '@/common/data';

import type { AreaChartProps } from './AreaChart';
import { AreaChart } from './AreaChart';
import { StackedAreaSeries } from './AreaSeries';

export interface StackedAreaChartProps extends AreaChartProps {
  data: ChartNestedDataShape[];
}

export const StackedAreaChart: FC<Partial<StackedAreaChartProps>> = (props) => (
  <AreaChart
    {...props}
    series={<StackedAreaSeries {...props.series?.props} type="stacked" />}
  />
);
