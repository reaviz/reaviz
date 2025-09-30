import { motion } from 'motion/react';
import type { FC } from 'react';
import React from 'react';

export interface RadialGuideBarProps {
  active: boolean;
  path: string;
  fill?: string;
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
