import React, { FC } from 'react';
import { MaskProps } from './Mask';

export interface StripesProps extends MaskProps {
  /**
   * Unique id for the pattern. Set internally by the parent component.
   */
  id?: string;

  /**
   * Fill color of the stripe.
   */
  fill?: string;
}

export const Stripes: FC<StripesProps> = ({ id, fill }) => (
  <pattern
    id={id}
    width="4"
    height="4"
    patternUnits="userSpaceOnUse"
    patternTransform="rotate(45)"
  >
    <rect className="area-stripe" width="1" height="4" fill={fill} />
  </pattern>
);
