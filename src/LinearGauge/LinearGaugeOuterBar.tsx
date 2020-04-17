import React, { FC } from 'react';

export interface LinearGaugeOuterBarProps extends SVGRect {
  /**
   * Height of the chart. Set by `LinearGauge` component.
   */
  height: number;

  /**
   * Width of the chart. Set by `LinearGauge` component.
   */
  width: number;

  /**
   * Fill for the bar element.
   */
  fill: string;
}

export const LinearGaugeOuterBar: FC<Partial<LinearGaugeOuterBarProps>> = ({
  height,
  width,
  fill,
  ...rest
}) => <rect {...rest} fill={fill || '#484848'} width={Math.max(width!, 0)} height={Math.max(height!, 0)} />;
