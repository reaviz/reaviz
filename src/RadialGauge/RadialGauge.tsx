import { scaleLinear } from 'd3-scale';
import { useId } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { cloneElement, useCallback } from 'react';

import type { ChartContextProps, ChartProps } from '@/common/containers';
import { ChartContainer } from '@/common/containers';
import type { ChartDataShape } from '@/common/data';

import type {
  RadialGaugeSeriesProps,
  StackedRadialGaugeSeries,
  StackedRadialGaugeSeriesProps
} from './RadialGaugeSeries';
import { RadialGaugeSeries } from './RadialGaugeSeries';

export interface RadialGaugeProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartDataShape[];

  /**
   * Min value to scale on.
   */
  minValue?: number | number[];

  /**
   * Max value to scale on.
   */
  maxValue?: number | number[];

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;

  /**
   * Gauge series component to render.
   */
  series?: ReactElement<
    RadialGaugeSeriesProps | StackedRadialGaugeSeriesProps,
    typeof RadialGaugeSeries | typeof StackedRadialGaugeSeries
  >;
}

export const RadialGauge: FC<RadialGaugeProps> = ({
  id,
  width,
  height,
  margins,
  className,
  data,
  minValue = 0,
  maxValue = 100,
  startAngle = 0,
  endAngle = Math.PI * 2,
  series = <RadialGaugeSeries />,
  containerClassName
}) => {
  const newId = useId(id);

  const renderSeries = useCallback(
    ({ chartHeight, chartWidth }: ChartContextProps) => {
      let scale;

      if (Array.isArray(maxValue)) {
        scale = maxValue.map((max, index) =>
          scaleLinear()
            .domain([minValue?.[index] ?? minValue?.[0] ?? minValue, max])
            .range([startAngle, endAngle])
        );
      } else if (Array.isArray(minValue)) {
        scale = minValue.map((min, index) =>
          scaleLinear()
            .domain([min, maxValue?.[index] ?? maxValue?.[0] ?? maxValue])
            .range([startAngle, endAngle])
        );
      } else {
        scale = scaleLinear()
          .domain([minValue, maxValue])
          .range([startAngle, endAngle]);
      }

      return cloneElement(series, {
        id: newId,
        scale,
        data,
        startAngle,
        endAngle,
        width: chartWidth,
        height: chartHeight
      });
    },
    [data, endAngle, maxValue, minValue, series, startAngle, newId]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      className={className}
      containerClassName={containerClassName}
    >
      {renderSeries}
    </ChartContainer>
  );
};
