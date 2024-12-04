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
  LINEAR_Y_AXIS_DEFAULT_PROPS
} from '@/common/Axis';
import { HeatmapSeries, HeatmapSeriesProps } from './HeatmapSeries';
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
  data,
  margins,
  series,
  yAxis,
  xAxis,
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
  const getScalesData = useCallback(
    (chartHeight: number, chartWidth: number) => {
      const nestedData = buildNestedChartData(data);

      const xDomain: any =
        xAxisProps.domain || uniqueBy(nestedData, (d) => d.key);

      const xScale = scaleBand()
        .range([0, chartWidth])
        .domain(xDomain)
        .paddingInner(series.props.padding || 0.1);

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
        .paddingInner(series.props.padding || 0.1);

      return {
        yScale,
        xScale,
        data: nestedData
      };
    },
    [data, xAxis, yAxis, series]
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
          />
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(event) => updateAxes('vertical', event)}
          />
          {secondaryAxis &&
            secondaryAxis.map((axis, i) => (
              <CloneElement<LinearAxisProps>
                key={i}
                element={axis}
                height={chartHeight}
                width={chartWidth}
                visibility={chartSized ? 'visible' : 'hidden'}
                onDimensionsChange={(event) => updateAxes('horizontal', event)}
              />
            ))}
          {chartSized && (
            <CloneElement<HeatmapSeriesProps>
              element={series}
              id={`heat-series-${id}`}
              data={scalesData}
              xScale={xScale}
              yScale={yScale}
            />
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

Heatmap.defaultProps = {
  data: [],
  margins: 10,
  series: <HeatmapSeries padding={0.3} />,
  yAxis: (
    <LinearYAxis
      type="category"
      axisLine={null}
      tickSeries={
        <LinearYAxisTickSeries
          line={null}
          label={<LinearYAxisTickLabel padding={5} />}
        />
      }
    />
  ),
  xAxis: (
    <LinearXAxis
      type="category"
      axisLine={null}
      tickSeries={
        <LinearXAxisTickSeries
          line={null}
          label={<LinearXAxisTickLabel padding={5} />}
        />
      }
    />
  )
};
