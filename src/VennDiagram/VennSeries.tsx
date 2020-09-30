import React, { FC, Fragment, useCallback } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { getColor } from '../common/color';
import { VennArc } from './VennArc';
import { VennLabel } from './VennLabel';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../common/Motion';

export interface VennSeriesProps {
  data: IVennLayout<any>[];
  colorScheme?: string;
  animated?: boolean;
}

export const VennSeries: FC<VennSeriesProps> = ({
  data,
  animated = true,
  colorScheme = 'cybertron',
}) => {
  const transition = animated ? {} : { type: false, delay: 0 };

  const renderSection = useCallback(
    (d: IVennLayout<any>, index: number) => {
      const point = { key: d.data.sets, value: d.data.size };
      const fill = getColor({
        data,
        colorScheme,
        point,
        index,
      });

      return (
        <motion.g
          key={d.data.sets.toString()}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
        >
          <VennArc data={d} fill={fill} />
          <VennLabel data={d} />
        </motion.g>
      );
    },
    [colorScheme, data]
  );

  return <Fragment>{data.map(renderSection)}</Fragment>;
};
