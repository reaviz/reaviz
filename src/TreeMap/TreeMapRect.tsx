import React, { FC, ReactElement, useRef, useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import chroma from 'chroma-js';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from 'rdk';
import { DEFAULT_TRANSITION } from '../common/Motion';

export interface TreeMapRectProps {
  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * Fill for the rect.
   */
  fill: string;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;

  /**
   * Cursor for the element.
   */
  cursor?: string;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Event for when the arc is clicked.
   */
  onClick?: (event, data) => void;

  /**
   * Event for when the arc has mouse enter.
   */
  onMouseEnter?: (event, data) => void;

  /**
   * Event for when the arc has mouse leave.
   */
  onMouseLeave?: (event, data) => void;
}

export const TreeMapRect: FC<Partial<TreeMapRectProps>> = ({
  data,
  fill,
  animated,
  cursor,
  tooltip,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const [internalActive, setInternalActive] = useState<boolean>(false);
  const rectRef = useRef<any | null>(null);
  const transition = animated ? DEFAULT_TRANSITION : { type: false, delay: 0 };
  const currentFill = internalActive ? chroma(fill).darken(0.8).hex() : fill;

  return (
    <Fragment>
      <motion.rect
        ref={rectRef}
        initial={{
          fill: currentFill,
          width: data.x1 - data.x0,
          height: data.y1 - data.y0
        }}
        animate={{
          fill: currentFill,
          width: data.x1 - data.x0,
          height: data.y1 - data.y0
        }}
        style={{ cursor }}
        transition={transition}
        onClick={(event) => {
          onClick?.(event, data);
        }}
        onMouseEnter={(event) => {
          setInternalActive(true);
          onMouseEnter?.(event, data);
        }}
        onMouseLeave={(event) => {
          setInternalActive(false);
          onMouseLeave?.(event, data);
        }}
      />
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!internalActive}
          reference={rectRef}
          value={{ y: data.data.data, x: data.data.key }}
        />
      )}
    </Fragment>
  );
};

TreeMapRect.defaultProps = {
  cursor: 'pointer',
  tooltip: <ChartTooltip />
};
