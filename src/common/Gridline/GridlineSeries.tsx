import React, { Fragment, Component, ReactElement } from 'react';
import { Gridline, GridlineProps } from './Gridline';
import { getTicks, getMaxTicks } from '../utils/ticks';
import { CloneElement } from '../utils/children';
import { LinearAxisProps } from '../Axis';
import { GridStripeProps, GridStripe } from './GridStripe';

type GridLineElement = ReactElement<GridlineProps, typeof Gridline>;
type GridStripeElement = ReactElement<GridStripeProps, typeof GridStripe>;
type GridElement = GridLineElement | GridStripeElement;

export interface GridlineSeriesProps {
  /**
   * D3 scale for Y Axis.
   */
  yScale: any;

  /**
   * D3 scale for X Axis.
   */
  xScale: any;

  /**
   * The linear axis component for the Y Axis of the chart.
   */
  yAxis: LinearAxisProps;

  /**
   * The linear axis component for the X Axis of the chart.
   */
  xAxis: LinearAxisProps;

  /**
   * Height of the chart.
   */
  height: number;

  /**
   * Width of the chart.
   */
  width: number;

  /**
   * Gridline that is rendered.
   */
  line: GridLineElement | null;

  /**
   * GridStripe that is rendered.
   */
  stripe: GridStripeElement | null;
}

export class GridlineSeries extends Component<GridlineSeriesProps> {
  static defaultProps: Partial<GridlineSeriesProps> = {
    line: <Gridline />,
    stripe: null
  };

  getGridlines() {
    const { yScale, xScale, yAxis, xAxis, height, width } = this.props;

    return {
      yAxisGrid: getTicks(
        yScale,
        yAxis.tickSeries.props.tickValues,
        yAxis.type,
        getMaxTicks(yAxis.tickSeries.props.tickSize, height),
        yAxis.tickSeries.props.interval
      ),
      xAxisGrid: getTicks(
        xScale,
        xAxis.tickSeries.props.tickValues,
        xAxis.type,
        getMaxTicks(xAxis.tickSeries.props.tickSize, width),
        xAxis.tickSeries.props.interval
      )
    };
  }

  renderSeries(
    yAxisGrid,
    xAxisGrid,
    element: GridElement,
    type: 'line' | 'stripe'
  ) {
    const { xScale, yScale } = this.props;

    return (
      <Fragment>
        {this.shouldRenderY(element.props.direction) &&
          this.renderGroup(element, yAxisGrid, yScale, 'y', type)}
        {this.shouldRenderX(element.props.direction) &&
          this.renderGroup(element, xAxisGrid, xScale, 'x', type)}
      </Fragment>
    );
  }

  shouldRenderY(direction: 'all' | 'x' | 'y') {
    return direction === 'all' || direction === 'y';
  }

  shouldRenderX(direction: 'all' | 'x' | 'y') {
    return direction === 'all' || direction === 'x';
  }

  getSkipIndex(direction: 'x' | 'y') {
    const { yAxis, xAxis } = this.props;

    if (
      (direction === 'x' &&
        yAxis.axisLine !== null &&
        yAxis.position === 'start') ||
      (direction === 'y' && xAxis.axisLine !== null && xAxis.position === 'end')
    ) {
      return 0;
    }

    return null;
  }

  renderGroup(
    element: GridElement,
    grid,
    scale,
    direction: 'x' | 'y',
    type: 'line' | 'stripe'
  ) {
    const { height, width } = this.props;
    const skipIdx = this.getSkipIndex(direction);

    return grid.map((point, index) => (
      <Fragment key={`${type}-${direction}-${index}`}>
        {index !== skipIdx && (
          <CloneElement<GridlineProps | GridStripeProps>
            element={element}
            index={index}
            scale={scale}
            data={point}
            height={height}
            width={width}
            direction={direction}
          />
        )}
      </Fragment>
    ));
  }

  render() {
    const { line, stripe } = this.props;
    const { yAxisGrid, xAxisGrid } = this.getGridlines();

    return (
      <g style={{ pointerEvents: 'none' }}>
        {line && this.renderSeries(yAxisGrid, xAxisGrid, line, 'line')}
        {stripe && this.renderSeries(yAxisGrid, xAxisGrid, stripe, 'stripe')}
      </g>
    );
  }
}
