import React, { Fragment, ReactElement, FC, useMemo, useCallback } from 'react';
import { Gridline, GridlineProps } from './Gridline';
import { getTicks, getMaxTicks } from '@/common/utils/ticks';
import { CloneElement } from 'reablocks';
import {
  LINEAR_X_AXIS_TICK_SERIES_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS,
  LinearAxisProps
} from '../Axis';
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

export const GridlineSeries: FC<Partial<GridlineSeriesProps>> = ({
  line,
  stripe,
  yScale,
  xScale,
  yAxis,
  xAxis,
  height,
  width
}) => {
  const shouldRenderY = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'y';
  const shouldRenderX = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'x';

  const { yAxisGrid, xAxisGrid } = useMemo(() => {
    const xTickSeriesProps = {
      ...LINEAR_X_AXIS_TICK_SERIES_DEFAULT_PROPS,
      ...xAxis.tickSeries.props
    };
    const yTickSeriesProps = {
      ...LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS,
      ...yAxis.tickSeries.props
    };

    return {
      yAxisGrid: getTicks(
        yScale,
        yTickSeriesProps.tickValues,
        yAxis.type,
        getMaxTicks(yTickSeriesProps.tickSize, height),
        yTickSeriesProps.interval
      ),
      xAxisGrid: getTicks(
        xScale,
        xTickSeriesProps.tickValues,
        xAxis.type,
        getMaxTicks(xTickSeriesProps.tickSize, width),
        xTickSeriesProps.interval
      )
    };
  }, [height, width, xAxis, yAxis, yScale, xScale]);

  const renderGroup = useCallback(
    (
      element: GridElement,
      grid,
      scale,
      direction: 'x' | 'y',
      type: 'line' | 'stripe'
    ) => {
      return grid.map((point, index) => (
        <Fragment key={`${type}-${direction}-${index}`}>
          <CloneElement<GridlineProps | GridStripeProps>
            element={element}
            index={index}
            scale={scale}
            data={point}
            height={height}
            width={width}
            direction={direction}
          />
        </Fragment>
      ));
    },
    [height, width]
  );

  const renderSeries = useCallback(
    (
      yAxisGrid,
      xAxisGrid,
      element: GridElement,
      direction: 'x' | 'y' | 'all',
      type: 'line' | 'stripe'
    ) => {
      return (
        <Fragment>
          {shouldRenderY(direction) &&
            renderGroup(element, yAxisGrid, yScale, 'y', type)}
          {shouldRenderX(direction) &&
            renderGroup(element, xAxisGrid, xScale, 'x', type)}
        </Fragment>
      );
    },
    [renderGroup, xScale, yScale]
  );

  return (
    <g style={{ pointerEvents: 'none' }}>
      {line &&
        renderSeries(yAxisGrid, xAxisGrid, line, line.props.direction, 'line')}
      {stripe &&
        renderSeries(
          yAxisGrid,
          xAxisGrid,
          stripe,
          stripe.props.direction,
          'stripe'
        )}
    </g>
  );
};

GridlineSeries.defaultProps = {
  line: <Gridline direction="all" />,
  stripe: null
};
