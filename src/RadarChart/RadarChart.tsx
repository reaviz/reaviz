import React, { FC } from 'react';
import { ChartNestedDataShape } from '@/common/data';
import { RadialAreaChart, RadialAreaChartProps } from '@/RadialAreaChart';
import {
  RADIAL_AXIS_ARC_LINE_DEFAULT_PROPS,
  RADIAL_AXIS_ARC_SERIES_DEFAULT_PROPS,
  RadialAxis,
  RadialAxisArcLine,
  RadialAxisArcSeries
} from '@/common/Axis/RadialAxis';
import { RadarChartSeries } from './RadarChartSeries';

export interface RadarChartProps extends RadialAreaChartProps {
  data: ChartNestedDataShape[];
}

export const RadarChart: FC<Partial<RadarChartProps>> = (props) => (
  <RadialAreaChart {...props} />
);

RadarChart.defaultProps = {
  series: <RadarChartSeries />,
  axis: (
    <RadialAxis
      type="category"
      arcs={
        <RadialAxisArcSeries
          {...RADIAL_AXIS_ARC_SERIES_DEFAULT_PROPS}
          count={5}
          arc={null}
          line={<RadialAxisArcLine {...RADIAL_AXIS_ARC_LINE_DEFAULT_PROPS} />}
        />
      }
    />
  )
};
