import type { FC } from 'react';
import React from 'react';

export interface RadialValueMarkerProps {
  color: string;
  value: number;
  className?: string;
  thickness?: number;
}
export const RadialValueMarker: FC<RadialValueMarkerProps> = ({
  color,
  value,
  className,
  thickness = 1,
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
