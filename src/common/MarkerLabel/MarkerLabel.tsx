import React, { FC, useCallback } from 'react';

export interface MarkerLabelProps {
  /**
   * Width for positioning. set internally by `Marker`.
   */
  width: number;

  /**
   * Height for positioning. set internally by `Marker`.
   */
  height: number;

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
  height,
  width,
  color = '#eee',
  position = 'center',
  text
}) => {
  const getPosition = useCallback(() => {
    let y = height;
    let x = width - 70;
    if (position === 'top') y = height - 10;
    if (position === 'below') y = height + 10;
    return { x, y };
  }, [position, height, width]);

  return (
    <text {...getPosition()} fill={color}>
      {text}
    </text>
  );
};
