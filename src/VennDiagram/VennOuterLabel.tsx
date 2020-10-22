import React, { FC } from 'react';
import { motion } from 'framer-motion';

export interface VennOuterLabelProps {
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

export const VennOuterLabel: FC<Partial<VennOuterLabelProps>> = ({
  data,
  format,
  animated = true,
  fill = '#000',
  fontSize = 14,
  fontFamily = 'sans-serif'
}) => {
  const transition = animated ? {} : { delay: 0, type: false };
  const text = data.set.data.key;

  return (
    <motion.text
      fill={fill}
      style={{ pointerEvents: 'none', fontFamily, fontSize }}
      textAnchor={data.set.align === 'middle' ? 'center' : data.set.align}
      alignmentBaseline={data.set.verticalAlign}
      initial={{
        attrX: data.set.text.x,
        attrY: data.set.text.y
      } as any}
      animate={{
        attrX: data.set.text.x,
        attrY: data.set.text.y
      } as any}
      transition={transition}
    >
      {format ? format(data) : text}
    </motion.text>
  );
};
