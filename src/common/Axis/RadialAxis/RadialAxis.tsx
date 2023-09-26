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
import { getTicks } from '../../utils';

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

  /**
   * Whether to render a semicircle or a full circle
   * Renders a full circle by default
   */
  isSemiCircle?: boolean;
}

export const RadialAxis: FC<Partial<RadialAxisProps>> = ({
  arcs,
  ticks,
  xScale,
  height,
  width,
  innerRadius,
  type,
  isSemiCircle
}) => {
  const outerRadius = Math.min(height, width) / 2;

  // TODO: This is a hack to get the ticks in the parent
  // component. This is because the ticks are needed
  // for the arcs's lines.
  const tickValues = getTicks(
    xScale,
    ticks.props.tickValues,
    type,
    ticks.props.count,
    ticks.props.interval || ticks.props.count
  );

  return (
    <Fragment>
      {arcs && (
        <CloneElement<RadialAxisArcSeriesProps>
          element={arcs}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          tickValues={tickValues}
          isSemiCircle={isSemiCircle}
        />
      )}
      {ticks && (
        <CloneElement<RadialAxisTickSeriesProps>
          element={ticks}
          scale={xScale}
          type={type}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          isSemiCircle={isSemiCircle}
        />
      )}
    </Fragment>
  );
};

RadialAxis.defaultProps = {
  innerRadius: 10,
  type: 'value',
  arcs: <RadialAxisArcSeries />,
  ticks: <RadialAxisTickSeries />,
  isSemiCircle: false
};
