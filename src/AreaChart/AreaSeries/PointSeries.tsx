import React, { FC, ReactElement, useCallback } from 'react';
import { ChartInternalShallowDataShape } from '@/common/data';
import { CloneElement } from 'reablocks';
import { ScatterPoint, ScatterSeries, ScatterPointProps } from '@/ScatterPlot';
import css from './PointSeries.module.css';
import isEqual from 'react-fast-compare';

export interface PointSeriesProps {
  /**
   * Determines if the points should be animated or not.
   */
  animated: boolean;

  /**
   * The color of the points.
   */
  color: any;

  /**
   * The active values for the points.
   */
  activeValues?: any;

  /**
   * The data for the points.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * The y-scale for the points.
   */
  yScale: any;

  /**
   * The x-scale for the points.
   */
  xScale: any;

  /**
   * The unique identifier for the points.
   */
  id: string;

  /**
   * The height of the points.
   */
  height: number;

  /**
   * The width of the points.
   */
  width: number;

  /**
   * Determines when the points should be shown. Can be a boolean or one of the following strings: 'hover', 'first', 'last'.
   */
  show: boolean | 'hover' | 'first' | 'last';

  /**
   * The point element.
   */
  point: ReactElement<ScatterPointProps, typeof ScatterPoint>;

  /**
   * The index of the points.
   */
  index: number;
}

export const PointSeries: FC<Partial<PointSeriesProps>> = (props) => {
  const {
    data,
    xScale,
    yScale,
    animated,
    point,
    color,
    height,
    width,
    id,
    activeValues,
    show
  } = { ...POINT_SERIES_DEFAULT_PROPS, ...props };

  const getIsVisible = useCallback(
    (point: ChartInternalShallowDataShape, index: number): boolean => {
      const isActive =
        activeValues && point && isEqual(activeValues.x, point.x);

      if (show === 'hover') {
        return isActive;
      } else if (show === 'first') {
        if (activeValues) {
          return isActive;
        } else {
          return index === 0;
        }
      } else if (show === 'last') {
        if (activeValues) {
          return isActive;
        } else {
          return index === data.length - 1;
        }
      }

      return Boolean(show);
    },
    [activeValues, data.length, show]
  );

  return (
    <ScatterSeries
      height={height}
      width={width}
      id={id}
      animated={animated}
      data={data}
      xScale={xScale}
      yScale={yScale}
      point={
        <CloneElement<ScatterPointProps>
          element={point}
          color={color}
          className={css.point}
          size={4}
          tooltip={null}
          visible={getIsVisible}
        />
      }
    />
  );
};

export const POINT_SERIES_DEFAULT_PROPS = {
  show: 'hover',
  point: <ScatterPoint />
};
