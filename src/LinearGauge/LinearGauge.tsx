import React, { Component, Fragment, ReactElement } from 'react';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import {
  ChartShallowDataShape,
  buildBarStackData,
  ChartInternalNestedDataShape,
  buildShallowChartData,
  ChartNestedDataShape
} from '../common/data';
import { getXScale, getYScale } from '../common/scales';
import { CloneElement } from '../common/utils';
import { LinearGaugeSeries, LinearGaugeSeriesProps } from './LinearGaugeSeries';

export interface LinearGaugeProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape | ChartShallowDataShape[];

  /**
   * The series component that renders the bar components.
   */
  series: ReactElement<LinearGaugeSeriesProps, typeof LinearGaugeSeries>;

  /**
   * Min value to scale on. Only applicable for single-series.
   */
  minValue: number;

  /**
   * Max value to scale on. Only applicable for single-series.
   */
  maxValue: number;
}

export class LinearGauge extends Component<LinearGaugeProps> {
  static defaultProps: Partial<LinearGaugeProps> = {
    minValue: 0,
    maxValue: 100,
    series: <LinearGaugeSeries />
  };

  getData(data: ChartShallowDataShape | ChartShallowDataShape[]) {
    if (Array.isArray(data)) {
      return buildBarStackData(
        [
          {
            key: 'default',
            data
          }
        ] as ChartNestedDataShape[],
        'expand',
        'horizontal'
      );
    } else {
      return buildShallowChartData([data], 'horizontal');
    }
  }

  getScales(
    isMultiSeries: boolean,
    data: ChartInternalNestedDataShape[],
    width: number,
    height: number,
    minValue: number,
    maxValue: number
  ) {
    const domain = !isMultiSeries ? [minValue, maxValue] : undefined;

    const keyScale = getXScale({
      width,
      type: 'value',
      data,
      domain,
      isMultiSeries
    });

    const valueScale = getYScale({
      type: 'category',
      height,
      data,
      isMultiSeries
    });

    return {
      keyScale,
      valueScale
    };
  }

  renderChart({
    chartHeight,
    chartWidth,
    id,
    chartSized
  }: ChartContainerChildProps) {
    const { series, data, minValue, maxValue } = this.props;
    const isMultiSeries = Array.isArray(data);
    const type = isMultiSeries ? 'stackedNormalized' : 'standard';
    const transformedData = this.getData(data) as any;
    const { keyScale, valueScale } = this.getScales(
      isMultiSeries,
      transformedData,
      chartWidth,
      chartHeight,
      minValue,
      maxValue
    );

    return (
      <Fragment>
        {chartSized && (
          <CloneElement<LinearGaugeSeriesProps>
            element={series}
            id={`linear-gauge-series-${id}`}
            data={transformedData}
            isCategorical={true}
            xScale={keyScale}
            yScale={valueScale}
            type={type}
            height={chartHeight}
            width={chartWidth}
            isMultiSeries={isMultiSeries}
          />
        )}
      </Fragment>
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
        className={className}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
