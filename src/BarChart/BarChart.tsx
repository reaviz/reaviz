import React, {
  Fragment,
  Component,
  ReactElement,
  FC,
  useMemo,
  useCallback
} from 'react';
import classNames from 'classnames';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxisTickSeries,
  LinearXAxis,
  LinearYAxis,
  LinearAxis
} from '../common/Axis';
import { BarSeries, BarSeriesProps } from './BarSeries';
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
} from '../common/data';
import { GridlineSeries, GridlineSeriesProps } from '../common/Gridline';
import {
  getXScale,
  getYScale,
  getGroupScale,
  getInnerScale,
  getMarimekkoScale,
  getMarimekkoGroupScale
} from '../common/scales';
import { ChartBrushProps, ChartBrush } from '../common/Brush';
import css from './BarChart.module.css';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '../common/containers/ChartContainer';
import { CloneElement } from 'rdk';

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

export const BarChart: FC<Partial<BarChartProps>> = ({
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
}) => {
  const isVertical = useMemo(
    () => series.props.layout === 'vertical',
    [series]
  );
  const keyAxis = useMemo(
    () => (isVertical ? xAxis : yAxis),
    [yAxis, xAxis, isVertical]
  );
  const isDiverging = useMemo(
    () => series.props.type === 'stackedDiverging',
    [series.props.type]
  );

  const getMarimekkoGroupScales = useCallback(
    (aggregatedData, axis, width: number) => {
      const keyScale = getMarimekkoScale(width, axis.props.roundDomains);

      const groupScale = getMarimekkoGroupScale({
        width,
        padding: series.props.padding,
        data: aggregatedData,
        valueScale: keyScale
      });

      return {
        keyScale,
        groupScale
      };
    },
    [series.props.padding]
  );

  const getMultiGroupScales = useCallback(
    (aggregatedData, height: number, width: number) => {
      const { groupPadding, layout } = series.props;

      const groupScale = getGroupScale({
        dimension: isVertical ? width : height,
        direction: layout,
        padding: groupPadding,
        data: aggregatedData
      });

      const keyScale = getInnerScale({
        groupScale: groupScale,
        padding: series.props.padding,
        data: aggregatedData,
        prop: isVertical ? 'x' : 'y'
      });

      return {
        groupScale,
        keyScale
      };
    },
    [isVertical, series.props]
  );

  const getKeyScale = useCallback(
    (aggregatedData, axis, isMultiSeries: boolean, width: number) => {
      return getXScale({
        width,
        type: axis.props.type,
        roundDomains: axis.props.roundDomains,
        data: aggregatedData,
        padding: series.props.padding,
        domain: axis.props.domain,
        isMultiSeries,
        isDiverging
      });
    },
    [isDiverging, series]
  );

  const getValueScale = useCallback(
    (aggregatedData, axis, isMultiSeries: boolean, height: number) => {
      return getYScale({
        roundDomains: axis.props.roundDomains,
        padding: series.props.padding,
        type: axis.props.type,
        height,
        data: aggregatedData,
        domain: axis.props.domain,
        isMultiSeries,
        isDiverging
      });
    },
    [isDiverging, series]
  );

  const getScalesAndData = useCallback(
    (chartHeight: number, chartWidth: number) => {
      const { type, layout } = series.props;
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
          series.props.binSize
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
          series.props.binSize
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
            xAxis,
            isMultiSeries,
            chartWidth
          );
        }

        yScale = getValueScale(
          aggregatedData,
          yAxis,
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
      series.props,
      xAxis,
      yAxis
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

      return (
        <Fragment>
          {chartSized && gridlines && (
            <CloneElement<GridlineSeriesProps>
              element={gridlines}
              height={chartHeight}
              width={chartWidth}
              yScale={yScale}
              xScale={xScale}
              yAxis={yAxis.props}
              xAxis={xAxis.props}
            />
          )}
          <CloneElement<LinearAxisProps>
            element={xAxis}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
            onDimensionsChange={(event) =>
              updateAxes(isVertical ? 'horizontal' : 'vertical', event)
            }
          />
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
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
                onDimensionsChange={(event) => updateAxes('horizontal', event)}
              />
            ))}
          {chartSized && (
            <CloneElement<ChartBrushProps>
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
      yAxis
    ]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      containerClassName={containerClassName}
      xAxisVisible={isAxisVisible(xAxis.props)}
      yAxisVisible={isAxisVisible(yAxis.props)}
      className={classNames(css.barChart, className, css[series.props.type])}
    >
      {renderChart}
    </ChartContainer>
  );
};

BarChart.defaultProps = {
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
