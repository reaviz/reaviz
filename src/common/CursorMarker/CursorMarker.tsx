import React, { FC } from 'react';
import css from './CursorMarker.module.css';

export interface CursorMarkerProps {
  height: number;
  pointX?: number;
  strokeColor: string;
  strokeWidth: number;
}

export const CursorMarker: FC<Partial<CursorMarkerProps>> = ({
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
    className={css.cursorMarker}
  />
);
