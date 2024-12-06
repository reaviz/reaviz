import { line } from 'd3-shape';
import React, { FC } from 'react';

export interface RadialAxisArcLineProps {
  /**
   * Stroke color of the arc.
   */
  stroke: ((index: number) => string) | string;

  /**
   * Data to render the line.
   */
  data: Array<{ x: number; y: number }>;

  /**
   * Index of the arc.
   */
  index: number;
}

export const RadialAxisArcLine: FC<Partial<RadialAxisArcLineProps>> = (
  props
) => {
  const { data, stroke, index } = {
    ...RADIAL_AXIS_ARC_LINE_DEFAULT_PROPS,
    ...props
  };

  const lineGenerator = line<{ x: number; y: number }>()
    .x((d: any) => d.x)
    .y((d: any) => d.y);

  const d = lineGenerator(data);
  const strokeColor = typeof stroke === 'string' ? stroke : stroke(index);

  return (
    <path
      d={d}
      stroke={strokeColor}
      fill="none"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export const RADIAL_AXIS_ARC_LINE_DEFAULT_PROPS = {
  stroke: '#71808d'
};
