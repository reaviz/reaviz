import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION, schemes } from '@/common';

export interface MeterColumnProps {
  /**
   * The value of the meter.
   */
  value: number;

  /**
   * The height of the column.
   */
  height?: number;

  /**
   * The index of the column.
   */
  index: number;

  /**
   * The scale to use.
   */
  scale: any;

  /**
   * The active fill color.
   */
  activeFill: string;

  /**
   * The inactive fill color.
   */
  inActiveFill: string;

  /**
   * Additional class names to apply.
   */
  className?: string;

  /**
   * The total number of columns. Set internally.
   */
  count?: number;

  /**
   * Whether to animate the column.
   */
  animated?: boolean;
}

export const MeterColumn: FC<Partial<MeterColumnProps>> = ({
  index,
  scale,
  value,
  count,
  height = 32,
  className,
  animated = true,
  activeFill = schemes.cybertron[0],
  inActiveFill = '#414242'
}) => {
  const isActive = scale(index) <= scale(value);
  const fill = isActive ? activeFill : inActiveFill;
  const transition = animated
    ? {
      ...DEFAULT_TRANSITION,
      delay: (index / count) * 0.5
    }
    : {
      type: false,
      delay: 0
    };

  return (
    <motion.div
      key={index}
      initial={{
        background: inActiveFill,
        height
      }}
      animate={{
        background: fill,
        height
      }}
      tranisition={transition}
      className={className}
    />
  );
};
