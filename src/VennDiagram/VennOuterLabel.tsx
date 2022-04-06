import React, { FC, Fragment, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../common/Motion';

export interface VennOuterLabelProps {
  /**
   * The internal data object built by venn.js
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
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Format label.
   */
  format?: (data) => any;
}

export const VennOuterLabel: FC<Partial<VennOuterLabelProps>> = ({
  data,
  format,
  animated,
  fill,
  fontSize,
  fontFamily
}) => {
  const transition = animated ? DEFAULT_TRANSITION : { delay: 0, type: false };
  const text = data.set.data.key;

  const label = format ? format(data) : text;
  const isElement = isValidElement(label);
  const showIcon = isElement && data.set.icon;

  // TODO: framer-motion doesn't seem to like the translates on the g
  // initial={pos} animate={pos}
  const pos = {
    x: showIcon ? data.set.icon.x : data.set.text.x,
    y: showIcon ? data.set.icon.y : data.set.text.y
  };

  return (
    <Fragment>
      {isElement ? (
        <g style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
          {label}
        </g>
      ) : (
        <motion.text
          fill={fill}
          style={{ pointerEvents: 'none', fontFamily, fontSize }}
          textAnchor={data.set.align === 'middle' ? 'center' : data.set.align}
          alignmentBaseline={data.set.verticalAlign}
          initial={
            {
              attrX: pos.x,
              attrY: pos.y
            } as any
          }
          animate={
            {
              attrX: pos.x,
              attrY: pos.y
            } as any
          }
          transition={transition}
        >
          {label}
        </motion.text>
      )}
    </Fragment>
  );
};

VennOuterLabel.defaultProps = {
  animated: true,
  fill: '#000',
  fontSize: 14,
  fontFamily: 'sans-serif'
};
