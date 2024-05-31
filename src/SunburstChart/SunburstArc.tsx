import React, { FC, useMemo } from 'react';
import { arc } from 'd3-shape';

export interface SunburstArcProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * Radius of the chart. Set internally by `SunburstChart`.
   */
  radius: number;

  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Fill color for the arc.
   */
  fill: string;
}

export const SunburstArc: FC<Partial<SunburstArcProps>> = ({
  radius,
  fill,
  data
}) => {
  const d = useMemo(() => {
    return arc()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d: any) => d.y0 * radius)
      .outerRadius((d: any) => Math.max(d.y0 * radius, d.y1 * radius - 1))(
        data
      );
  }, [radius, data]);

  return <path fill={fill} d={d} role="graphics-document" />;
};