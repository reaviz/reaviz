import React, { FC, Fragment, ReactElement, useCallback } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { ColorSchemeType, getColor } from '../common/color';
import { VennArc, VennArcProps } from './VennArc';
import { VennLabel, VennLabelProps } from './VennLabel';
import { motion } from 'framer-motion';
import { CloneElement } from '../common/utils';
import chroma from 'chroma-js';

export interface VennSeriesProps {
  /**
   * The internal data object built by venn.js
   */
  data: IVennLayout<any>[];

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Whether the chart is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Label element.
   */
  label?: ReactElement<VennLabelProps, typeof VennLabel> | null;

  /**
   * Arc element.
   */
  arc?: ReactElement<VennArcProps, typeof VennArc> | null;
}

export const VennSeries: FC<Partial<VennSeriesProps>> = ({
  data,
  animated = true,
  disabled,
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

      const stroke = chroma(fill).darken(.5);

      return (
        <motion.g
          key={d.data.sets.toString()}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
        >
          <CloneElement<VennArcProps>
            element={arc}
            data={d}
            fill={fill}
            stroke={stroke}
            disabled={disabled}
            animated={animated}
          />
          <CloneElement<VennLabelProps>
            element={label}
            data={d}
            animated={animated}
          />
        </motion.g>
      );
    },
    [colorScheme, data]
  );

  return <Fragment>{data.map(renderSection)}</Fragment>;
};
