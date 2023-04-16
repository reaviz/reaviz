import React, { FC, Fragment, ReactElement } from 'react';
import {
  RadialAxisTickSeries,
  RadialAxisTickSeriesProps
} from './RadialAxisTickSeries';
import {
  RadialAxisArcSeries,
  RadialAxisArcSeriesProps
} from './RadialAxisArcSeries';
import { CloneElement } from 'rdk';

export interface RadialAxisProps {
  /**
   * Height of the axis.
   */
  height: number;

  /**
   * Width of the axis.
   */
  width: number;

  /**
   * Scale to use for the axis.
   */
  xScale: any;

  /**
   * Inner radius of the axis.
   */
  innerRadius: number;

  /**
   * Type of the axis.
   */
  type: 'value' | 'time' | 'category';

  /**
   * Arc element to render.
   */
  arcs: ReactElement<
    RadialAxisArcSeriesProps,
    typeof RadialAxisArcSeries
  > | null;

  /**
   * Tick element to render.
   */
  ticks: ReactElement<
    RadialAxisTickSeriesProps,
    typeof RadialAxisTickSeries
  > | null;
}

export const RadialAxis: FC<Partial<RadialAxisProps>> = ({
  arcs,
  ticks,
  xScale,
  height,
  width,
  innerRadius,
  type
}) => {
  const outerRadius = Math.min(height, width) / 2;

  return (
    <Fragment>
      {arcs && (
        <CloneElement<RadialAxisArcSeriesProps>
          element={arcs}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
        />
      )}
      {ticks && (
        <CloneElement<RadialAxisTickSeriesProps>
          element={ticks}
          scale={xScale}
          type={type}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />
      )}
    </Fragment>
  );
};

RadialAxis.defaultProps = {
  innerRadius: 10,
  type: 'value',
  arcs: <RadialAxisArcSeries />,
  ticks: <RadialAxisTickSeries />
};
