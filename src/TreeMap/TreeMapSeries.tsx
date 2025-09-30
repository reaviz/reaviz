import chroma from 'chroma-js';
import invert from 'invert-color';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment } from 'react';

import type { ColorSchemeType } from '@/common/color';
import { getColor } from '@/common/color';
import { DEFAULT_TRANSITION } from '@/common/Motion';

import type { TreeMapLabelProps } from './TreeMapLabel';
import { TreeMapLabel } from './TreeMapLabel';
import type { TreeMapRectProps } from './TreeMapRect';
import { TreeMapRect } from './TreeMapRect';

export interface TreeMapSeriesProps {
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
   * Rect element to be rendered.
   */
  rect?: ReactElement<TreeMapRectProps, typeof TreeMapRect>;

  /**
   * Label element to be rendered.
   */
  label?: ReactElement<TreeMapLabelProps, typeof TreeMapLabel>;
}

export const TreeMapSeries: FC<Partial<TreeMapSeriesProps>> = ({
  id,
  data,
  colorScheme = 'cybertron',
  animated = true,
  rect = <TreeMapRect />,
  label = <TreeMapLabel />
}) => {
  const transition = animated
    ? DEFAULT_TRANSITION
    : { type: false as const, delay: 0 };

  const renderItem = (item: any, index: number) => {
    const fill = getColor({
      data,
      colorScheme,
      point: item.data,
      index
    });

    const textFill = fill
      ? invert(chroma(fill).darken(0.5).hex(), true)
      : 'white';

    return (
      <motion.g
        key={item.data.key}
        initial={{
          scale: 0.5,
          opacity: 0,
          x: item.x0,
          y: item.y0
        }}
        animate={{
          scale: 1,
          opacity: 1,
          x: item.x0,
          y: item.y0
        }}
        transition={transition}
      >
        <CloneElement<TreeMapRectProps>
          element={rect}
          id={`${id}-${item.data.key}-rect`}
          animated={animated}
          data={item}
          fill={fill}
        />
        <CloneElement<TreeMapLabelProps>
          element={label}
          id={`${id}-${item.data.key}-label`}
          data={item}
          fill={textFill}
        />
      </motion.g>
    );
  };

  return <Fragment>{data.map((d, index) => renderItem(d, index))}</Fragment>;
};
