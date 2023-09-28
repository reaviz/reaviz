import React, { FC, useCallback } from 'react';

export interface MarkerLabelProps {
  /**
   * Width for positioning. Set internally by `Marker`.
   */
  width: number;

  /**
   * Height for positioning. Set internally by `Marker`.
   */
  height: number;

  /**
   * Color of the label.
   */
  color: string;

  /**
   * Position of the label with respect to `Marker` height.
   */
  position: 'center' | 'above' | 'below';

  /**
   * Offset label with respect to `Marker` position.
   */
  offset: number;

  /**
   * Label text.
   */
  text: string;

  /**
   * Set text to align with y-axis. Set internally by `Marker`.
   */
  vertical?: boolean;

  /**
   * D3 scale for X Axis. Set internally by Marker.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by Marker.
   */
  yScale: any;
}

export const MarkerLabel: FC<Partial<MarkerLabelProps>> = ({
  height,
  width,
  color = '#eee',
  position = 'center',
  vertical,
  text,
  xScale,
  yScale,
  offset
}) => {
  const getPosition = useCallback(() => {
    let y = yScale(height);
    let x = width - 70;
    if (position === 'above') y = yScale(height) - offset;
    if (position === 'below') y = yScale(height) + offset;
    if (vertical) {
      x = xScale(height);
      y = width - 80;
      if (position === 'above') y = xScale(height) - offset;
      if (position === 'below') y = xScale(height) + offset;
    }
    return { x, y };
  }, [position, height, width, vertical, yScale, xScale, offset]);

  return (
    <text {...getPosition()} fill={color}>
      {text}
    </text>
  );
};
