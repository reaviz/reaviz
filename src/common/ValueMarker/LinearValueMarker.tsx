import React, { FC } from 'react';

export interface LinearValueMarkerProps {
  color: string;
  value: any;
  className?: string;
  thickness?: number;
  size?: number;
  direction?: 'horizontal' | 'vertical';
}
export const LinearValueMarker: FC<LinearValueMarkerProps> = ({
  color,
  value,
  className,
  thickness = 1,
  size,
  direction = 'horizontal'
}) => {
  const coordinates =
    direction === 'horizontal'
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
