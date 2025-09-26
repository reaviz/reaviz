import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment } from 'react';

import type { BarSeriesProps } from '@/BarChart';
import { BarSeries } from '@/BarChart';

import type { LinearGaugeBarProps } from './LinearGaugeBar';
import { LinearGaugeBar } from './LinearGaugeBar';
import type { LinearGaugeOuterBarProps } from './LinearGaugeOuterBar';
import { LinearGaugeOuterBar } from './LinearGaugeOuterBar';

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

export const LinearGaugeSeries: FC<Partial<LinearGaugeSeriesProps>> = ({
  height,
  width,
  bar = <LinearGaugeBar />,
  outerBar = <LinearGaugeOuterBar />,
  isMultiSeries,
  ...rest
}) => (
  <Fragment>
    {!isMultiSeries && outerBar && (
      <CloneElement<LinearGaugeOuterBarProps>
        element={outerBar}
        height={height}
        width={width}
      />
    )}
    <BarSeries
      {...rest}
      layout="horizontal"
      tooltip={null}
      bar={<CloneElement<LinearGaugeOuterBarProps> element={bar} />}
    />
  </Fragment>
);
