import type { FC } from 'react';
import React from 'react';

export interface FunnelAxisLineProps {
  /**
   * Color of the axis lines.
   */
  strokeColor: string;

  /**
   * Width of the axis lines.
   */
  strokeWidth: number;

  /**
   * xScale for the funnel. Set internally by `FunnelChart`.
   */
  xScale: any;

  /**
   * yScale for the funnel. Set internally by `FunnelChart`.
   */
  yScale: any;

  /**
   * Index of the line. Set internally by `FunnelAxis`.
   */
  index: number;
}

export const FunnelAxisLine: FC<Partial<FunnelAxisLineProps>> = ({
  strokeColor = '#333',
  strokeWidth = 2,
  yScale,
  xScale,
  index
}) => {
  const [height] = yScale.range();

  return (
    <line
      x1={xScale(index)}
      y1={0}
      x2={xScale(index)}
      y2={height}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      pointerEvents="none"
    />
  );
};
