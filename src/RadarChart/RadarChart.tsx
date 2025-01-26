import React, { FC } from 'react';
import { ChartNestedDataShape } from '@/common/data';
import { RadialAreaChart, RadialAreaChartProps } from '@/RadialAreaChart';
import {
  RadialAxis,
  RadialAxisArcLine,
  RadialAxisArcSeries
} from '@/common/Axis/RadialAxis';
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
      <RadialAxis type="category">
        <RadialAxisArcSeries
          count={5}
          arc={null}
          line={<RadialAxisArcLine />}
        />
      </RadialAxis>
    }
  />
);
