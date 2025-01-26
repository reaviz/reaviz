import React, { useCallback, Fragment, ReactElement, FC, useMemo } from 'react';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '@/common/containers/ChartContainer';
import { ChartNestedDataShape, buildNestedChartData } from '@/common/data';
import { CloneElement } from 'reablocks';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxisTickLabel,
  LinearAxis,
  LINEAR_X_AXIS_DEFAULT_PROPS,
  LINEAR_Y_AXIS_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS
} from '@/common/Axis';
import {
  HEATMAP_SERIES_DEFAULT_PROPS,
  HeatmapSeries,
  HeatmapSeriesProps
} from './HeatmapSeries';
import { scaleBand } from 'd3-scale';
import { uniqueBy } from '@/common/utils/array';

export interface HeatmapProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartNestedDataShape[];

  /**
   * The series component that renders the cell components.
   */
  series: ReactElement<HeatmapSeriesProps, typeof HeatmapSeries>;

  /**
   * The linear axis component for the Y Axis of the chart.
   */
  yAxis: ReactElement<LinearAxisProps, typeof LinearAxis>;

  /**
   * The linear axis component for the X Axis of the chart.
   */
  xAxis: ReactElement<LinearAxisProps, typeof LinearAxis>;

  /**
   * Any secondary axis components. Useful for multi-axis charts.
   */
  secondaryAxis?: ReactElement<LinearAxisProps, typeof LinearAxis>[];
}

export const Heatmap: FC<Partial<HeatmapProps>> = ({
  data = [],
  margins = 10,
  series = <HeatmapSeries padding={0.3} />,
  yAxis = (
    <LinearYAxis
      type="category"
      tickSeries={
        <LinearYAxisTickSeries
          line={null}
          label={
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          }
        />
      }
    />
  ),
  xAxis = (
    <LinearXAxis
      type="category"
      tickSeries={
        <LinearXAxisTickSeries
          line={null}
          label={
            <LinearXAxisTickLabel
              {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          }
        />
      }
    />
  ),
  secondaryAxis,
  id,
  width,
  height,
  className,
  containerClassName
}) => {
  const xAxisProps = useMemo(
    () => ({ ...LINEAR_X_AXIS_DEFAULT_PROPS, ...xAxis.props }),
    [xAxis.props]
  );
  const yAxisProps = useMemo(
    () => ({ ...LINEAR_Y_AXIS_DEFAULT_PROPS, ...yAxis.props }),
    [yAxis.props]
  );
  const seriesProps = useMemo(
    () => ({ ...HEATMAP_SERIES_DEFAULT_PROPS, ...series.props }),
    [series.props]
  );

  const getScalesData = useCallback(
    (chartHeight: number, chartWidth: number) => {
      const nestedData = buildNestedChartData(data);

      const xDomain: any =
        xAxisProps.domain || uniqueBy(nestedData, (d) => d.key);

      const xScale = scaleBand()
        .range([0, chartWidth])
        .domain(xDomain)
        .paddingInner(seriesProps.padding || 0.1);

      const yDomain: any =
        yAxisProps.domain ||
        uniqueBy(
          nestedData,
          (d) => d.data,
          (d) => d.x
        );

      const yScale = scaleBand()
        .domain(yDomain)
        .range([chartHeight, 0])
        .paddingInner(seriesProps.padding || 0.1);

      return {
        yScale,
        xScale,
        data: nestedData
      };
    },
    [data, xAxisProps.domain, seriesProps.padding, yAxisProps.domain]
  );

  const renderChart = useCallback(
    (containerProps: ChartContainerChildProps) => {
      const { chartWidth, chartHeight, updateAxes, id, chartSized } =
        containerProps;
      const {
        xScale,
        yScale,
        data: scalesData
      } = getScalesData(chartHeight, chartWidth);

      return (
        <Fragment>
          <CloneElement<LinearAxisProps>
            element={xAxis}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(event) => updateAxes('horizontal', event)}
          >
            {xAxis?.props?.children}
          </CloneElement>
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(event) => updateAxes('vertical', event)}
          >
            {yAxis?.props?.children}
          </CloneElement>
          {secondaryAxis &&
            secondaryAxis.map((axis, i) => (
              <CloneElement<LinearAxisProps>
                key={i}
                element={axis}
                height={chartHeight}
                width={chartWidth}
                visibility={chartSized ? 'visible' : 'hidden'}
                onDimensionsChange={(event) => updateAxes('horizontal', event)}
              >
                {axis?.props?.children}
              </CloneElement>
            ))}
          {chartSized && (
            <CloneElement<HeatmapSeriesProps>
              element={series}
              id={`heat-series-${id}`}
              data={scalesData}
              xScale={xScale}
              yScale={yScale}
            >
              {series?.props?.children}
            </CloneElement>
          )}
        </Fragment>
      );
    },
    [getScalesData, secondaryAxis, series, xAxis, yAxis]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      containerClassName={containerClassName}
      xAxisVisible={isAxisVisible(xAxisProps)}
      yAxisVisible={isAxisVisible(yAxisProps)}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
