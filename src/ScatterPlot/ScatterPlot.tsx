import React, { Component, Fragment, ReactElement } from 'react';
import classNames from 'classnames';
import {
  ChartShallowDataShape,
  ChartInternalShallowDataShape,
  buildShallowChartData,
  ChartDataTypes
} from '../common/data';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxis,
  LinearYAxis,
  LinearAxis
} from '../common/Axis';
import bind from 'memoize-bind';
import { getYScale, getXScale } from '../common/scales';
import { ScatterSeries, ScatterSeriesProps } from './ScatterSeries';
import { GridlineSeries, GridlineSeriesProps } from '../common/Gridline';
import {
  ZoomPanChangeEvent,
  ChartZoomPanProps,
  ChartZoomPan
} from '../common/ZoomPan';
import css from './ScatterPlot.module.scss';
import { ChartBrushProps, ChartBrush } from '../common/Brush';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers/ChartContainer';
import { CloneElement } from '../common/utils/children';
import memoize from 'memoize-one';

interface ScatterPlotProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the scatter components.
   */
  series: ReactElement<ScatterSeriesProps, typeof ScatterSeries>;

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
   * The chart's zoom pan component.
   */
  zoomPan: ReactElement<ChartZoomPanProps, typeof ChartZoomPan> | null;

  /**
   * Any secondary axis components. Useful for multi-axis charts.
   */
  secondaryAxis?: ReactElement<LinearAxisProps, typeof LinearAxis>[];
}

interface ScatterPlotState {
  zoomDomain?: [ChartDataTypes, ChartDataTypes];
  isZoomed?: boolean;
  preventAnimation?: boolean;
  zoomControlled: boolean;
}

export class ScatterPlot extends Component<ScatterPlotProps, ScatterPlotState> {
  static defaultProps: Partial<ScatterPlotProps> = {
    data: [],
    xAxis: <LinearXAxis type="time" />,
    yAxis: <LinearYAxis type="value" />,
    series: <ScatterSeries />,
    gridlines: <GridlineSeries />,
    brush: null,
    zoomPan: null
  };

  static getDerivedStateFromProps(
    props: ScatterPlotProps,
    state: ScatterPlotState
  ) {
    if (props.zoomPan) {
      const zoom = props.zoomPan.props;
      if (!state.zoomControlled && zoom.domain !== state.zoomDomain) {
        return {
          zoomDomain: zoom.domain,
          isZoomed: !!zoom.domain
        };
      }
    }

    return null;
  }

  timeout: any;

  constructor(props: ScatterPlotProps) {
    super(props);

    const zoom = props.zoomPan ? props.zoomPan.props : { domain: undefined };
    const zoomControlled = !zoom.hasOwnProperty('domain');

    this.state = {
      isZoomed: !!zoom.domain,
      zoomDomain: zoom.domain,
      zoomControlled
    };
  }

  getData = memoize(data => {
    return buildShallowChartData(data) as ChartInternalShallowDataShape[];
  });

  getScales(
    data: ChartInternalShallowDataShape[],
    chartHeight: number,
    chartWidth: number
  ) {
    const { xAxis, yAxis } = this.props;
    const { zoomDomain } = this.state;

    const yScale = getYScale({
      roundDomains: yAxis.props.roundDomains,
      type: yAxis.props.type,
      height: chartHeight,
      data,
      domain: yAxis.props.domain
    });

    const xScale = getXScale({
      width: chartWidth,
      type: xAxis.props.type,
      roundDomains: xAxis.props.roundDomains,
      data,
      domain: zoomDomain || xAxis.props.domain
    });

    return {
      data,
      yScale,
      xScale
    };
  }

  onZoomPan(event: ZoomPanChangeEvent) {
    if (this.state.zoomControlled) {
      this.setState({
        zoomDomain: event.domain,
        isZoomed: event.isZoomed,
        preventAnimation: true
      });

      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.setState({ preventAnimation: false }),
        500
      );
    }
  }

  renderChart(containerProps: ChartContainerChildProps) {
    const { chartHeight, chartWidth, id, updateAxes } = containerProps;
    const {
      series,
      xAxis,
      yAxis,
      gridlines,
      brush,
      zoomPan,
      secondaryAxis
    } = this.props;
    const { isZoomed, zoomDomain, preventAnimation } = this.state;
    const data = this.getData(this.props.data);
    const { yScale, xScale } = this.getScales(data, chartHeight, chartWidth);
    const animated = preventAnimation === true ? false : series.props.animated;

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
        {containerProps.chartSized && (
          <CloneElement<ChartBrushProps>
            element={brush}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
          >
            <CloneElement<ChartZoomPanProps>
              element={zoomPan}
              onZoomPan={bind(this.onZoomPan, this)}
              height={chartHeight}
              width={chartWidth}
              axisType={xAxis.props.type}
              roundDomains={xAxis.props.roundDomains}
              data={data}
              domain={zoomDomain}
            >
              <CloneElement<ScatterSeriesProps>
                element={series}
                id={`area-series-${id}`}
                data={data}
                height={chartHeight}
                width={chartWidth}
                yScale={yScale}
                xScale={xScale}
                isZoomed={isZoomed}
                animated={animated}
              />
            </CloneElement>
          </CloneElement>
        )}
      </Fragment>
    );
  }

  render() {
    const { xAxis, yAxis, id, width, height, margins, className } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        xAxisVisible={isAxisVisible(xAxis.props)}
        yAxisVisible={isAxisVisible(yAxis.props)}
        className={classNames(css.scatterPlot, className)}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
