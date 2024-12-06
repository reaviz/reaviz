import { arc } from 'd3-shape';
import React, { FC } from 'react';

export interface RadialAxisArcProps {
  /**
   * Index of the arc.
   */
  index: number;

  /**
   * Scale to use for the arc.
   */
  scale: any;

  /**
   * Stroke color of the arc.
   */
  stroke: ((index: number) => string) | string;

  /**
   * Stroke dash array of the arc.
   */
  strokeDasharray: ((index: number) => string) | string;

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

export const RadialAxisArc: FC<Partial<RadialAxisArcProps>> = (props) => {
  const { index, stroke, strokeDasharray, scale, startAngle, endAngle } = {
    ...RADIAL_AXIS_ARC_DEFAULT_PROPS,
    ...props
  };

  const r = scale(index);
  const strokeColor = typeof stroke === 'string' ? stroke : stroke(index);
  const strokeDash =
    typeof strokeDasharray === 'string'
      ? strokeDasharray
      : strokeDasharray(index);

  const isFullCircle = Math.abs(endAngle - startAngle) >= 2 * Math.PI;

  const x = arc()({
    innerRadius: r,
    outerRadius: r,
    startAngle: startAngle,
    endAngle: endAngle
  });

  // Path calculation for intermediate angles
  const REGEX = /(-?\d+\.?\d*,-?\d+\.?\d*A-?\d+\.?\d*,-?\d+\.?\d*)/gm;
  const matches = x.match(REGEX);
  const start = matches?.[0]?.split('A', 2)?.[0];
  const end = matches?.[1]?.split('A', 2)?.[0];
  const d = x + ` M ${start} L 0,0 M ${end} L 0,0`;

  return (
    <>
      {isFullCircle ? (
        <circle
          fill="none"
          strokeDasharray={strokeDash}
          stroke={strokeColor}
          style={{ pointerEvents: 'none' }}
          cx="0"
          cy="0"
          r={r}
        />
      ) : (
        <path
          d={d}
          fill="none"
          strokeDasharray={strokeDash}
          stroke={strokeColor}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </>
  );
};

export const RADIAL_AXIS_ARC_DEFAULT_PROPS = {
  stroke: '#71808d',
  strokeDasharray: '1,4',
  startAngle: 0,
  endAngle: 2 * Math.PI
};
