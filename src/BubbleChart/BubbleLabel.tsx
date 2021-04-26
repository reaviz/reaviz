import React, { FC } from 'react';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { motion } from 'framer-motion';
import { wrapText } from '../common/utils/wrapText';

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
}

export const BubbleLabel: FC<Partial<BubbleLabelProps>> = ({
  id,
  data,
  wrap = true,
  fill = '#000',
  fontSize = 14,
  fontFamily = 'sans-serif'
}) => {
  const text = wrap ? wrapText({
    key: data.data.key,
    fontFamily,
    fontSize,
    width: data.r
  }) : data.data.key;

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
      id={`${id}-text`}
      style={{ pointerEvents: 'none', fontFamily, fontSize }}
      fill={fill}
      textAnchor="middle"
    >
      {text}
    </motion.text>
  );
};
