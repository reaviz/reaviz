import React, { Fragment, Component, ReactElement } from 'react';
import { PointSeries, PointSeriesProps } from './PointSeries';
import { Area, AreaProps } from './Area';
import { MarkLine, MarkLineProps } from '../../common/MarkLine';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape
} from '../../common/data';
import { CloneElement } from '../../common/utils/children';
import {
  TooltipArea,
  TooltipAreaProps,
  TooltipAreaEvent
} from '../../common/Tooltip';
import { Line, LineProps } from './Line';
import { InterpolationTypes } from '../../common/utils/interpolation';
import { getColor, ColorSchemeType } from '../../common/color';
import bind from 'memoize-bind';

export type AreaChartTypes =
  | 'standard'
  | 'grouped'
  | 'stacked'
  | 'stackedNormalized';

export interface AreaSeriesProps {
  /**
   * Id set internally by `AreaChart`.
   */
  id: string;

  /**
   * D3 scale for X Axis. Set internally by `AreaChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `AreaChart`.
   */
  yScale: any;

  /**
   * Parsed data shape. Set internally by `AreaChart`.
   */
  data: ChartInternalDataShape[];

  /**
   * Height of the chart. Set internally by `AreaChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `AreaChart`.
   */
  width: number;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Type of area chart to render.
   */
  type: AreaChartTypes;

  /**
   * Interpolation type for the area/line.
   */
  interpolation: InterpolationTypes;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea>;

  /**
   * Markline for the chart.
   */
  markLine: ReactElement<MarkLineProps, typeof MarkLine> | null;

  /**
   * Symbols used to show points.
   */
  symbols: ReactElement<PointSeriesProps, typeof PointSeries> | null;

  /**
   * Line that is rendered.
   */
  line: ReactElement<LineProps, typeof Line> | null;

  /**
   * Area that is rendered.
   */
  area: ReactElement<AreaProps, typeof Area> | null;

  /**
   * Color scheme for the series.
   */
  colorScheme: ColorSchemeType;

  /**
   * Whether the chart has been zoomed or not. Set internally by `AreaChart`.
   */
  isZoomed: boolean;
}

interface AreaSeriesState {
  activeValues?: any;
  activePoint?: number;
}

// For area charts, often symbols exceed the area
// and we want to add a little bit of padding to prevent clipping
const PADDING = 25;
const HALF_PADDING = PADDING / 2;

export class AreaSeries extends Component<AreaSeriesProps, AreaSeriesState> {
  static defaultProps: Partial<AreaSeriesProps> = {
    colorScheme: 'cybertron',
    animated: true,
    interpolation: 'linear',
    type: 'standard',
    line: <Line />,
    area: <Area />,
    markLine: <MarkLine />,
    tooltip: <TooltipArea />,
    symbols: <PointSeries />
  };

  state: AreaSeriesState = {};

  getColor(point, index) {
    const { colorScheme, data } = this.props;
    const { activeValues } = this.state;
    const key = Array.isArray(point) ? point[0].key : point.key;

    return getColor({
      data,
      colorScheme,
      active: activeValues,
      point,
      index,
      key
    });
  }

  onValueEnter(event: TooltipAreaEvent) {
    this.setState({
      activePoint: event.pointX,
      activeValues: event.value
    });
  }

  onValueLeave() {
    this.setState({
      activePoint: undefined,
      activeValues: undefined
    });
  }

  renderArea(data: ChartInternalShallowDataShape[], index = 0) {
    const {
      id,
      width,
      xScale,
      yScale,
      area,
      line,
      interpolation,
      animated
    } = this.props;

    return (
      <Fragment>
        {line && (
          <CloneElement<LineProps>
            element={line}
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            index={index}
            hasArea={area !== null}
            animated={animated}
            interpolation={interpolation}
            color={this.getColor.bind(this)}
          />
        )}
        {area && (
          <CloneElement<AreaProps>
            element={area}
            id={`${id}-area-${index}`}
            xScale={xScale}
            yScale={yScale}
            data={data}
            index={index}
            animated={animated}
            interpolation={interpolation}
            color={this.getColor.bind(this)}
          />
        )}
      </Fragment>
    );
  }

  renderSymbols(data: ChartInternalShallowDataShape[], index = 0) {
    const {
      xScale,
      yScale,
      symbols,
      id,
      height,
      width,
      animated,
      area
    } = this.props;
    const { activeValues } = this.state;

    const visible = symbols !== null;
    const activeSymbols =
      (symbols && symbols.props.activeValues) || activeValues;

    // Animations are only valid for Area
    const isAnimated = area !== undefined && animated && !activeSymbols;

    return (
      <Fragment>
        {visible && (
          <CloneElement<PointSeriesProps>
            element={symbols}
            key={`point-series-${id}`}
            id={id}
            height={height}
            width={width}
            activeValues={activeSymbols}
            xScale={xScale}
            yScale={yScale}
            index={index}
            data={data}
            animated={isAnimated}
            color={() => this.getColor(data, index)}
          />
        )}
      </Fragment>
    );
  }

  renderMarkLine() {
    const { height, markLine } = this.props;
    const { activePoint, activeValues } = this.state;

    return (
      <Fragment>
        {activeValues && markLine && (
          <CloneElement<MarkLineProps>
            element={markLine}
            height={height}
            pointX={activePoint}
          />
        )}
      </Fragment>
    );
  }

  renderSingleSeries(data: ChartInternalShallowDataShape[]) {
    return (
      <Fragment>
        {this.renderArea(data)}
        {this.renderMarkLine()}
        {this.renderSymbols(data)}
      </Fragment>
    );
  }

  renderMultiSeries(data: ChartInternalNestedDataShape[]) {
    return (
      <Fragment>
        {data
          .map((point, index) => (
            <Fragment key={`${point.key!.toString()}`}>
              {this.renderArea(point.data, index)}
            </Fragment>
          ))
          .reverse()}
        {this.renderMarkLine()}
        {data
          .map((point, index) => (
            <Fragment key={`${point.key!.toString()}`}>
              {this.renderSymbols(point.data, index)}
            </Fragment>
          ))
          .reverse()}
      </Fragment>
    );
  }

  render() {
    const {
      data,
      height,
      id,
      width,
      isZoomed,
      tooltip,
      xScale,
      yScale,
      type
    } = this.props;
    const isMulti =
      type === 'grouped' || type === 'stacked' || type === 'stackedNormalized';

    return (
      <Fragment>
        <defs>
          <clipPath id={`${id}-path`}>
            <rect
              width={isZoomed ? width : width + PADDING}
              height={height + PADDING}
              x={isZoomed ? 0 : -HALF_PADDING}
              y={-HALF_PADDING}
            />
          </clipPath>
        </defs>
        <CloneElement<TooltipAreaProps>
          element={tooltip}
          xScale={xScale}
          yScale={yScale}
          data={data}
          height={height}
          width={width}
          color={this.getColor.bind(this)}
          onValueEnter={bind(this.onValueEnter, this)}
          onValueLeave={bind(this.onValueLeave, this)}
        >
          <g clipPath={`url(#${id}-path)`}>
            {isMulti &&
              this.renderMultiSeries(data as ChartInternalNestedDataShape[])}
            {!isMulti &&
              this.renderSingleSeries(data as ChartInternalShallowDataShape[])}
          </g>
        </CloneElement>
      </Fragment>
    );
  }
}
