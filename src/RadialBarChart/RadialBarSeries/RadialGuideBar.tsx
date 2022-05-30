import React, { FC } from 'react';
import { motion } from 'framer-motion';

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

RadialGuideBar.defaultProps = {
  fill: '#eee',
  opacity: 0.2
};
