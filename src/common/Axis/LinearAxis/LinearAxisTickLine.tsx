import React, { FC, useMemo } from 'react';

export interface LinearAxisTickLineProps {
  /**
   * Height of the axis. Set internally by the parent component.
   */
  height: number;

  /**
   * Width of the axis. Set internally by the parent component.
   */
  width: number;

  /**
   * Orientation of the axis. Set internally by the parent component.
   */
  orientation: 'horizontal' | 'vertical';

  /**
   * Size of the tick line.
   *
   * @default 5
   */
  size: number;

  /**
   * Stroke color of the tick line.
   *
   * @default '#8F979F'
   */
  strokeColor?: string;

  /**
   * Stroke width of the tick line.
   *
   * @default 1
   */
  strokeWidth: number;

  /**
   * Position of the tick line relative to the axis.
   */
  position: 'start' | 'end' | 'center';

  /**
   * CSS class to apply.
   */
  className?: string;
}

export const LinearAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => {
  const { size, position, orientation, strokeColor, strokeWidth, className } = {
    ...LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS,
    ...props
  };

  const path = useMemo(() => {
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
  }, [orientation, position, size]);

  return (
    <line
      className={className}
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      {...path}
    />
  );
};

export const LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS = {
  strokeColor: '#8F979F',
  strokeWidth: 1,
  size: 5
};
