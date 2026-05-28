import React, { FC } from 'react';

export interface MaskProps {
  /**
   * Unique id for the mask. Set internally by the parent component.
   */
  id?: string;

  /**
   * Fill applied to the mask rectangle.
   */
  fill?: string;
}

export const Mask: FC<MaskProps> = ({ id, fill }) => (
  <mask id={id}>
    <rect x="0" y="0" width="100%" height="100%" fill={fill} />
  </mask>
);
