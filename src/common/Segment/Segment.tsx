import React, { FC } from 'react';
import { motion } from 'framer-motion';

export interface SegmentProps {
  /**
  * Area path of the segment. Set internally by `Area`
  */
  areaPath?: string;

  /**
  * Color for the segment area.
  */  
  fill?: string;
}

export const Segment: FC<SegmentProps> = ({ areaPath, fill }) => (
  <motion.path
    d={areaPath}
    fill={fill}
    pointerEvents={'none'}
  />
);

Segment.defaultProps = {
  fill: '#ffffff1a'
};