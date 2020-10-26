import React, { PureComponent } from 'react';

export interface LinearAxisTickLineProps {
  height: number;
  width: number;
  orientation: 'horizontal' | 'vertical';
  size: number;
  strokeColor?: string;
  strokeWidth: number;
  position: 'start' | 'end' | 'center';
  className?: any;
}

export class LinearAxisTickLine extends PureComponent<LinearAxisTickLineProps> {
  static defaultProps: Partial<LinearAxisTickLineProps> = {
    strokeColor: '#8F979F',
    strokeWidth: 1,
    size: 5
  };

  positionTick() {
    const { size, position, orientation } = this.props;
    const isVertical = orientation === 'vertical';
    const tickSize = size || 0;
    const start =
      position === 'start'
        ? tickSize * -1
        : position === 'center'
          ? tickSize * -0.5
          : 0;
    const end = start + tickSize;

    return {
      x1: isVertical ? end : 0,
      x2: isVertical ? start : 0,
      y1: isVertical ? 0 : start,
      y2: isVertical ? 0 : end
    };
  }

  render() {
    const { strokeColor, strokeWidth, className } = this.props;
    const path = this.positionTick();

    return (
      <line
        className={className}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        {...path}
      />
    );
  }
}
