import React, { Component, ReactElement } from 'react';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import { ChartShallowDataShape } from '../common/data';
import { scaleLinear } from 'd3-scale';
import { CloneElement } from '../common/utils/children';
import { RadialGaugeSeriesProps, RadialGaugeSeries } from './RadialGaugeSeries';

export interface RadialGaugeProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * Min value to scale on.
   */
  minValue: number;

  /**
   * Max value to scale on.
   */
  maxValue: number;

  /**
   * Start angle for the first value.
   */
  startAngle: number;

  /**
   * End angle for the last value.
   */
  endAngle: number;

  /**
   * Gauge series component to render.
   */
  series: ReactElement<RadialGaugeSeriesProps, typeof RadialGaugeSeries>;
}

export class RadialGauge extends Component<RadialGaugeProps> {
  static defaultProps: Partial<RadialGaugeProps> = {
    minValue: 0,
    maxValue: 100,
    startAngle: 0,
    endAngle: Math.PI * 2,
    series: <RadialGaugeSeries />
  };

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartWidth, chartHeight } = containerProps;
    const {
      startAngle,
      endAngle,
      minValue,
      maxValue,
      data,
      series
    } = this.props;

    const scale = scaleLinear()
      .domain([minValue, maxValue])
      .range([startAngle, endAngle]);

    return (
      <CloneElement<RadialGaugeSeriesProps>
        element={series}
        scale={scale}
        data={data}
        startAngle={startAngle}
        endAngle={endAngle}
        width={chartWidth}
        height={chartHeight}
      />
    );
  }

  render() {
    const { id, width, height, margins, className } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        xAxisVisible={false}
        yAxisVisible={false}
        className={className}
      >
        {this.renderChart.bind(this)}
      </ChartContainer>
    );
  }
}
