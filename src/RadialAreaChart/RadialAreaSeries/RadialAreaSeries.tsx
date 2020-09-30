import React, { Component, ReactElement } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { getColor, ColorSchemeType, schemes } from '../../common/color';
import { CloneElement } from '../../common/utils/children';
import { RadialAreaProps, RadialArea } from './RadialArea';
import { RadialLine, RadialLineProps } from './RadialLine';
import { RadialInterpolationTypes } from '../../common/utils/interpolation';
import { RadialPointSeries, RadialPointSeriesProps } from './RadialPointSeries';
import {
  TooltipAreaProps,
  TooltipArea,
  TooltipAreaEvent,
} from '../../common/Tooltip';
import bind from 'memoize-bind';

export interface RadialAreaSeriesProps {
  /**
   * Parsed data shape. Set internally by `RadialAreaChart`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Color scheme for the series.
   */
  colorScheme: ColorSchemeType;

  /**
   * The outer radius for the chart center.
   */
  outerRadius: number;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;

  /**
   * D3 scale for X Axis. Set internally by `RadialAreaChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialAreaChart`.
   */
  yScale: any;

  /**
   * Id set internally by `RadialAreaChart`.
   */
  id: string;

  /**
   * interpolation set internally by `RadialAreaChart`.
   */
  interpolation: RadialInterpolationTypes;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Height of the chart. Set internally by `RadialAreaChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `RadialAreaChart`.
   */
  width: number;

  /**
   * Area that is rendered.
   */
  area: ReactElement<RadialAreaProps, typeof RadialArea> | null;

  /**
   * Line that is rendered.
   */
  line: ReactElement<RadialLineProps, typeof RadialLine> | null;

  /**
   * Symbols used to show points.
   */
  symbols: ReactElement<
    RadialPointSeriesProps,
    typeof RadialPointSeries
  > | null;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea>;
}

interface RadialAreaSeriesState {
  activeValues?: any;
}

export class RadialAreaSeries extends Component<
  RadialAreaSeriesProps,
  RadialAreaSeriesState
> {
  static defaultProps: Partial<RadialAreaSeriesProps> = {
    colorScheme: schemes.cybertron[0],
    interpolation: 'smooth',
    animated: true,
    area: <RadialArea />,
    line: <RadialLine />,
    symbols: <RadialPointSeries />,
    tooltip: <TooltipArea />,
  };

  state: RadialAreaSeriesState = {};

  getColor(point: ChartInternalShallowDataShape, index: number) {
    const { colorScheme, data } = this.props;
    return getColor({
      colorScheme,
      data,
      index,
      point,
    });
  }

  onValueEnter(event: TooltipAreaEvent) {
    this.setState({
      activeValues: event.value,
    });
  }

  onValueLeave() {
    this.setState({
      activeValues: undefined,
    });
  }

  renderArea() {
    const {
      area,
      id,
      xScale,
      yScale,
      data,
      interpolation,
      animated,
      innerRadius,
      outerRadius,
    } = this.props;

    return (
      <CloneElement<RadialAreaProps>
        element={area}
        id={`${id}-radial-area`}
        xScale={xScale}
        yScale={yScale}
        animated={animated}
        color={this.getColor.bind(this)}
        data={data}
        interpolation={interpolation}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
      />
    );
  }

  renderLine() {
    const { line, xScale, yScale, data, animated, interpolation } = this.props;

    return (
      <CloneElement<RadialLineProps>
        element={line}
        xScale={xScale}
        yScale={yScale}
        animated={animated}
        interpolation={interpolation}
        color={this.getColor.bind(this)}
        data={data}
      />
    );
  }

  renderSymbols() {
    const { xScale, yScale, animated, area, symbols, data } = this.props;
    const { activeValues } = this.state;

    // Animations are only valid for Area
    const activeSymbols =
      (symbols && symbols.props.activeValues) || activeValues;
    const isAnimated = area !== undefined && animated && !activeSymbols;

    return (
      <CloneElement<RadialPointSeriesProps>
        element={symbols}
        activeValues={activeValues}
        xScale={xScale}
        yScale={yScale}
        data={data}
        animated={isAnimated}
        color={this.getColor.bind(this)}
      />
    );
  }

  render() {
    const {
      area,
      line,
      symbols,
      tooltip,
      xScale,
      yScale,
      data,
      id,
      width,
      height,
      innerRadius,
      outerRadius,
    } = this.props;

    return (
      <CloneElement<TooltipAreaProps>
        element={tooltip}
        xScale={xScale}
        yScale={yScale}
        data={data}
        height={height}
        width={width}
        isRadial={true}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        color={this.getColor.bind(this)}
        onValueEnter={bind(this.onValueEnter, this)}
        onValueLeave={bind(this.onValueLeave, this)}
      >
        <g clipPath={`url(#${id}-path)`}>
          {area && this.renderArea()}
          {line && this.renderLine()}
          {symbols && this.renderSymbols()}
        </g>
      </CloneElement>
    );
  }
}
