import React, {
  Fragment,
  ReactElement,
  FC,
  useMemo,
  useCallback,
  PropsWithChildren
} from 'react';
import { Gridline, GridlineProps } from './Gridline';
import { getTicks, getMaxTicks } from '@/common/utils/ticks';
import { CloneElement } from 'reablocks';
import {
  LinearAxisProps,
  LinearAxisTickSeries,
  LinearAxisTickSeriesProps,
  LinearXAxisTickSeries,
  LinearYAxisTickSeries
} from '../Axis';
import { GridStripeProps, GridStripe } from './GridStripe';
import { getChildComponent } from '../utils';

type GridLineElement = ReactElement<GridlineProps, typeof Gridline>;
type GridStripeElement = ReactElement<GridStripeProps, typeof GridStripe>;
type GridElement = GridLineElement | GridStripeElement;

export interface GridlineSeriesProps extends PropsWithChildren {
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
  // line,
  // stripe,
  yScale,
  xScale,
  yAxis,
  xAxis,
  height,
  width,
  children
}) => {
  const shouldRenderY = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'y';
  const shouldRenderX = (direction: 'all' | 'x' | 'y') =>
    direction === 'all' || direction === 'x';

  const line = useMemo(
    () =>
      getChildComponent<ReactElement<GridlineProps, typeof Gridline>>(
        children,
        Gridline.name
      ) ?? <Gridline direction="all" />,
    [children]
  );
  const stripe = useMemo(
    () =>
      getChildComponent<ReactElement<GridStripeProps, typeof GridStripe>>(
        children,
        GridStripe.name
      ),
    [children]
  );
  const tickXSeries = useMemo(
    () =>
      getChildComponent<
        ReactElement<LinearAxisTickSeriesProps, typeof LinearXAxisTickSeries>
      >(xAxis.children, LinearXAxisTickSeries.name),
    [xAxis.children]
  );
  const tickYSeries = useMemo(
    () =>
      getChildComponent<
        ReactElement<LinearAxisTickSeriesProps, typeof LinearYAxisTickSeries>
      >(yAxis.children, LinearYAxisTickSeries.name),
    [yAxis.children]
  );

  const { yAxisGrid, xAxisGrid } = useMemo(() => {
    return {
      yAxisGrid: getTicks(
        yScale,
        tickYSeries?.props.tickValues,
        yAxis.type,
        getMaxTicks(tickYSeries?.props.tickSize, height),
        tickYSeries?.props.interval
      ),
      xAxisGrid: getTicks(
        xScale,
        tickXSeries?.props.tickValues,
        xAxis.type,
        getMaxTicks(tickXSeries?.props.tickSize, width),
        tickXSeries?.props.interval
      )
    };
  }, [height, width, xAxis, yAxis, yScale, xScale, tickXSeries, tickYSeries]);

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
          {type === 'line' && (
            <Gridline
              {...element.props}
              index={index}
              scale={scale}
              data={point}
              height={height}
              width={width}
              direction={direction}
            />
          )}
          {type === 'stripe' && (
            <GridStripe
              {...element.props}
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
    [height, width]
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

// GridlineSeries.defaultProps = {
//   line: <Gridline direction="all" />,
//   stripe: null
// };
