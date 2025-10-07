import { motion } from 'motion/react';
import type { FC } from 'react';
import React from 'react';

import { DEFAULT_TRANSITION } from '@/common/Motion';
import { wrapText } from '@/common/utils/wrapText';

export interface VennLabelProps {
  /**
   * Whether the shape is active or not.
   */
  active?: boolean | null;

  /**
   * Set by the parent element.
   */
  id?: string;

  /**
   * Show all labels or just the large ones. Default false.
   */
  showAll?: boolean;

  /**
   * The label type to show.
   */
  labelType: 'key' | 'value';

  /**
   * Should wrap text or not.
   */
  wrap?: boolean;

  /**
   * The internal data object built by venn.js
   */
  data: any;

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
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Format label.
   */
  format?: (data) => any;
}

export const VennLabel: FC<Partial<VennLabelProps>> = ({
  data,
  format,
  id,
  active,
  labelType = 'key',
  showAll = false,
  wrap = true,
  animated = true,
  fill,
  fontSize = 11,
  fontFamily = 'sans-serif'
}) => {
  // If the text area is very large, then lets just skip showing the label
  if (!showAll && !data.arcs?.filter((a) => a.large).length) {
    return null;
  }

  const key =
    labelType === 'key' ? data.data?.sets?.join(' | ') : data.data.size;

  const transition = animated
    ? DEFAULT_TRANSITION
    : { delay: 0, type: false as const };
  const text = wrap
    ? wrapText({
        key,
        x: data.text.x,
        fontFamily,
        fontSize,
        width: data?.circles?.[0]?.radius
      })
    : key;

  return (
    <motion.text
      id={`${id}-text`}
      fill={fill}
      pointerEvents="none"
      fontFamily={fontFamily}
      fontSize={fontSize}
      initial={
        {
          attrX: data.text.x,
          attrY: data.text.y,
          opacity: 1
        } as any
      }
      animate={
        {
          attrX: data.text.x,
          attrY: data.text.y,
          opacity: active === null ? 0.3 : 1
        } as any
      }
      transition={transition}
      textAnchor="middle"
    >
      {format ? format(data) : text}
    </motion.text>
  );
};
