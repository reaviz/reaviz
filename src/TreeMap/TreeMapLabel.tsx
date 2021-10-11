import React, { FC } from 'react';
import { wrapText } from '../common/utils';
import { formatValue } from '../common/utils/formatting';

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
}

export const TreeMapLabel: FC<Partial<TreeMapLabelProps>> = ({
  id,
  data,
  fill,
  wrap,
  fontSize,
  fontFamily
}) => {
  const key = data.data.key;
  const text = wrap ? wrapText({
    key,
    fontFamily,
    fontSize,
    paddingX: 10,
    paddingY: 10,
    width: data.x1 - data.x0,
    height: data.y1 - data.y0
  }) : key;

  return (
    <g style={{ transform: 'translate(10px, 15px)' }}>
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

TreeMapLabel.defaultProps = {
  fill: '#FFF',
  wrap: true,
  fontSize: 14,
  fontFamily: 'sans-serif'
};
