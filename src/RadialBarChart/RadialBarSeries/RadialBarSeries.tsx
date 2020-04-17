import React, { Component, Fragment, ReactElement } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { RadialBar, RadialBarProps } from './RadialBar';
import { CloneElement } from '../../common/utils/children';
import { ColorSchemeType, getColor, schemes } from '../../common/color';
import {
  TooltipAreaProps,
  TooltipArea,
  TooltipAreaEvent,
  ChartTooltip
} from '../../common/Tooltip';
import isEqual from 'is-equal';

export interface RadialBarSeriesProps {
  /**
   * Parsed data shape. Set internally by `RadialBarChart`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Color scheme for the series.
   */
  colorScheme: ColorSchemeType;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;

  /**
   * The outer radius for the chart center.
   */
  outerRadius: number;

  /**
   * D3 scale for X Axis. Set internally by `RadialBarChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialBarChart`.
   */
  yScale: any;

  /**
   * Id set internally by `RadialBarChart`.
   */
  id: string;

  /**
   * Bar that is rendered.
   */
  bar: ReactElement<RadialBarProps, typeof RadialBar>;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Height of the chart. Set internally by `RadialBarChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `RadialBarChart`.
   */
  width: number;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea>;
}

interface RadialBarSeriesState {
  activeValues?: any;
}

export class RadialBarSeries extends Component<
  RadialBarSeriesProps,
  RadialBarSeriesState
> {
  static defaultProps: Partial<RadialBarSeriesProps> = {
    colorScheme: schemes.cybertron[0],
    tooltip: <TooltipArea tooltip={<ChartTooltip followCursor={true} />} />,
    bar: <RadialBar />,
    animated: true
  };

  state: RadialBarSeriesState = {};

  onValueEnter(event: TooltipAreaEvent) {
    this.setState({
      activeValues: event.value
    });
  }

  onValueLeave() {
    this.setState({
      activeValues: undefined
    });
  }

  renderBar(point: ChartInternalShallowDataShape, index: number) {
    const {
      innerRadius,
      xScale,
      yScale,
      bar,
      id,
      data,
      animated,
      colorScheme
    } = this.props;
    const { activeValues } = this.state;
    const active = activeValues && data && isEqual(activeValues.x, point.x);

    return (
      <Fragment key={index}>
        <CloneElement<RadialBarProps>
          element={bar}
          id={`radialbar-${id}-${index}`}
          index={index}
          data={point}
          xScale={xScale}
          active={active}
          yScale={yScale}
          innerRadius={innerRadius}
          color={point => getColor({ data, point, index: 0, colorScheme })}
          barCount={data.length}
          animated={animated}
        />
      </Fragment>
    );
  }

  render() {
    const {
      data,
      id,
      innerRadius,
      outerRadius,
      xScale,
      yScale,
      height,
      width,
      tooltip,
      colorScheme
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
        onValueEnter={this.onValueEnter.bind(this)}
        onValueLeave={this.onValueLeave.bind(this)}
        color={(point, index) => getColor({ data, point, index, colorScheme })}
      >
        <g clipPath={`url(#${id}-path)`}>
          {data.map(this.renderBar.bind(this))}
        </g>
      </CloneElement>
    );
  }
}
