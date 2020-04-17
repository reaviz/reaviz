import React, { Fragment, ReactElement, FC } from 'react';
import { BarSeries, BarSeriesProps } from '../BarChart';
import { LinearGaugeBar, LinearGaugeBarProps } from './LinearGaugeBar';
import {
  LinearGaugeOuterBar,
  LinearGaugeOuterBarProps
} from './LinearGaugeOuterBar';
import { CloneElement } from '../common/utils';

export interface LinearGaugeSeriesProps extends Omit<BarSeriesProps, 'bar'> {
  /**
   * Height of the chart. Set by `LinearGauge` component.
   */
  height: number;

  /**
   * Width of the chart. Set by `LinearGauge` component.
   */
  width: number;

  /**
   * Whether its a multi-series or not. Set by `LinearGauge` component.
   */
  isMultiSeries: boolean;

  /**
   * Bar element. Only applicable for single series.
   */
  bar: ReactElement<LinearGaugeBarProps, typeof LinearGaugeBar>;

  /**
   * Outer bar element. Only applicable for single series.
   */
  outerBar: ReactElement<LinearGaugeOuterBarProps, typeof LinearGaugeOuterBar>;
}

const defaultProps: Partial<LinearGaugeSeriesProps> = {
  outerBar: <LinearGaugeOuterBar />,
  bar: <LinearGaugeBar />
};

export const LinearGaugeSeries: FC<Partial<LinearGaugeSeriesProps>> = ({
  height,
  width,
  bar,
  outerBar,
  isMultiSeries,
  ...rest
}) => (
  <Fragment>
    {!isMultiSeries && (
      <CloneElement<LinearGaugeOuterBarProps>
        element={outerBar || defaultProps.outerBar}
        height={height}
        width={width}
      />
    )}
    <BarSeries
      {...rest}
      layout="horizontal"
      tooltip={null}
      bar={
        <CloneElement<LinearGaugeOuterBarProps>
          element={bar || defaultProps.bar}
        />
      }
    />
  </Fragment>
);
