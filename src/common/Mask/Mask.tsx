import React, { FC } from 'react';

export interface MaskProps {
  id?: string;
  fill?: string;
}

export const Mask: FC<MaskProps> = ({ id, fill }) => (
  <mask id={id}>
    <rect x="0" y="0" width="100%" height="100%" fill={fill} />
  </mask>
);
