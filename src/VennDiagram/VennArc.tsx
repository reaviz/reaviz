import React, { FC } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';

export interface VennArcProps {
  fill: string;
  data: IVennLayout<any>;
}

export const VennArc: FC<VennArcProps> = ({ data, fill }) => {
  return (
    <path
      opacity={.5}
      d={data.path}
      fill={fill}
    />
  );
};
