import React, { FC, Fragment, ReactElement } from 'react';
import {
  RadialAxisTickSeries,
  RadialAxisTickSeriesProps
} from './RadialAxisTickSeries';
import {
  RADIAL_AXIS_ARC_SERIES_DEFAULT_PROPS,
  RadialAxisArcSeries,
  RadialAxisArcSeriesProps
} from './RadialAxisArcSeries';
import { CloneElement } from 'reablocks';
import { getTicks, mergeDefaultProps } from '@/common/utils';

type RadialAxisType = 'value' | 'time' | 'category';

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
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

export const RadialAxis: FC<Partial<RadialAxisProps>> = (props) => {
  const {
    arcs,
    ticks,
    xScale,
    height,
    width,
    innerRadius,
    type,
    startAngle,
    endAngle
  } = mergeDefaultProps(RADIAL_AXIS_DEFAULT_PROPS, props);

  const outerRadius = Math.min(height, width) / 2;

  // TODO: This is a hack to get the ticks in the parent
  // component. This is because the ticks are needed
  // for the arcs's lines.
  const tickValues = getTicks(
    xScale,
    ticks.props.tickValues,
    type as RadialAxisType,
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
          startAngle={startAngle}
          endAngle={endAngle}
        />
      )}
      {ticks && (
        <CloneElement<RadialAxisTickSeriesProps>
          element={ticks}
          scale={xScale}
          type={type as RadialAxisType}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
        />
      )}
    </Fragment>
  );
};

export const RADIAL_AXIS_DEFAULT_PROPS: Partial<RadialAxisProps> = {
  innerRadius: 10,
  type: 'value',
  arcs: <RadialAxisArcSeries />,
  ticks: <RadialAxisTickSeries />,
  startAngle: 0,
  endAngle: 2 * Math.PI
};
