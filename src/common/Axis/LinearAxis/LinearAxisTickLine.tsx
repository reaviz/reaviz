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

export const LinearAxisTickLine = ({ height, width, orientation, size = 5, strokeColor = '#8F979F', strokeWidth = 1, position, className }: LinearAxisTickLineProps) => {
  function positionTick() {
    const isVertical = orientation === 'vertical';
    const tickSize = size || 0;
    const start = position === 'start' ? tickSize * -1 : position === 'center' ? tickSize * -0.5 : 0;
    const end = start + tickSize;

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
