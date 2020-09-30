import React, { FC } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { calculateDimensions } from '../common/utils';

export interface VennLabelProps {
  data: IVennLayout<any>;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
}

export const VennLabel: FC<VennLabelProps> = ({
  data,
  fill = '#000',
  fontSize = 11,
  fontFamily = 'sans-serif',
}) => {
  const key = data.data.sets.join(' | ');
  const size = calculateDimensions(key, fontFamily, fontSize);
  const halfHeight = size.height / 2;
  const halfWidth = size.width / 2;
  const x = data.text.x - halfWidth;
  const y = data.text.y + halfHeight;

  return (
    <text x={x} y={y} style={{ pointerEvents: 'none' }} fill={fill}>
      {key}
    </text>
  );
};
