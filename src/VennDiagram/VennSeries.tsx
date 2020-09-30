import React, { FC, Fragment, ReactElement, useCallback } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { getColor } from '../common/color';
import { VennArc, VennArcProps } from './VennArc';
import { VennLabel, VennLabelProps } from './VennLabel';
import { motion } from 'framer-motion';
import { CloneElement } from '../common/utils';

export interface VennSeriesProps {
  data: IVennLayout<any>[];
  colorScheme?: string;
  animated?: boolean;
  label?: ReactElement<VennLabelProps, typeof VennLabel> | null;
  arc?: ReactElement<VennArcProps, typeof VennArc> | null;
}

export const VennSeries: FC<Partial<VennSeriesProps>> = ({
  data,
  animated = true,
  colorScheme = 'cybertron',
  arc = <VennArc />,
  label = <VennLabel />
}) => {
  const transition = animated ? {} : { type: false, delay: 0 };

  const renderSection = useCallback(
    (d: IVennLayout<any>, index: number) => {
      const point = { key: d.data.sets, value: d.data.size };
      const fill = getColor({
        data,
        colorScheme,
        point,
        index
      });

      return (
        <motion.g
          key={d.data.sets.toString()}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
        >
          <CloneElement<VennArcProps> element={arc} data={d} fill={fill} />
          <CloneElement<VennLabelProps> element={label} data={d} />
        </motion.g>
      );
    },
    [colorScheme, data]
  );

  return <Fragment>{data.map(renderSection)}</Fragment>;
};
