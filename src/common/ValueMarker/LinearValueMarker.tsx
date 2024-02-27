import React, { FC } from 'react';

export interface LinearValueMarkerProps {
  color: string;
  value: number;
  className?: string;
  thickness?: number;
  size?: number;
  isHorizontal?: boolean;
}
export const LinearValueMarker: FC<LinearValueMarkerProps> = ({
  color,
  value,
  className,
  thickness = 1,
  size,
  isHorizontal = true
}) => {
  const coordinates = isHorizontal
    ? { x1: 0, y1: value, x2: size, y2: value }
    : { x1: value, y1: 0, x2: value, y2: size };
  return (
    <line
      className={className}
      stroke={color}
      strokeWidth={thickness}
      {...coordinates}
    />
  );
};
