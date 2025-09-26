import chroma from 'chroma-js';
import type { HierarchyCircularNode } from 'd3-hierarchy';
import invert from 'invert-color';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment } from 'react';
import { identifier } from 'safe-identifier';

import type { ColorSchemeType } from '@/common/color';
import { getColor } from '@/common/color';
import { DEFAULT_TRANSITION } from '@/common/Motion';

import type { BubbleProps } from './Bubble';
import { Bubble } from './Bubble';
import type { BubbleLabelProps } from './BubbleLabel';
import { BubbleLabel } from './BubbleLabel';

export interface BubbleSeriesProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: HierarchyCircularNode<any>[];

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Bubble element.
   */
  bubble?: ReactElement<BubbleProps, typeof Bubble>;

  /**
   * Bubble element.
   */
  format?: (item: any) => ReactElement<BubbleProps, typeof Bubble>;

  /**
   * Label element.
   */
  label?: ReactElement<BubbleLabelProps, typeof BubbleLabel>;
}

export const BubbleSeries: FC<Partial<BubbleSeriesProps>> = ({
  id,
  data,
  colorScheme = 'cybertron',
  animated = true,
  bubble = <Bubble />,
  format,
  label = <BubbleLabel />,
}) => {
  const transition = animated
    ? DEFAULT_TRANSITION
    : { type: false as const, delay: 0 };

  const renderBubble = (item, index) => {
    const fill = getColor({
      data,
      colorScheme,
      point: item.data,
      index,
    });

    const textFill = fill
      ? invert(chroma(fill).darken(0.5).hex(), true)
      : 'white';

    return (
      <motion.g
        key={(item.data as any).key}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={transition}
      >
        <CloneElement<BubbleProps>
          element={format ? format(item) : bubble}
          id={identifier(`${id}-${item.data.key}-bubble`)}
          animated={animated}
          data={item}
          fill={fill}
        />
        <CloneElement<BubbleLabelProps>
          element={label}
          id={identifier(`${id}-${item.data.key}-label`)}
          animated={animated}
          data={item}
          fill={textFill}
        />
      </motion.g>
    );
  };

  return <Fragment>{data.map(renderBubble)}</Fragment>;
};
