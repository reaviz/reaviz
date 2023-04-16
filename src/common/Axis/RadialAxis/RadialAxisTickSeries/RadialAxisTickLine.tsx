import React, { FC } from 'react';

export interface RadialAxisTickLineProps {
  /**
   * Size of the tick line.
   */
  size?: number;

  /**
   * Stroke color of the tick line.
   */
  stroke: string;

  /**
   * Inner radius of the arc.
   */
  innerRadius: number;

  /**
   * Outer radius of the arc.
   */
  outerRadius: number;

  /**
   * Position of the tick line.
   */
  position: 'inside' | 'outside';
}

export const RadialAxisTickLine: FC<Partial<RadialAxisTickLineProps>> = ({
  stroke,
  size,
  position,
  innerRadius,
  outerRadius
}) => {
  const x1 = position === 'outside' ? size : -(outerRadius - innerRadius);

  return (
    <line x1={x1} x2={0} stroke={stroke} style={{ pointerEvents: 'none' }} />
  );
};

RadialAxisTickLine.defaultProps = {
  stroke: 'rgba(113, 128, 141, .5)',
  size: 10,
  position: 'inside'
};
