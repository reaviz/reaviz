import React, { FC, useCallback } from 'react';

export interface MarkerLabelProps {
  /**
   * Width for positioning. set internally by `Marker`.
   */
  width: number;

  /**
   * Height for positioning. set internally by `Marker`.
   */
  y: number;

  /**
   * Color of the label.
   */
  color: string;

  /**
   * Position of the label with respect to `Marker` height.
   */
  position: string;

  /**
   * Label text.
   */
  text: string;
}

export const MarkerLabel: FC<Partial<MarkerLabelProps>> = ({
  y,
  width,
  color = '#eee',
  position = 'center',
  text
}) => {
  const getPosition = useCallback(() => {
    if (position === 'top') return y - 10;
    if (position === 'below') return y + 10;
    return y;
  }, [position, y]);

  return (
    <text y={getPosition()} x={width - 70} fill={color}>
      {text}
    </text>
  );
};
