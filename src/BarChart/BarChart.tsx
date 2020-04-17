import React, { Fragment, Component, ReactElement } from 'react';
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
import { CloneElement } from '../common/utils/children';

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

export class BarChart extends Component<BarChartProps> {
  static defaultProps: Partial<BarChartProps> = {
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

  getScalesAndData(chartHeight: number, chartWidth: number) {
    const { yAxis, xAxis, series } = this.props;

    const { type, layout } = series.props;
    const isVertical = this.getIsVertical();
    const isMarimekko = type === 'marimekko';
    const isGrouped = type === 'grouped';
    const isStacked =
      type === 'stacked' ||
      type === 'stackedNormalized' ||
      type === 'stackedDiverging';
    const isMultiSeries = isGrouped || isStacked;

    let data;
    if (isStacked) {
      let distroType: StackTypes = 'default';
      if (type === 'stackedNormalized') {
        distroType = 'expand';
      } else if (type === 'stackedDiverging') {
        distroType = 'diverging';
      }

      data = buildBarStackData(
        this.props.data as ChartNestedDataShape[],
        distroType,
        layout
      );
    } else if (type === 'waterfall') {
      data = buildWaterfall(
        this.props.data as ChartShallowDataShape[],
        layout,
        this.props.series.props.binSize
      );
    } else if (isMarimekko) {
      data = buildMarimekkoData(this.props.data as ChartNestedDataShape[]);
    } else if (isGrouped) {
      data = buildNestedChartData(
        this.props.data as ChartNestedDataShape[],
        false,
        layout
      );
    } else {
      data = buildShallowChartData(
        this.props.data as ChartShallowDataShape[],
        layout,
        this.props.series.props.binSize
      );
    }

    let yScale;
    let xScale;
    let xScale1;

    if (isVertical) {
      if (isGrouped) {
        const { keyScale, groupScale } = this.getMultiGroupScales(
          data,
          chartHeight,
          chartWidth
        );
        xScale = groupScale;
        xScale1 = keyScale;
      } else if (isMarimekko) {
        const { keyScale, groupScale } = this.getMarimekkoGroupScales(
          data,
          xAxis,
          chartWidth
        );
        xScale = groupScale;
        xScale1 = keyScale;
      } else {
        xScale = this.getKeyScale(data, xAxis, isMultiSeries, chartWidth);
      }

      yScale = this.getValueScale(data, yAxis, isMultiSeries, chartHeight);
    } else {
      if (isGrouped) {
        const { keyScale, groupScale } = this.getMultiGroupScales(
          data,
          chartHeight,
          chartWidth
        );
        yScale = groupScale;
        xScale1 = keyScale;
        xScale = this.getKeyScale(data, xAxis, isMultiSeries, chartWidth);
      } else if (isMarimekko) {
        throw new Error(
          'Marimekko is currently not supported for horizontal layouts'
        );
      } else {
        xScale = this.getKeyScale(data, xAxis, isMultiSeries, chartWidth);
        yScale = this.getValueScale(data, yAxis, isMultiSeries, chartHeight);
      }
    }

    return { xScale, xScale1, yScale, data };
  }

  getKeyAxis() {
    const { yAxis, xAxis } = this.props;
    const isVertical = this.getIsVertical();
    return isVertical ? xAxis : yAxis;
  }

  getIsDiverging() {
    return this.props.series.props.type === 'stackedDiverging';
  }

  getIsVertical() {
    return this.props.series.props.layout === 'vertical';
  }

  getMarimekkoGroupScales(data, axis, width: number) {
    const { series } = this.props;

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
  }

  getMultiGroupScales(data, height: number, width: number) {
    const { series } = this.props;
    const isVertical = this.getIsVertical();
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
  }

  getKeyScale(data, axis, isMultiSeries: boolean, width: number) {
    const { series } = this.props;

    return getXScale({
      width,
      type: axis.props.type,
      roundDomains: axis.props.roundDomains,
      data,
      padding: series.props.padding,
      domain: axis.props.domain,
      isMultiSeries,
      isDiverging: this.getIsDiverging()
    });
  }

  getValueScale(data, axis, isMultiSeries: boolean, height: number) {
    const { series } = this.props;

    return getYScale({
      roundDomains: axis.props.roundDomains,
      padding: series.props.padding,
      type: axis.props.type,
      height,
      data,
      domain: axis.props.domain,
      isMultiSeries,
      isDiverging: this.getIsDiverging()
    });
  }

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartHeight, chartWidth, id, updateAxes } = containerProps;
    const {
      series,
      xAxis,
      yAxis,
      brush,
      gridlines,
      secondaryAxis
    } = this.props;
    const { xScale, xScale1, yScale, data } = this.getScalesAndData(
      chartHeight,
      chartWidth
    );

    const isVertical = this.getIsVertical();
    const keyAxis = this.getKeyAxis();
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
  }

  render() {
    const {
      id,
      width,
      height,
      margins,
      className,
      series,
      xAxis,
      yAxis
    } = this.props;

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
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
