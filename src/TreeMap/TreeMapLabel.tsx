import React, { FC } from 'react';

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
}

export const TreeMapLabel: FC<Partial<TreeMapLabelProps>> = ({
  id,
  data,
  fill = '#FFF',
  fontSize = 14,
  fontFamily = 'sans-serif'
}) => {

  return (
    <text
      id={`${id}-text`}
      style={{ pointerEvents: 'none', fontFamily, fontSize }}
      fill={fill}
      textAnchor="middle"
      x={15}
      y={15}
    >
      {data.data.key} - ${data.data.data}
    </text>
  );
};
