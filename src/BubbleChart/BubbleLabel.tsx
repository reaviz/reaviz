import React, { FC } from 'react';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { motion } from 'framer-motion';

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
}

export const BubbleLabel: FC<Partial<BubbleLabelProps>> = ({
  id,
  data,
  fill = '#000',
  fontSize = 14,
  fontFamily = 'sans-serif'
}) => {
  return (
    <motion.text
      animate={{
        x: data.x,
        y: data.y
      }}
      id={`${id}-text`}
      style={{ pointerEvents: 'none', fontFamily, fontSize }}
      fill={fill}
      textAnchor="middle"
    >
      {(data.data as any).key}
    </motion.text>
  );
};
