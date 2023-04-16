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
}

export const RadialAxisArc: FC<Partial<RadialAxisArcProps>> = ({
  index,
  stroke,
  strokeDasharray,
  scale
}) => {
  const r = scale(index);
  const strokeColor = typeof stroke === 'string' ? stroke : stroke(index);
  const strokeDash =
    typeof strokeDasharray === 'string'
      ? strokeDasharray
      : strokeDasharray(index);

  return (
    <circle
      fill="none"
      strokeDasharray={strokeDash}
      stroke={strokeColor}
      style={{ pointerEvents: 'none' }}
      cx="0"
      cy="0"
      r={r}
    />
  );
};

RadialAxisArc.defaultProps = {
  stroke: '#71808d',
  strokeDasharray: '1,4'
};
