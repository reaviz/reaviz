import React, { FC } from 'react';

export interface SunburstArcLabelProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Fill color for the arc.
   */
  fill: string;

  /**
   * Radius of the chart. Set internally by `SunburstChart`.
   */
  radius: number;
}

export const SunburstArcLabel: FC<SunburstArcLabelProps> = ({
  data,
  fill,
  radius
}) => {
  const text = data.data.key;

  function labelTransform(d) {
    const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    const y = ((d.y0 + d.y1) / 2) * radius;
    return `rotate(${x - 90}) translate(${y}px,0) rotate(${x < 180 ? 0 : 180})`;
  }

  return (
    <g style={{ transform: labelTransform(data) }}>
      <text style={{ pointerEvents: 'none' }} fill={'black'}>
        {text}
      </text>
    </g>
  );
};
