import React, { FC, Fragment, ReactElement, useCallback, useMemo } from 'react';
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
import { CloneElement } from 'rdk';
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

export const LinearGauge: FC<Partial<LinearGaugeProps>> = ({
  id,
  width,
  height,
  margins,
  className,
  containerClassName,
  series,
  data,
  minValue,
  maxValue
}) => {
  const transformedData = useMemo(() => {
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
  }, [data]);

  const getScales = useCallback(
    (
      isMultiSeries: boolean,
      data: ChartInternalNestedDataShape[],
      width: number,
      height: number,
      minValue: number,
      maxValue: number
    ) => {
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
    },
    []
  );

  const renderChart = useCallback(
    ({ chartHeight, chartWidth, id, chartSized }: ChartContainerChildProps) => {
      const isMultiSeries = Array.isArray(data);
      const type = isMultiSeries ? 'stackedNormalized' : 'standard';
      const { keyScale, valueScale } = getScales(
        isMultiSeries,
        transformedData as ChartInternalNestedDataShape[],
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
    },
    [data, getScales, maxValue, minValue, series, transformedData]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      className={className}
      containerClassName={containerClassName}
    >
      {renderChart}
    </ChartContainer>
  );
};

LinearGauge.defaultProps = {
  minValue: 0,
  maxValue: 100,
  series: <LinearGaugeSeries />
};
