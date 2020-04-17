import React, { Fragment, Component, ReactElement } from 'react';
import classNames from 'classnames';
import bind from 'memoize-bind';
import { AreaSeries, AreaChartTypes, AreaSeriesProps } from './AreaSeries';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxis,
  LinearYAxis,
  LinearAxis
} from '../common/Axis/LinearAxis';
import { getXScale, getYScale } from '../common/scales';
import { GridlineSeries, GridlineSeriesProps } from '../common/Gridline';
import {
  ChartDataShape,
  ChartInternalDataShape,
  ChartNestedDataShape,
  ChartDataTypes,
  buildStackData,
  buildShallowChartData,
  ChartShallowDataShape,
  buildNestedChartData
} from '../common/data';
import css from './AreaChart.module.scss';
import { ChartBrushProps, ChartBrush } from '../common/Brush';
import {
  ZoomPanChangeEvent,
  ChartZoomPanProps,
  ChartZoomPan
} from '../common/ZoomPan';
import {
  ChartContainerChildProps,
  ChartContainer,
  ChartProps
} from '../common/containers/ChartContainer';
import { CloneElement } from '../common/utils/children';
import memoize from 'memoize-one';

export interface AreaChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartDataShape[];

  /**
   * The series component that renders the area/line/circles components.
   */
  series: ReactElement<AreaSeriesProps, typeof AreaSeries>;

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

interface AreaChartState {
  zoomDomain?: [ChartDataTypes, ChartDataTypes];
  preventAnimation?: boolean;
  isZoomed: boolean;
  zoomControlled: boolean;
}

export class AreaChart extends Component<AreaChartProps, AreaChartState> {
  static defaultProps: Partial<AreaChartProps> = {
    data: [],
    xAxis: <LinearXAxis type="time" />,
    yAxis: <LinearYAxis type="value" />,
    series: <AreaSeries />,
    gridlines: <GridlineSeries />,
    brush: null,
    zoomPan: null
  };

  static getDerivedStateFromProps(
    props: AreaChartProps,
    state: AreaChartState
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

  constructor(props: AreaChartProps) {
    super(props);

    const zoom: any = props.zoomPan ? props.zoomPan.props : {};
    const zoomControlled = !zoom.hasOwnProperty('domain');

    this.state = {
      zoomDomain: zoom.domain,
      isZoomed: !!zoom.domain,
      zoomControlled
    };
  }

  getData = memoize((data: ChartDataShape[], type: AreaChartTypes) => {
    if (type === 'stacked' || type === 'stackedNormalized') {
      return buildStackData(
        data as ChartNestedDataShape[],
        type === 'stackedNormalized'
      );
    } else if (type === 'grouped') {
      return buildNestedChartData(data as ChartNestedDataShape[], true);
    } else {
      return buildShallowChartData(data as ChartShallowDataShape[]);
    }
  });

  getScales(
    data: ChartInternalDataShape[],
    chartWidth: number,
    chartHeight: number,
    isMultiSeries: boolean
  ) {
    const { zoomDomain } = this.state;
    const { yAxis, xAxis } = this.props;

    const xScale = getXScale({
      width: chartWidth,
      type: xAxis.props.type,
      roundDomains: xAxis.props.roundDomains,
      data,
      domain: zoomDomain || xAxis.props.domain,
      isMultiSeries
    });

    const yScale = getYScale({
      roundDomains: yAxis.props.roundDomains,
      type: yAxis.props.type,
      height: chartHeight,
      data,
      domain: yAxis.props.domain,
      isMultiSeries
    });

    return { xScale, yScale };
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
      yAxis,
      xAxis,
      gridlines,
      brush,
      zoomPan,
      secondaryAxis
    } = this.props;
    const { zoomDomain, preventAnimation, isZoomed } = this.state;

    const seriesType = series.props.type;
    const isMultiSeries =
      seriesType === 'stacked' ||
      seriesType === 'stackedNormalized' ||
      seriesType === 'grouped';
    const data = this.getData(this.props.data, seriesType);
    const { xScale, yScale } = this.getScales(
      data,
      chartWidth,
      chartHeight,
      isMultiSeries
    );
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
              <CloneElement<AreaSeriesProps>
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
    const {
      xAxis,
      yAxis,
      id,
      width,
      height,
      margins,
      className,
      series
    } = this.props;

    return (
      <ChartContainer
        id={id}
        width={width}
        height={height}
        margins={margins}
        xAxisVisible={isAxisVisible(xAxis.props)}
        yAxisVisible={isAxisVisible(yAxis.props)}
        className={classNames(css.areaChart, className, series.type)}
      >
        {props => this.renderChart(props)}
      </ChartContainer>
    );
  }
}
