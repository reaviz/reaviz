import type { FC } from 'react';
import React from 'react';

import {
  RadialAxis,
  RadialAxisArcLine,
  RadialAxisArcSeries
} from '@/common/Axis/RadialAxis';
import type { ChartNestedDataShape } from '@/common/data';
import type { RadialAreaChartProps } from '@/RadialAreaChart';
import { RadialAreaChart } from '@/RadialAreaChart';

import {
  RADAR_CHART_SERIES_DEFAULT_PROPS,
  RadarChartSeries
} from './RadarChartSeries';

export interface RadarChartProps extends RadialAreaChartProps {
  data: ChartNestedDataShape[];
}

export const RadarChart: FC<Partial<RadarChartProps>> = (props) => (
  <RadialAreaChart
    {...props}
    series={
      <RadarChartSeries
        {...RADAR_CHART_SERIES_DEFAULT_PROPS}
        {...props?.series?.props}
      />
    }
    axis={
      <RadialAxis
        type="category"
        arcs={
          <RadialAxisArcSeries
            count={5}
            arc={null}
            line={<RadialAxisArcLine />}
          />
        }
      />
    }
  />
);
