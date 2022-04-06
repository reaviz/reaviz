import React, { FC } from 'react';
import { motion } from 'framer-motion';

export interface GuideBarProps extends SVGRect {
  active: boolean;
  fill?: string;
  opacity?: number;
}

export const GuideBar: FC<Partial<GuideBarProps>> = ({
  active,
  opacity = 0.15,
  ...rest
}) => {
  const { x, y, ...other } = rest;

  return (
    <motion.rect
      {...other}
      pointerEvents="none"
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, attrX: x, attrY: y },
        visible: { opacity, attrX: x, attrY: y }
      }}
    />
  );
};

GuideBar.defaultProps = {
  fill: '#eee',
  opacity: 0.15
};
