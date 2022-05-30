import React, { cloneElement, FC, ReactElement } from 'react';
import { scaleLinear } from 'd3-scale';
import { ChartContainer, ChartProps } from '../common/containers';
import { ChartShallowDataShape } from '../common/data';
import { RadialGaugeSeries, RadialGaugeSeriesProps } from './RadialGaugeSeries';

export interface RadialGaugeProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * Min value to scale on.
   */
  minValue?: number;

  /**
   * Max value to scale on.
   */
  maxValue?: number;

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
  series?: ReactElement<RadialGaugeSeriesProps, typeof RadialGaugeSeries>;
}

export const RadialGauge: FC<RadialGaugeProps> = ({
  id,
  width,
  height,
  margins,
  className,
  data,
  minValue,
  maxValue,
  startAngle,
  endAngle,
  series,
  containerClassName
}) => {
  const scale = scaleLinear()
    .domain([minValue, maxValue])
    .range([startAngle, endAngle]);

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
      {(props) =>
        cloneElement(series, {
          scale,
          data,
          startAngle,
          endAngle,
          width: props.width,
          height: props.height
        })
      }
    </ChartContainer>
  );
};

RadialGauge.defaultProps = {
  minValue: 0,
  maxValue: 100,
  startAngle: 0,
  endAngle: Math.PI * 2,
  series: <RadialGaugeSeries />
};
