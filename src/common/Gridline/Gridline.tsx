import React, { FC, useMemo } from 'react';
import css from './Gridline.module.css';

export interface GridlineProps {
  /**
   * Height of the line set by the `GridlineSeries`.
   */
  height: number;

  /**
   * Width of the line set by the `GridlineSeries`.
   */
  width: number;

  /**
   * Direction set by the `GridlineSeries`.
   */
  direction: 'all' | 'x' | 'y';

  /**
   * D3 Scale set by `GridlineSeries`.
   */
  scale: any;

  /**
   * SVG Stroke Width Property.
   */
  strokeWidth: number;

  /**
   * SVG Stroke Color Property.
   */
  strokeColor: string;

  /**
   * Data point for the position set by the `GridlineSeries`.
   */
  data: number;

  /**
   * Index set by the `GridlineSeries`.
   */
  index: number;

  /**
   * SVG Stroke Dash Array Property.
   */
  strokeDasharray: string;
}

export const Gridline: FC<Partial<GridlineProps>> = ({
  strokeWidth = 1,
  direction = 'all',
  strokeColor = 'rgba(153, 153, 153, 0.5)',
  data,
  height,
  width,
  scale,
  strokeDasharray
}) => {
  const coords = useMemo(() => {
    const pos = scale(data);

    if (direction === 'x') {
      return {
        x1: pos,
        x2: pos,
        y1: 0,
        y2: height
      };
    } else {
      return {
        y1: pos,
        y2: pos,
        x1: 0,
        x2: width
      };
    }
  }, [direction, data, height, width, scale]);

  return (
    <line
      {...coords}
      className={css.gridLine}
      strokeDasharray={strokeDasharray}
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      fill="none"
    />
  );
};
