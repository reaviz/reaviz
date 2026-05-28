import React, { FC } from 'react';
import css from './MarkLine.module.css';

export interface MarkLineProps {
  /**
   * Height of the chart. Set internally by the parent component.
   */
  height: number;

  /**
   * X position of the mark line. Set internally by the parent component.
   */
  pointX?: number;

  /**
   * Stroke color of the mark line.
   *
   * @default '#eee'
   */
  strokeColor: string;

  /**
   * Stroke width of the mark line.
   *
   * @default 1
   */
  strokeWidth: number;
}

export const MarkLine: FC<Partial<MarkLineProps>> = ({
  pointX,
  height,
  strokeWidth = 1,
  strokeColor = '#eee'
}) => (
  <line
    stroke={strokeColor}
    strokeWidth={strokeWidth}
    y1="0"
    vectorEffect="non-scaling-stroke"
    y2={height}
    x1={pointX}
    x2={pointX}
    className={css.markLine}
  />
);
