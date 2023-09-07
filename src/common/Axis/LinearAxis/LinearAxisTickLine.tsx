import React from 'react';

export interface LinearAxisTickLineProps {
  height: number;
  width: number;
  orientation: 'horizontal' | 'vertical';
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  position: 'start' | 'end' | 'center';
  className?: any;
}

export const LinearAxisTickLine = ({ height, width, orientation, size = 3, strokeColor = '#8F979F', strokeWidth = 1, position = 'center', className }: LinearAxisTickLineProps) => {
  function positionTick() {
    const isVertical = orientation === 'vertical';
    const start = position === 'start' ? size * -1 : position === 'center' ? size * -0.5 : 0;
    const end = start + size;

    return {
      x1: isVertical ? end : 0,
      x2: isVertical ? start : 0,
      y1: isVertical ? 0 : start,
      y2: isVertical ? 0 : end
    };
  }

  const path = positionTick();

  return <line className={className} strokeWidth={strokeWidth} stroke={strokeColor} {...path} />;
};
