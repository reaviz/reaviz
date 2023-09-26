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
   * Whether to render a semicircle or a full circle
   * Renders a full circle by default
   */
  isSemiCircle?: boolean;
}

export const RadialAxisArc: FC<Partial<RadialAxisArcProps>> = ({
  index,
  stroke,
  strokeDasharray,
  scale,
  isSemiCircle
}) => {
  const r = scale(index);
  const strokeColor = typeof stroke === 'string' ? stroke : stroke(index);
  const strokeDash =
    typeof strokeDasharray === 'string'
      ? strokeDasharray
      : strokeDasharray(index);
  const d = `M 0 0 h ${r} A ${r} ${r} 0 1 0 -${r} 0 z`;

  return (
    <>
      {!isSemiCircle ? 
        <circle
          fill="none"
          strokeDasharray={strokeDash}
          stroke={strokeColor}
          style={{ pointerEvents: 'none' }}
          cx="0"
          cy="0"
          r={r}
        />
        :
        <path d={d} fill="none"
          strokeDasharray={strokeDash}
          stroke={strokeColor}
          style={{ pointerEvents: 'none' }}
        />
      }
    </>
  );
};

RadialAxisArc.defaultProps = {
  stroke: '#71808d',
  strokeDasharray: '1,4',
  isSemiCircle: false
};
