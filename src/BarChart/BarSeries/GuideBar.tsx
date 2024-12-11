import React, { FC } from 'react';
import { motion } from 'framer-motion';

export interface GuideBarProps extends SVGRect {
  /**
   * Whether the guide bar is active.
   */
  active: boolean;

  /**
   * Fill for the guide bar element.
   */
  fill?: string;

  /**
   * Opacity for the guide bar element.
   */
  opacity?: number;
}

export const GuideBar: FC<Partial<GuideBarProps>> = (props) => {
  const { fill = '#eee', active, opacity = 0.15, ...rest } = props;

  const { x, y, ...other } = rest;

  return (
    <motion.rect
      fill={fill}
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
