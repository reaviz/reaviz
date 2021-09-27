import { motion } from 'framer-motion';
import React, { FC, Fragment } from 'react';
import { ColorSchemeType } from '../common/color';

export interface TreeMapRectProps {

  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * Fill for the rect.
   */
  fill: string;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;
}

export const TreeMapRect: FC<Partial<TreeMapRectProps>> = ({
  data,
  fill,
  animated
}) => {
  const transition = animated ? {} : { type: false, delay: 0 };

  return (
    <motion.rect
      height={data.y1 - data.y0}
      initial={{
        width: data.x1 - data.x0,
        height: data.y1 - data.y0,
        fill: fill
      }}
      animate={{
        width: data.x1 - data.x0,
        height: data.y1 - data.y0,
        fill: fill
      }}
      transition={transition}
    />
  );
};
