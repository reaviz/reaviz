import React, { FC, Fragment, useCallback, useMemo } from 'react';
import { ColorSchemeType, getColor } from '@/common/color';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import { arc } from 'd3-shape';
import chroma from 'chroma-js';
import { SunburstArc } from './SunburstArc';
import { SunburstArcLabel } from './SunburstArcLabel';

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
   * Height of the chart. Set internally by `SunburstChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `SunburstChart`.
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

  const getFill = useCallback((item: any, index: number) => {
    // Get the parent most item for the color start
    let parent = item;
    while (parent.depth > 1) {
      parent = parent.parent;
    }

    let fill = getColor({
      data,
      colorScheme,
      point: parent.data,
      index
    });

    // darken the color based on the depth
    fill = chroma(fill).darken((item.depth - 1) * 0.5);

    return fill;
  }, [colorScheme, data]);

  const renderItem = useCallback((item: any, index: number) => {
    const fill = getFill(item, index);

    // Note: in the future this will probably need to be
    // expanded to handle multiple levels
    const itemId = item.parent
      ? `${item.parent.data.key}-${item.data.key}`
      : `${item.data.key}`;

    return (
      <Fragment key={itemId}>
        <SunburstArc
          id={`${id}-${itemId}-arc`}
          fill={fill}
          height={height}
          width={width}
          data={item}
        />
        <SunburstArcLabel
          id={`${id}-${itemId}-label`}
          fill={fill}
          data={item}
        />
      </Fragment>
    );
  }, [id, getFill, height, width]);

  return (
    <>
      {data.map(renderItem)}
    </>
  );
};
