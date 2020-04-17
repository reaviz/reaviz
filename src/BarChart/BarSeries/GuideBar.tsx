import React, { FC } from 'react';
import { motion } from 'framer-motion';

export interface GuideBarProps extends SVGRect {
  active: boolean;
  fill?: string;
  opacity?: number;
}

export const GuideBar: FC<Partial<GuideBarProps>> = ({
  active,
  fill = '#eee',
  opacity = 0.15,
  ...rest
}) => (
  <motion.rect
    {...rest}
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
