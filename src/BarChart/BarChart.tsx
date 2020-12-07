import React, { Fragment, Component, ReactElement, FC } from 'react';
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
import css from './BarChart.module.scss';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '../common/containers/ChartContainer';
import bind from 'memoize-bind';
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
export const BarChart: FC<BarChartProps> = ({
  data = [],
  xAxis = (
    <LinearXAxis
      type="category"
      tickSeries={<LinearXAxisTickSeries tickSize={20} />}
    />
  ),
  yAxis = <LinearYAxis type="value" />,
  series = <BarSeries />,
  secondaryAxis,
  gridlines = <GridlineSeries />,
  brush = null,
  id,
  width,
  height,
  margins,
  className
}) => {
  const getScalesAndData = (chartHeight: number, chartWidth: number) => {
    const { type, layout } = series.props;
    const isVertical = getIsVertical();
    const isMarimekko = type === 'marimekko';
    const isGrouped = type === 'grouped';
    const isStacked =
      type === 'stacked' ||
      type === 'stackedNormalized' ||
      type === 'stackedDiverging';
    const isMultiSeries = isGrouped || isStacked;

    let tmpData;
    if (isStacked) {
      let distroType: StackTypes = 'default';
      if (type === 'stackedNormalized') {
        distroType = 'expand';
      } else if (type === 'stackedDiverging') {
        distroType = 'diverging';
      }

      tmpData = buildBarStackData(
        data as ChartNestedDataShape[],
        distroType,
        layout
      );
    } else if (type === 'waterfall') {
      tmpData = buildWaterfall(
        data as ChartShallowDataShape[],
        layout,
        series.props.binSize
      );
    } else if (isMarimekko) {
      tmpData = buildMarimekkoData(data as ChartNestedDataShape[]);
    } else if (isGrouped) {
      tmpData = buildNestedChartData(
        data as ChartNestedDataShape[],
        false,
        layout
      );
    } else {
      tmpData = buildShallowChartData(
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
          tmpData,
          chartHeight,
          chartWidth
        );
        xScale = groupScale;
        xScale1 = keyScale;
      } else if (isMarimekko) {
        const { keyScale, groupScale } = getMarimekkoGroupScales(
          tmpData,
          xAxis,
          chartWidth
        );
        xScale = groupScale;
        xScale1 = keyScale;
      } else {
        xScale = getKeyScale(tmpData, xAxis, isMultiSeries, chartWidth);
      }

      yScale = getValueScale(tmpData, yAxis, isMultiSeries, chartHeight);
    } else {
      if (isGrouped) {
        const { keyScale, groupScale } = getMultiGroupScales(
          tmpData,
          chartHeight,
          chartWidth
        );
        yScale = groupScale;
        xScale1 = keyScale;
        xScale = getKeyScale(tmpData, xAxis, isMultiSeries, chartWidth);
      } else if (isMarimekko) {
        throw new Error(
          'Marimekko is currently not supported for horizontal layouts'
        );
      } else {
        xScale = getKeyScale(tmpData, xAxis, isMultiSeries, chartWidth);
        yScale = getValueScale(tmpData, yAxis, isMultiSeries, chartHeight);
      }
    }

    return { xScale, xScale1, yScale, data: tmpData };
  };

  const getKeyAxis = () => {
    const isVertical = getIsVertical();
    return isVertical ? xAxis : yAxis;
  };

  const getIsDiverging = () => series.props.type === 'stackedDiverging';

  const getIsVertical = () => series.props.layout === 'vertical';

  const getMarimekkoGroupScales = (data, axis, width: number) => {
    const keyScale = getMarimekkoScale(width, axis.props.roundDomains);

    const groupScale = getMarimekkoGroupScale({
      width,
      padding: series.props.padding,
      data,
      valueScale: keyScale
    });

    return {
      keyScale,
      groupScale
    };
  };

  const getMultiGroupScales = (data, height: number, width: number) => {
    const isVertical = getIsVertical();
    const { groupPadding, layout } = series.props;

    const groupScale = getGroupScale({
      dimension: isVertical ? width : height,
      direction: layout,
      padding: groupPadding,
      data
    });

    const keyScale = getInnerScale({
      groupScale: groupScale,
      padding: series.props.padding,
      data,
      prop: isVertical ? 'x' : 'y'
    });

    return {
      groupScale,
      keyScale
    };
  };

  const getKeyScale = (data, axis, isMultiSeries: boolean, width: number) => {
    return getXScale({
      width,
      type: axis.props.type,
      roundDomains: axis.props.roundDomains,
      data,
      padding: series.props.padding,
      domain: axis.props.domain,
      isMultiSeries,
      isDiverging: getIsDiverging()
    });
  };

  const getValueScale = (
    data,
    axis,
    isMultiSeries: boolean,
    height: number
  ) => {
    return getYScale({
      roundDomains: axis.props.roundDomains,
      padding: series.props.padding,
      type: axis.props.type,
      height,
      data,
      domain: axis.props.domain,
      isMultiSeries,
      isDiverging: getIsDiverging()
    });
  };

  const renderChart = (containerProps: ChartContainerChildProps) => {
    const { chartHeight, chartWidth, id, updateAxes } = containerProps;

    const { xScale, xScale1, yScale, data } = getScalesAndData(
      chartHeight,
      chartWidth
    );

    const isVertical = getIsVertical();
    const keyAxis = getKeyAxis();
    const isCategorical = keyAxis.props.type === 'category';

    return (
      <Fragment>
        {containerProps.chartSized && gridlines && (
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
          onDimensionsChange={bind(
            updateAxes,
            this,
            isVertical ? 'horizontal' : 'vertical'
          )}
        />
        <CloneElement<LinearAxisProps>
          element={yAxis}
          height={chartHeight}
          width={chartWidth}
          scale={yScale}
          onDimensionsChange={bind(
            updateAxes,
            this,
            isVertical ? 'vertical' : 'horizontal'
          )}
        />
        {secondaryAxis &&
          secondaryAxis.map((axis, i) => (
            <CloneElement<LinearAxisProps>
              key={i}
              element={axis}
              height={chartHeight}
              width={chartWidth}
              onDimensionsChange={bind(updateAxes, this, 'horizontal')}
            />
          ))}
        {containerProps.chartSized && (
          <CloneElement<ChartBrushProps>
            element={brush}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
          >
            <CloneElement<BarSeriesProps>
              element={series}
              id={`bar-series-${id}`}
              data={data}
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
  };

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={isAxisVisible(xAxis.props)}
      yAxisVisible={isAxisVisible(yAxis.props)}
      className={classNames(css.barChart, className, css[series.props.type])}
    >
      {(props) => renderChart(props)}
    </ChartContainer>
  );
};
