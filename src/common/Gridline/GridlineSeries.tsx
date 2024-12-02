import React, { Fragment, ReactElement, FC, useMemo, useCallback } from 'react';
import { Gridline, GridlineDefaultProps, GridlineProps } from './Gridline';
import { getTicks, getMaxTicks } from '@/common/utils/ticks';
import { CloneElement } from 'reablocks';
import { LinearAxisProps, LinearYAxisDefaultProps } from '../Axis';
import { GridStripeProps, GridStripe } from './GridStripe';

type GridLineElement = ReactElement<GridlineProps, typeof Gridline>;
type GridStripeElement = ReactElement<GridStripeProps, typeof GridStripe>;
type GridElement = GridLineElement | GridStripeElement;
type GridElementProps = GridlineProps | GridStripeProps;

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

export const GridlineSeries: FC<Partial<GridlineSeriesProps>> = (props) => {
  const { line, stripe, yScale, xScale, yAxis, xAxis, height, width } = {
    ...GridlineSeriesDefaultProps,
    ...props
  };
  const lineProps = useMemo(
    () => ({ ...GridlineDefaultProps, ...line.props }),
    [line.props]
  );
  const stripeProps = useMemo(
    () => ({ ...GridlineDefaultProps, ...line.props }),
    [line.props]
  );
  console.log('[log] xAxis1', xAxis);
  console.log('[log] yAxis1', yAxis);

  const shouldRenderY = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'y';
  const shouldRenderX = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'x';

  const { yAxisGrid, xAxisGrid } = useMemo(() => {
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
  }, [height, width, xAxis, yAxis, yScale, xScale]);
  console.log('[log] yAxisGrid', yAxisGrid);

  const renderGroup = useCallback(
    (
      element: GridElement,
      grid,
      scale,
      direction: 'x' | 'y',
      type: 'line' | 'stripe'
    ) => {
      console.log('[log] direction', direction, grid);
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

export const GridlineSeriesDefaultProps = {
  line: <Gridline direction="all" />,
  stripe: null
};
