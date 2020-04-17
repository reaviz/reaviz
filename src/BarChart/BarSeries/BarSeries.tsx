import React, { Fragment, Component, ReactElement, createRef } from 'react';
import { Bar, BarProps, BarType } from './Bar';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape,
  Direction
} from '../../common/data';
import { getColor, ColorSchemeType } from '../../common/color';
import { CloneElement } from '../../common/utils/children';
import {
  TooltipAreaProps,
  TooltipArea,
  ChartTooltip,
  TooltipAreaEvent
} from '../../common/Tooltip';

type BarElement = ReactElement<BarProps, typeof Bar>;

export interface BarSeriesProps {
  /**
   * Parsed data shape. Set internally by `BarChart`.
   */
  data: ChartInternalDataShape[];

  /**
   * Id of the bar chart. Set internally by `BarChart`.
   */
  id: string;

  /**
   * D3 scale for X Axis. Set internally by `BarChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `BarChart`.
   */
  yScale: any;

  /**
   * D3 scale for X Multi-Group Axis. Set internally by `BarChart`.
   */
  xScale1: any;

  /**
   * Bar element.
   */
  bar: BarElement | BarElement[];

  /**
   * Type of the chart.
   */
  type: BarType;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Whether the chart is animated or not.
   */
  animated: boolean;

  /**
   * Amount of padding between each bar.
   */
  padding: number;

  /**
   * Amount of padding between each group.
   */
  groupPadding: number;

  /**
   * Whether the chart is categorical or not. Set internally by `BarChart`.
   */
  isCategorical: boolean;

  /**
   * Direction of the chart
   */
  layout: Direction;

  /**
   * The size of each bin/bucket in the bar chart.
   */
  binSize?: number;

  /**
   * Height of the chart. Set internally by `BarChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `BarChart`.
   */
  width: number;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea> | null;
}

interface BarSeriesState {
  activeValues?: any;
}

export class BarSeries extends Component<BarSeriesProps, BarSeriesState> {
  static defaultProps: Partial<BarSeriesProps> = {
    type: 'standard',
    padding: 0.1,
    groupPadding: 16,
    animated: true,
    tooltip: (
      <TooltipArea
        tooltip={
          <ChartTooltip
            followCursor={true}
            modifiers={{
              offset: '5px, 5px'
            }}
          />
        }
      />
    ),
    colorScheme: 'cybertron',
    bar: <Bar />,
    layout: 'vertical'
  };

  state: BarSeriesState = {};
  ref = createRef<TooltipArea>();

  getIsMulti() {
    const { type } = this.props;

    return (
      type === 'grouped' ||
      type === 'stacked' ||
      type === 'marimekko' ||
      type === 'stackedNormalized' ||
      type === 'stackedDiverging'
    );
  }

  /**
   * Get the translation for the bar group.
   */
  getTransform(data: ChartInternalNestedDataShape) {
    const { xScale, yScale, type, layout } = this.props;

    let xPos = 0;
    let yPos = 0;
    if (type !== 'marimekko') {
      if (layout === 'vertical') {
        const val = xScale(data.key);
        xPos = val;
      } else {
        const val = yScale(data.key);
        yPos = val;
      }
    }

    return `translate(${xPos}, ${yPos})`;
  }

  getColor(point, index) {
    const { colorScheme, data, layout } = this.props;
    const isMultiSeries = this.getIsMulti();

    let key = 'key';
    if (isMultiSeries) {
      if (layout === 'vertical') {
        key = 'x';
      } else {
        key = 'y';
      }
    }

    // histograms...
    if (point[key] === undefined) {
      key = 'x0';
    }

    return getColor({
      colorScheme,
      point,
      index,
      data,
      isMultiSeries,
      attribute: key
    });
  }

  onMouseMove(event) {
    // Manuallly call mouse move so we don't have to kill bar pointer events
    this.ref.current?.onMouseMove(event);
  }

  renderBar(
    data: ChartInternalShallowDataShape,
    barIndex: number,
    barCount: number,
    groupIndex?: number
  ) {
    const {
      xScale1,
      bar,
      padding,
      animated,
      isCategorical,
      layout,
      type,
      id
    } = this.props;
    const { activeValues } = this.state;
    const active = activeValues && activeValues.x === data.key;

    const isVertical = layout === 'vertical';
    let yScale = this.props.yScale;
    let xScale = this.props.xScale;

    if (xScale1) {
      if (isVertical) {
        xScale = xScale1;
      } else {
        yScale = xScale1;
      }
    }

    // Histograms dont have keys
    let key = barIndex.toString();
    if (data.key) {
      key = `${data.key!.toString()}-${groupIndex}-${barIndex}`;
    }

    let barElements = Array.isArray(bar) ? bar[barIndex] : bar;
    if (!bar) {
      barElements = <Bar />;
    }

    return (
      <Fragment key={key}>
        <CloneElement<BarProps>
          element={barElements}
          id={`${id}-bar-${groupIndex}-${barIndex}`}
          animated={animated}
          active={active}
          xScale={xScale}
          xScale1={xScale1}
          yScale={yScale}
          padding={padding}
          barCount={barCount}
          groupIndex={groupIndex}
          barIndex={barIndex}
          data={data}
          isCategorical={isCategorical}
          color={this.getColor.bind(this)}
          layout={layout}
          type={type}
          onMouseMove={this.onMouseMove.bind(this)}
        />
      </Fragment>
    );
  }

  /**
   * Get the bar group.
   */
  renderBarGroup(
    data: ChartInternalShallowDataShape[],
    barCount: number,
    groupIndex?: number
  ) {
    return (
      <Fragment>
        {data.map((barData, barIndex) =>
          this.renderBar(barData, barIndex, barCount, groupIndex)
        )}
      </Fragment>
    );
  }

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

  render() {
    const { data, tooltip, xScale, yScale, height, width, layout } = this.props;
    const isMulti = this.getIsMulti();

    return (
      <CloneElement<TooltipAreaProps>
        element={tooltip}
        childRef={this.ref}
        xScale={xScale}
        yScale={yScale}
        data={data}
        height={height}
        width={width}
        inverse={false}
        isHorizontal={layout === 'horizontal'}
        color={this.getColor.bind(this)}
        onValueEnter={this.onValueEnter.bind(this)}
        onValueLeave={this.onValueLeave.bind(this)}
      >
        {isMulti &&
          (data as ChartInternalNestedDataShape[]).map((groupData, index) => (
            <g
              transform={this.getTransform(groupData)}
              key={`bar-group-${index}`}
            >
              {this.renderBarGroup(
                groupData.data as ChartInternalShallowDataShape[],
                data.length,
                index
              )}
            </g>
          ))}
        {!isMulti &&
          this.renderBarGroup(
            data as ChartInternalShallowDataShape[],
            data.length
          )}
      </CloneElement>
    );
  }
}
