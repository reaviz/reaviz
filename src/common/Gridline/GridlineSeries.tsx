import React, { Fragment, ReactElement, FC, useMemo, useCallback } from 'react';
import { Gridline, GridlineProps } from './Gridline';
import { getTicks, getMaxTicks } from '../utils/ticks';
import { CloneElement } from 'rdk';
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

  const getSkipIndex = useCallback(
    (direction: 'x' | 'y') => {
      if (
        (direction === 'x' &&
          yAxis.axisLine !== null &&
          yAxis.position === 'start') ||
        (direction === 'y' &&
          xAxis.axisLine !== null &&
          xAxis.position === 'end')
      ) {
        return 0;
      }

      return null;
    },
    [xAxis, yAxis]
  );

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

  const renderGroup = useCallback(
    (
      element: GridElement,
      grid,
      scale,
      direction: 'x' | 'y',
      type: 'line' | 'stripe'
    ) => {
      const skipIdx = getSkipIndex(direction);

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
    },
    [getSkipIndex, height, width]
  );

  const renderSeries = useCallback(
    (yAxisGrid, xAxisGrid, element: GridElement, type: 'line' | 'stripe') => {
      return (
        <Fragment>
          {shouldRenderY(element.props.direction) &&
            renderGroup(element, yAxisGrid, yScale, 'y', type)}
          {shouldRenderX(element.props.direction) &&
            renderGroup(element, xAxisGrid, xScale, 'x', type)}
        </Fragment>
      );
    },
    [renderGroup, xScale, yScale]
  );

  return (
    <g style={{ pointerEvents: 'none' }}>
      {line && renderSeries(yAxisGrid, xAxisGrid, line, 'line')}
      {stripe && renderSeries(yAxisGrid, xAxisGrid, stripe, 'stripe')}
    </g>
  );
};

GridlineSeries.defaultProps = {
  line: <Gridline direction="all" />,
  stripe: null
};
