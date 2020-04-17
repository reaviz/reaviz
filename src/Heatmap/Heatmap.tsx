import React, { Component, Fragment, ReactElement } from 'react';
import classNames from 'classnames';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers/ChartContainer';
import {
  ChartNestedDataShape,
  buildNestedChartData,
  ChartInternalNestedDataShape
} from '../common/data';
import { CloneElement } from '../common/utils/children';
import bind from 'memoize-bind';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxisTickLabel,
  LinearAxis
} from '../common/Axis';
import { HeatmapSeries, HeatmapSeriesProps } from './HeatmapSeries';
import { scaleBand } from 'd3-scale';
import { uniqueBy } from '../common/utils/array';

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

export class Heatmap extends Component<HeatmapProps> {
  static defaultProps: Partial<HeatmapProps> = {
    data: [],
    margins: 10,
    series: <HeatmapSeries />,
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

  getScalesData(chartHeight: number, chartWidth: number) {
    const { xAxis, yAxis, series, data: prevData } = this.props;

    const data = buildNestedChartData(prevData);

    const xDomain =
      xAxis.props.domain ||
      uniqueBy<ChartInternalNestedDataShape>(data, d => d.key);
    const xScale = scaleBand()
      .range([0, chartWidth])
      .domain(xDomain)
      .paddingInner(series.props.padding);

    const yDomain =
      yAxis.props.domain ||
      uniqueBy<ChartInternalNestedDataShape>(data, d => d.data, d => d.x);
    const yScale = scaleBand()
      .domain(yDomain)
      .range([chartHeight, 0])
      .paddingInner(series.props.padding);

    return {
      yScale,
      xScale,
      data
    };
  }

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartWidth, chartHeight, updateAxes, id } = containerProps;
    const { yAxis, xAxis, series, secondaryAxis } = this.props;
    const { xScale, yScale, data } = this.getScalesData(
      chartHeight,
      chartWidth
    );

    return (
      <Fragment>
        <CloneElement<LinearAxisProps>
          element={xAxis}
          height={chartHeight}
          width={chartWidth}
          scale={xScale}
          onDimensionsChange={bind(updateAxes, this, 'horizontal')}
        />
        <CloneElement<LinearAxisProps>
          element={yAxis}
          height={chartHeight}
          width={chartWidth}
          scale={yScale}
          onDimensionsChange={bind(updateAxes, this, 'vertical')}
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
        <CloneElement<HeatmapSeriesProps>
          element={series}
          id={`heat-series-${id}`}
          data={data}
          xScale={xScale}
          yScale={yScale}
        />
      </Fragment>
    );
  }

  render() {
    const { id, width, height, margins, className, xAxis, yAxis } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        xAxisVisible={isAxisVisible(xAxis.props)}
        yAxisVisible={isAxisVisible(yAxis.props)}
        className={classNames(className)}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
