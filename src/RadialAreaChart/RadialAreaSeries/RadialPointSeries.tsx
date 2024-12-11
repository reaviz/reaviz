import React, { useCallback, ReactElement, FC } from 'react';
import {
  RadialScatterSeries,
  RadialScatterPoint,
  RadialScatterPointProps
} from '@/RadialScatterPlot';
import { ChartInternalShallowDataShape } from '@/common/data';
import { CloneElement } from 'reablocks';
import isEqual from 'react-fast-compare';

export interface RadialPointSeriesProps {
  /**
   * Whether the points are animated or not.
   */
  animated: boolean;

  /**
   * Color scheme.
   */
  color: any;

  /**
   * Index of the area in the series. Set internally by `RadialAreaSeries`.
   */
  index: number;

  /**
   * Active values set by parent.
   */
  activeValues?: any;

  /**
   * Parsed data object.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * D3 X-Scale.
   */
  yScale: any;

  /**
   * D3 Y-Scale.
   */
  xScale: any;

  /**
   * When to show the point.
   */
  show: boolean | 'hover' | 'first' | 'last';

  /**
   * Point react component.
   */
  point: ReactElement<RadialScatterPointProps, typeof RadialScatterPoint>;
}

export const RadialPointSeries: FC<Partial<RadialPointSeriesProps>> = (
  props
) => {
  const { data, xScale, yScale, animated, color, activeValues, show, point } = {
    ...RADIAL_POINT_SERIES_DEFAULT_PROPS,
    ...props
  };

  const isVisible = useCallback(
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
          return index === data!.length - 1;
        }
      }

      return Boolean(show);
    },
    [data, activeValues, show]
  );

  return (
    <RadialScatterSeries
      animated={animated}
      data={data}
      xScale={xScale}
      yScale={yScale}
      point={
        <CloneElement<RadialScatterPointProps>
          element={point}
          color={color}
          tooltip={null}
          visible={isVisible}
        />
      }
    />
  );
};

export const RADIAL_POINT_SERIES_DEFAULT_PROPS = {
  show: 'hover',
  point: <RadialScatterPoint />
};
