import type { HierarchyCircularNode } from 'd3-hierarchy';
import { motion } from 'motion/react';
import type { FC } from 'react';
import React, { isValidElement } from 'react';

import { DEFAULT_TRANSITION } from '@/common/Motion';
import { wrapText } from '@/common/utils/wrapText';

export interface BubbleLabelProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: HierarchyCircularNode<any>;

  /**
   * Font size of the text.
   */
  fontSize?: number;

  /**
   * Font family of the text.
   */
  fontFamily?: string;

  /**
   * Fill of the text.
   */
  fill?: string;

  /**
   * Should wrap text or not.
   */
  wrap?: boolean;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Format label.
   */
  format?: (data) => any;
}

export const BubbleLabel: FC<Partial<BubbleLabelProps>> = ({
  id,
  data,
  format,
  wrap = true,
  fill,
  fontSize = 14,
  fontFamily = 'sans-serif',
  animated
}) => {
  const transition = animated
    ? DEFAULT_TRANSITION
    : { type: false as const, delay: 0 };
  let isElement = false;
  let label;

  if (format) {
    label = format(data);
    isElement = isValidElement(label);
  }

  if (!isElement) {
    const text = wrap
      ? wrapText({
          key: data.data.key,
          fontFamily,
          fontSize,
          width: data.r
        })
      : data.data.key;

    return (
      <motion.text
        initial={{
          x: data.x,
          y: data.y
        }}
        animate={{
          x: data.x,
          y: data.y
        }}
        transition={transition}
        id={`${id}-text`}
        style={{ pointerEvents: 'none', fontFamily, fontSize }}
        fill={fill}
        textAnchor="middle"
      >
        {text}
      </motion.text>
    );
  }

  return (
    <g style={{ transform: `translate(${data.x}px, ${data.y}px)` }}>{label}</g>
  );
};
