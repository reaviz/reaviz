import React, { FC } from 'react';
import { IVennLayout } from '@upsetjs/venn.js';
import { calculateDimensions } from '../common/utils';

export interface VennLabelProps {
  /**
   * The internal data object built by venn.js
   */
  data: IVennLayout<any>;

  /**
   * Font size of the text.
   */
  fontSize?: number;

  /**
   * Font family of the text.
   */
  fontFamily?: string;

  /**
   * Fill of the text.
   */
  fill?: string;
}

export const VennLabel: FC<Partial<VennLabelProps>> = ({
  data,
  fill = '#000',
  fontSize = 11,
  fontFamily = 'sans-serif'
}) => {
  const key = data.data.sets.join(' | ');
  const size = calculateDimensions(key, fontFamily, fontSize);
  const halfHeight = size.height / 2;
  const halfWidth = size.width / 2;
  const x = data.text.x - halfWidth;
  const y = data.text.y + halfHeight;

  return (
    <text x={x} y={y} style={{ pointerEvents: 'none', fontFamily, fontSize }} fill={fill}>
      {key}
    </text>
  );
};
