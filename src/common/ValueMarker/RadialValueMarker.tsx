import React, { FC } from 'react';

export interface RadialValueMarkerProps {
  /**
   * Color of the marker circle stroke.
   */
  color: string;

  /**
   * Radius value to render the marker at.
   */
  value: number;

  /**
   * CSS class to apply.
   */
  className?: string;

  /**
   * Stroke width of the marker circle.
   *
   * @default 1
   */
  thickness?: number;
}
export const RadialValueMarker: FC<RadialValueMarkerProps> = ({
  color,
  value,
  className,
  thickness = 1
}) => (
  <circle
    className={className}
    cx={0}
    cy={0}
    r={value}
    fill="none"
    stroke={color}
    strokeWidth={thickness}
  />
);
