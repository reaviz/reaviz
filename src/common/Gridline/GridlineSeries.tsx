import React, { Fragment, ReactElement, FC, useMemo, useCallback } from 'react';
import { Gridline, GRID_LINE_DEFAULT_PROPS, GridlineProps } from './Gridline';
import { getTicks, getMaxTicks } from '@/common/utils/ticks';
import { CloneElement } from 'reablocks';
import {
  LINEAR_X_AXIS_TICK_SERIES_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS,
  LinearAxisProps,
  LinearAxisTickSeries
} from '../Axis';
import {
  GridStripeProps,
  GridStripe,
  GRID_STRIPE_DEFAULT_PROPS
} from './GridStripe';
import { getChildComponent } from '../utils';

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
  line = <Gridline direction="all" />,
  stripe,
  yScale,
  xScale,
  yAxis,
  xAxis,
  height,
  width
}) => {
  const lineProps = useMemo(
    () => ({ ...GRID_LINE_DEFAULT_PROPS, ...line.props }),
    [line.props]
  );
  const stripeProps = useMemo(
    () => ({ ...GRID_STRIPE_DEFAULT_PROPS, ...(stripe?.props ?? {}) }),
    [stripe?.props]
  );

  const shouldRenderY = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'y';
  const shouldRenderX = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'x';

  const xAxisTickSeries = getChildComponent(
    xAxis.children,
    LinearAxisTickSeries.name
  );
  const yAxisTickSeries = getChildComponent(
    yAxis.children,
    LinearAxisTickSeries.name
  );
  const { yAxisGrid, xAxisGrid } = useMemo(() => {
    const xTickSeriesProps = {
      ...LINEAR_X_AXIS_TICK_SERIES_DEFAULT_PROPS,
      ...xAxisTickSeries?.props
    };
    const yTickSeriesProps = {
      ...LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS,
      ...yAxisTickSeries?.props
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
        renderSeries(yAxisGrid, xAxisGrid, line, lineProps.direction, 'line')}
      {stripe &&
        renderSeries(
          yAxisGrid,
          xAxisGrid,
          stripe,
          stripeProps.direction,
          'stripe'
        )}
    </g>
  );
};
