import React, { FC } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { motion } from 'framer-motion';
import { wrapText } from './wrapText';

export interface VennLabelProps {
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
  data: IVennLayout<any>;

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
}

export const VennLabel: FC<Partial<VennLabelProps>> = ({
  data,
  labelType = 'key',
  showAll = false,
  wrap = true,
  animated = true,
  fill = '#000',
  fontSize = 11,
  fontFamily = 'sans-serif'
}) => {
  // If the text area is very large, then lets just skip showing the label
  if (!showAll && !data.arcs?.filter((a) => a.large).length) {
    return null;
  }

  const key =
    labelType === 'key' ? data.data?.sets?.join(' | ') : data.data.size;

  const x = data.text.x;
  const y = data.text.y;
  const pos: any = {
    attrX: x,
    attrY: y
  };

  const transition = animated ? {} : { delay: 0, type: false };
  const text = wrap ? wrapText({ key, data, fontFamily, fontSize }) : key;

  return (
    <motion.text
      style={{ pointerEvents: 'none', fontFamily, fontSize }}
      fill={fill}
      initial={pos}
      animate={pos}
      transition={transition}
      textAnchor="middle"
    >
      {text}
    </motion.text>
  );
};
