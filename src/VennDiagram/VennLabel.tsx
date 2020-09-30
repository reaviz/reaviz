import React, { FC } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { calculateDimensions } from '../common/utils';
import { motion } from 'framer-motion';

export interface VennLabelProps {
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
  animated = true,
  fill = '#000',
  fontSize = 11,
  fontFamily = 'sans-serif'
}) => {
  const key = data.data.sets.join(' | ');
  const size = calculateDimensions(key, fontFamily, fontSize);
  const halfHeight = size.height / 2;
  const halfWidth = size.width / 2;
  const x = data.text.x - halfWidth;
  const y = data.text.y + halfHeight;
  const pos: any = {
    attrX: x,
    attrY: y
  };
  const transition = animated ? {} : { delay: 0, type: false };

  return (
    <motion.text
      style={{ pointerEvents: 'none', fontFamily, fontSize }}
      fill={fill}
      initial={pos}
      animate={pos}
      transition={transition}
    >
      {key}
    </motion.text>
  );
};
