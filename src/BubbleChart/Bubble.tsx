import React, { FC, Fragment, ReactElement, useRef, useState } from 'react';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from 'rdk';
import { motion } from 'framer-motion';

export interface BubbleProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: HierarchyCircularNode<any>;

  /**
   * Fill for the bubble.
   */
  fill: string;

  /**
   * Whether the chart is animated or not.
   */
   animated?: boolean;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Event for when the arc is clicked.
   */
  onClick?: (event) => void;

  /**
   * Event for when the arc has mouse enter.
   */
  onMouseEnter?: (event) => void;

  /**
   * Event for when the arc has mouse leave.
   */
  onMouseLeave?: (event) => void;
}

export const Bubble: FC<Partial<BubbleProps>> = ({
  id,
  data,
  fill,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltip = <ChartTooltip />
}) => {
  const [internalActive, setInternalActive] = useState<boolean>(false);
  const bubbleRef = useRef<any | null>(null);

  return (
    <Fragment>
      <motion.circle
        id={`${id}-bubble`}
        ref={bubbleRef}
        fill={fill}
        initial={{
          r: data.r,
          cx: data.x,
          cy: data.y
        }}
        animate={{
          r: data.r,
          cx: data.x,
          cy: data.y
        }}
        onClick={onClick}
        onMouseEnter={event => {
          setInternalActive(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={event => {
          setInternalActive(false);
          onMouseLeave?.(event);
        }}
      />
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={!!internalActive}
          reference={bubbleRef}
          value={{ y: data.data.data, x: data.data.key }}
        />
      )}
    </Fragment>
  );
};
