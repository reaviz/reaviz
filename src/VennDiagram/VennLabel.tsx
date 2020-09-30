import React, { FC } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';

export interface VennLabelProps {
  data: IVennLayout<any>;
}

export const VennLabel: FC<VennLabelProps> = ({ data }) => {
  const key = data.data.sets.join(' | ');

  return (
    <text x={data.text.x} y={data.text.y}>
      {key}
    </text>
  );
};
