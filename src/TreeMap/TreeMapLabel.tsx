import type { FC } from 'react';
import React from 'react';

import { calculateDimensions, wrapText } from '@/common/utils';

export interface TreeMapLabelProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: any;

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

  /**
   * Should wrap text or not.
   */
  wrap?: boolean;

  /**
   * Placement of the text.
   */
  placement?: 'start' | 'middle' | 'end';
}

export const TreeMapLabel: FC<Partial<TreeMapLabelProps>> = ({
  id,
  data,
  fill = '#FFF',
  wrap = true,
  placement = 'start',
  fontSize = 14,
  fontFamily = 'sans-serif',
}) => {
  const key = data.data.key;
  const width = data.x1 - data.x0;
  const text = wrapText({
    key,
    fontFamily,
    fontSize,
    paddingX: 10,
    wrap,
    paddingY: 10,
    width,
    height: data.y1 - data.y0,
  });
  const size = calculateDimensions(
    typeof text === 'string' ? text : key,
    fontFamily,
    fontSize,
  );

  const offsetX =
    placement === 'start'
      ? 10
      : placement === 'middle'
        ? (width - size.width) / 2
        : width - size.width - 10;

  return (
    <g style={{ transform: `translate(${offsetX}px, 15px)` }}>
      <text
        id={`${id}-text`}
        style={{ pointerEvents: 'none', fontFamily, fontSize }}
        fill={fill}
      >
        {text}
      </text>
    </g>
  );
};
