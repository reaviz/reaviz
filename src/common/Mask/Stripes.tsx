import type { FC } from 'react';
import React from 'react';

import type { MaskProps } from './Mask';

export interface StripesProps extends MaskProps {
  id?: string;
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
