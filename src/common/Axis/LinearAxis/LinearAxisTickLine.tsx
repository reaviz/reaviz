import React, { FC, useMemo } from 'react';

export interface LinearAxisTickLineProps {
  orientation: 'horizontal' | 'vertical';
  size: number;
  strokeColor?: string;
  strokeWidth: number;
  position: 'start' | 'end' | 'center';
  className?: string;
}

export const LinearAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = ({
  className,
  position,
  orientation,
  strokeColor = '#8F979F',
  strokeWidth = 1,
  size = 5
}) => {
  const path = useMemo(() => {
    const isVertical = orientation === 'vertical';
    const start =
      position === 'start'
        ? size * -1
        : position === 'center'
        ? size * -0.5
        : 0;
    const end = start + size;

    return {
      x1: isVertical ? end : 0,
      x2: isVertical ? start : 0,
      y1: isVertical ? 0 : start,
      y2: isVertical ? 0 : end
    };
  }, [orientation, size, position]);

  return (
    <line
      className={className}
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      {...path}
    />
  );
};
