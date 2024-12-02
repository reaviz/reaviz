import React, { Fragment, ReactElement, FC, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxis,
  LinearAxis,
  LinearYAxisDefaultProps,
  LinearXAxisDefaultProps
} from '@/common/Axis';
import { BarSeries, BarSeriesDefaultProps, BarSeriesProps } from './BarSeries';
import {
  ChartDataShape,
  ChartNestedDataShape,
  buildBarStackData,
  buildMarimekkoData,
  buildWaterfall,
  ChartShallowDataShape,
  buildNestedChartData,
  buildShallowChartData,
  StackTypes
} from '@/common/data';
import { GridlineSeries, GridlineSeriesProps } from '@/common/Gridline';
import {
  getXScale,
  getYScale,
  getGroupScale,
  getInnerScale,
  getMarimekkoScale,
  getMarimekkoGroupScale
} from '@/common/scales';
import { ChartBrushProps, ChartBrush } from '@/common/Brush';
import css from './BarChart.module.css';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '@/common/containers/ChartContainer';
import { CloneElement } from 'reablocks';

export interface BarChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartDataShape[];

  /**
   * The series component that renders the bar components.
   */
  series: ReactElement<BarSeriesProps, typeof BarSeries>;

  /**
   * The linear axis component for the Y Axis of the chart.
   */
  yAxis: ReactElement<LinearAxisProps, typeof LinearAxis>;

  /**
   * The linear axis component for the X Axis of the chart.
   */
  xAxis: ReactElement<LinearAxisProps, typeof LinearAxis>;

  /**
   * The chart's background gridlines component.
   */
  gridlines: ReactElement<GridlineSeriesProps, typeof GridlineSeries> | null;

  /**
   * The chart's brush component.
   */
  brush: ReactElement<ChartBrushProps, typeof ChartBrush> | null;

  /**
   * Any secondary axis components. Useful for multi-axis charts.
   */
  secondaryAxis?: ReactElement<LinearAxisProps, typeof LinearAxis>[];
}

export const BarChart: FC<Partial<BarChartProps>> = (props) => {
  const {
    id,
    width,
    height,
    margins,
    className,
    data,
    xAxis,
    yAxis,
    series,
    brush,
    gridlines,
    secondaryAxis,
    containerClassName
  } = { ...BarChartDefaultProps, ...props };

  const seriesProps = useMemo(
    () => ({ ...BarSeriesDefaultProps, ...series.props }),
    [series.props]
  );
  const isVertical = useMemo(
    () => seriesProps.layout === 'vertical',
    [seriesProps]
  );
  const keyAxis = useMemo(
    () => (isVertical ? xAxis : yAxis),
    [yAxis, xAxis, isVertical]
  );
  const isDiverging = useMemo(
    () => seriesProps.type === 'stackedDiverging',
    [seriesProps.type]
  );
  const yAxisProps = useMemo(
    () => ({ ...LinearYAxisDefaultProps, ...yAxis.props }),
    [yAxis]
  );
  const xAxisProps = useMemo(
    () => ({ ...LinearXAxisDefaultProps, ...xAxis.props }),
    [xAxis]
  );

  const getMarimekkoGroupScales = useCallback(
    (aggregatedData, axis, width: number) => {
      const keyScale = getMarimekkoScale(width, axis.props.roundDomains);

      const groupScale = getMarimekkoGroupScale({
        width,
        padding: seriesProps.padding,
        data: aggregatedData,
        valueScale: keyScale
      });

      return {
        keyScale,
        groupScale
      };
    },
    [seriesProps.padding]
  );

  const getMultiGroupScales = useCallback(
    (aggregatedData, height: number, width: number) => {
      const { groupPadding, layout } = seriesProps;

      const groupScale = getGroupScale({
        dimension: isVertical ? width : height,
        direction: layout,
        padding: groupPadding,
        data: aggregatedData
      });

      const keyScale = getInnerScale({
        groupScale: groupScale,
        padding: seriesProps.padding,
        data: aggregatedData,
        prop: isVertical ? 'x' : 'y'
      });

      return {
        groupScale,
        keyScale
      };
    },
    [isVertical, seriesProps]
  );

  const getKeyScale = useCallback(
    (aggregatedData, axisProps, isMultiSeries: boolean, width: number) => {
      return getXScale({
        width,
        type: axisProps.type,
        roundDomains: axisProps.roundDomains,
        data: aggregatedData,
        padding: seriesProps.padding,
        domain: axisProps.domain,
        isMultiSeries,
        isDiverging
      });
    },
    [isDiverging, series]
  );

  const getValueScale = useCallback(
    (aggregatedData, axisProps, isMultiSeries: boolean, height: number) => {
      return getYScale({
        roundDomains: axisProps.roundDomains,
        padding: seriesProps.padding,
        type: axisProps.type,
        height,
        data: aggregatedData,
        domain: axisProps.domain,
        isMultiSeries,
        isDiverging
      });
    },
    [isDiverging, series]
  );

  const getScalesAndData = useCallback(
    (chartHeight: number, chartWidth: number) => {
      const { type, layout } = seriesProps;
      const isMarimekko = type === 'marimekko';
      const isGrouped = type === 'grouped';
      const isStacked =
        type === 'stacked' ||
        type === 'stackedNormalized' ||
        type === 'stackedDiverging';
      const isMultiSeries = isGrouped || isStacked;

      let aggregatedData;
      if (isStacked) {
        let distroType: StackTypes = 'default';
        if (type === 'stackedNormalized') {
          distroType = 'expand';
        } else if (type === 'stackedDiverging') {
          distroType = 'diverging';
        }

        aggregatedData = buildBarStackData(
          data as ChartNestedDataShape[],
          distroType,
          layout
        );
      } else if (type === 'waterfall') {
        aggregatedData = buildWaterfall(
          data as ChartShallowDataShape[],
          layout,
          seriesProps.binSize
        );
      } else if (isMarimekko) {
        aggregatedData = buildMarimekkoData(data as ChartNestedDataShape[]);
      } else if (isGrouped) {
        aggregatedData = buildNestedChartData(
          data as ChartNestedDataShape[],
          false,
          layout
        );
      } else {
        aggregatedData = buildShallowChartData(
          data as ChartShallowDataShape[],
          layout,
          seriesProps.binSize
        );
      }

      let yScale;
      let xScale;
      let xScale1;

      if (isVertical) {
        if (isGrouped) {
          const { keyScale, groupScale } = getMultiGroupScales(
            aggregatedData,
            chartHeight,
            chartWidth
          );
          xScale = groupScale;
          xScale1 = keyScale;
        } else if (isMarimekko) {
          const { keyScale, groupScale } = getMarimekkoGroupScales(
            aggregatedData,
            xAxis,
            chartWidth
          );
          xScale = groupScale;
          xScale1 = keyScale;
        } else {
          xScale = getKeyScale(
            aggregatedData,
            xAxisProps,
            isMultiSeries,
            chartWidth
          );
        }

        yScale = getValueScale(
          aggregatedData,
          yAxisProps,
          isMultiSeries,
          chartHeight
        );
      } else {
        if (isGrouped) {
          const { keyScale, groupScale } = getMultiGroupScales(
            aggregatedData,
            chartHeight,
            chartWidth
          );
          yScale = groupScale;
          xScale1 = keyScale;
          xScale = getKeyScale(
            aggregatedData,
            xAxis,
            isMultiSeries,
            chartWidth
          );
        } else if (isMarimekko) {
          throw new Error(
            'Marimekko is currently not supported for horizontal layouts'
          );
        } else {
          xScale = getKeyScale(
            aggregatedData,
            xAxis,
            isMultiSeries,
            chartWidth
          );
          yScale = getValueScale(
            aggregatedData,
            yAxis,
            isMultiSeries,
            chartHeight
          );
        }
      }

      return { xScale, xScale1, yScale, aggregatedData };
    },
    [
      getKeyScale,
      data,
      getMarimekkoGroupScales,
      getMultiGroupScales,
      getValueScale,
      isVertical,
      seriesProps,
      xAxis,
      yAxis,
      xAxisProps,
      yAxisProps
    ]
  );

  const renderChart = useCallback(
    (containerProps: ChartContainerChildProps) => {
      const { chartHeight, chartWidth, id, updateAxes, chartSized } =
        containerProps;
      const { xScale, xScale1, yScale, aggregatedData } = getScalesAndData(
        chartHeight,
        chartWidth
      );

      const isCategorical = keyAxis.props.type === 'category';
      const disableBrush = aggregatedData.length <= 1;

      return (
        <Fragment>
          {chartSized && gridlines && (
            <CloneElement<GridlineSeriesProps>
              element={gridlines}
              height={chartHeight}
              width={chartWidth}
              yScale={yScale}
              xScale={xScale}
              yAxis={yAxisProps}
              xAxis={xAxisProps}
            />
          )}
          <CloneElement<LinearAxisProps>
            element={xAxis}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(event) =>
              updateAxes(isVertical ? 'horizontal' : 'vertical', event)
            }
          />
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(event) =>
              updateAxes(isVertical ? 'vertical' : 'horizontal', event)
            }
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
            <CloneElement<ChartBrushProps>
              disabled={disableBrush}
              element={brush}
              height={chartHeight}
              width={chartWidth}
              scale={xScale}
            >
              <CloneElement<BarSeriesProps>
                element={series}
                id={`bar-series-${id}`}
                data={aggregatedData}
                height={chartHeight}
                width={chartWidth}
                isCategorical={isCategorical}
                xScale={xScale}
                xScale1={xScale1}
                yScale={yScale}
              />
            </CloneElement>
          )}
        </Fragment>
      );
    },
    [
      brush,
      getScalesAndData,
      gridlines,
      isVertical,
      keyAxis,
      secondaryAxis,
      series,
      xAxis,
      yAxis,
      xAxisProps,
      yAxisProps
    ]
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
      className={classNames(css.barChart, className, css[seriesProps.type])}
    >
      {renderChart}
    </ChartContainer>
  );
};

export const BarChartDefaultProps = {
  data: [],
  xAxis: (
    <LinearXAxis
      type="category"
      tickSeries={<LinearXAxisTickSeries tickSize={20} />}
    />
  ),
  yAxis: <LinearYAxis type="value" />,
  series: <BarSeries />,
  gridlines: <GridlineSeries />,
  brush: null
};
