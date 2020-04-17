import React, { Component } from 'react';
import bind from 'memoize-bind';
import { Dimensions, getDimension, Margins } from '../utils/dimensions';
import { ResizeEvent, ResizeContainer } from './ResizeContainer';
import { LinearAxisDimensionChanged } from '../Axis';

let chartId = 0;

export interface ChartProps {
  /**
   * Id of the chart.
   */
  id?: string;

  /**
   * Width of the chart. If not provided will autosize.
   */
  width?: number;

  /**
   * Height of the chart. If not provided will autosize.
   */
  height?: number;

  /**
   * Margins for the chart.
   */
  margins?: Margins;

  /**
   * Classnames for the chart.
   */
  className?: any;

  /**
   * Additional css styles.
   */
  style?: any;

  /**
   * Center the chart. Used mainly internally.
   */
  center?: boolean;

  /**
   * Center chart on X Axis only. Used mainly internally.
   */
  centerX?: boolean;

  /**
   * Center chart on Y Axis only. Used mainly internally.
   */
  centerY?: boolean;
}

export interface ChartContainerProps extends ChartProps {
  /**
   * Internal property to identify if the xAxis is visible.
   */
  xAxisVisible?: boolean;

  /**
   * Internal property to identify if the xAxis is visible.
   */
  yAxisVisible?: boolean;

  /**
   * Children elements to recieve the calculated props.
   */
  children: (props: ChartContainerChildProps) => any;
}

export interface ChartContainerChildProps extends ChartContainerState {
  updateAxes: (e) => void;
}

export interface ChartContainerState extends Dimensions {
  id: string;
  chartSized?: boolean;
  yAxisSized?: boolean;
  xAxisSized?: boolean;
}

interface UpdateSizeProps {
  chartSized?: boolean;
  xAxisSized?: boolean;
  yAxisSized?: boolean;
  yOffset?: number;
  xOffset?: number;
  height?: number;
  width?: number;
}

export class ChartContainer extends Component<
  ChartContainerProps,
  ChartContainerState
> {
  static defaultProps: Partial<ChartContainerProps> = {
    margins: 10
  };

  constructor(props: ChartContainerProps) {
    super(props);

    const { margins, height, width } = props;
    this.state = {
      id: (chartId++).toString(),
      ...getDimension({
        margins,
        height,
        width,
        yOffset: 0,
        xOffset: 0
      })
    };
  }

  componentDidUpdate(nextProps: ChartContainerProps) {
    const { height, width } = this.props;
    if (width !== nextProps.width || height !== nextProps.height) {
      this.updateSize({
        height: nextProps.height,
        width: nextProps.width
      });
    }
  }

  onResize(event: ResizeEvent) {
    this.updateSize({
      ...event,
      chartSized: true
    });
  }

  updateAxes(
    orientation: 'horizontal' | 'vertical',
    event: LinearAxisDimensionChanged
  ) {
    const propToken =
      orientation === 'horizontal' ? 'xAxisSized' : 'yAxisSized';

    this.updateSize({
      yOffset: event.height,
      xOffset: event.width,
      [propToken]: true
    });
  }

  updateSize(props: UpdateSizeProps) {
    this.setState(prev => ({
      chartSized: props.chartSized || prev.chartSized,
      // TODO: @amcdnl refactor this be x0Offset/x1Offset/etc
      xAxisSized: props.xAxisSized || prev.xAxisSized,
      yAxisSized: props.yAxisSized || prev.yAxisSized,
      ...getDimension({
        margins: this.props.margins,
        height: props.height || prev.height,
        width: props.width || prev.width,
        yOffset: props.yOffset || prev.yOffset,
        xOffset: props.xOffset || prev.xOffset
      })
    }));
  }

  getChartSized() {
    const { height, width, xAxisVisible, yAxisVisible } = this.props;
    const { xAxisSized, yAxisSized, chartSized } = this.state;

    if ((!height || !width) && !chartSized) {
      return false;
    }

    // TODO: @amcdnl refactor this to account for 0-2 axises on x/y
    if (xAxisVisible && !xAxisSized) {
      return false;
    }

    if (yAxisVisible && !yAxisSized) {
      return false;
    }

    return true;
  }

  render() {
    const { className, children, center, centerX, centerY, style } = this.props;
    const { xMargin, yMargin, width, height } = this.state;
    const id = this.props.id || this.state.id;
    const chartSized = this.getChartSized();
    const childProps: ChartContainerChildProps = {
      ...this.state,
      chartSized,
      id,
      updateAxes: bind(this.updateAxes, this)
    };

    const translateX = center || centerX ? width / 2 : xMargin;
    const translateY = center || centerY ? height / 2 : yMargin;

    return (
      <ResizeContainer
        onSize={bind(this.onResize, this)}
        height={this.props.height}
        width={this.props.width}
      >
        {height && width && (
          <svg
            width={width}
            height={height}
            className={className}
            style={style}
          >
            <g transform={`translate(${translateX}, ${translateY})`}>
              {children(childProps)}
            </g>
          </svg>
        )}
      </ResizeContainer>
    );
  }
}
