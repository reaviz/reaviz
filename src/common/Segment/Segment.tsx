import { motion } from 'framer-motion';
import { FC } from 'react';

export interface SegmentProps {
  areaPath?: string;
  fill?: string;
}

export const Segment: FC<SegmentProps> = ({ areaPath, fill }) => (
  <motion.path
    d={areaPath}
    fill={fill}
    pointerEvents={'none'}
  />
)

Segment.defaultProps = {
  fill: '#ffffff1a'
}