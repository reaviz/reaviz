import React, { FC } from 'react';
import { motion } from 'motion/react';

export interface RadialGuideBarProps {
  active: boolean;
  path: string;

  /**
   * Fill for the guide bar element.
   *
   * @default '#eee'
   */
  fill?: string;

  /**
   * Opacity for the guide bar element.
   *
   * @default 0.2
   */
  opacity?: number;
}

export const RadialGuideBar: FC<Partial<RadialGuideBarProps>> = ({
  active,
  path,
  fill = '#eee',
  opacity = 0.2
}) => (
  <motion.path
    d={path}
    fill={fill}
    pointerEvents="none"
    initial="hidden"
    animate={active ? 'visible' : 'hidden'}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity }
    }}
  />
);
