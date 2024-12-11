import React, { FC } from 'react';
import { ChartNestedDataShape } from '@/common/data';
import { RadialAreaChart, RadialAreaChartProps } from '@/RadialAreaChart';
import {
  RadialAxis,
  RadialAxisArcLine,
  RadialAxisArcSeries
} from '@/common/Axis/RadialAxis';
import { RadarChartSeries } from './RadarChartSeries';

export interface RadarChartProps extends RadialAreaChartProps {
  data: ChartNestedDataShape[];
}

export const RadarChart: FC<Partial<RadarChartProps>> = (props) => (
  <RadialAreaChart {...RADAR_CHART_DEFAULT_PROPS} {...props} />
);

const RADAR_CHART_DEFAULT_PROPS = {
  series: <RadarChartSeries />,
  axis: (
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
  )
};
