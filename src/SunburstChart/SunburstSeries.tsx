import React, { FC, Fragment, ReactElement, useCallback, useMemo } from 'react';
import { ColorSchemeType, getColor } from '@/common/color';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import { arc } from 'd3-shape';

export interface SunburstSeriesProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: any[];

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Height of the chart. Set internally by `BarChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `BarChart`.
   */
  width: number;
}

export const SunburstSeries: FC<Partial<SunburstSeriesProps>> = ({
  id,
  data,
  colorScheme = 'cybertron',
  height,
  width,
  animated,
}) => {
  const transition = animated ? DEFAULT_TRANSITION : { type: false, delay: 0 };

  const getArc = useMemo(() => {
    const radius = Math.min(width, height) / 2;
    return arc()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d: any) => d.y0 * radius)
      .outerRadius((d: any) => Math.max(d.y0 * radius, d.y1 * radius - 1));
  }, [width, height]);

  const renderItem = useCallback((item: any, index: number) => {
    const fill = getColor({
      data,
      colorScheme,
      point: item.data,
      index
    });
    const d = getArc(item);

    return (
      <path
        key={index}
        fill={fill}
        d={d}
        role="graphics-document"
      />
    );
  }, [colorScheme, data, getArc]);

  return (
    <g>
      {data.map(renderItem)}
    </g>
  );
};
