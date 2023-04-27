import React, { FC } from 'react';
import css from './MarkLine.module.css';

export interface MarkLineProps {
  height: number;
  pointX?: number;
  strokeColor: string;
  strokeWidth: number;
}

export const MarkLine: FC<Partial<MarkLineProps>> = ({
  pointX,
  height,
  strokeWidth = 0,
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
