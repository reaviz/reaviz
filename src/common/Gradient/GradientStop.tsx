import React, { FC } from 'react';

export interface GradientStopProps {
  /**
   * SVG `offset` attribute for the stop.
   */
  offset: number | string;

  /**
   * SVG `stop-opacity` attribute for the stop.
   *
   * @default 1
   */
  stopOpacity: number | string;

  /**
   * Stop color.
   */
  color?: string;
}

export const GradientStop: FC<Partial<GradientStopProps>> = ({
  color,
  offset,
  stopOpacity = 1
}) => <stop offset={offset} stopOpacity={stopOpacity} stopColor={color} />;
