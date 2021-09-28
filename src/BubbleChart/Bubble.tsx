import React, { FC, Fragment, ReactElement, useRef, useState } from 'react';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from 'rdk';
import { motion } from 'framer-motion';
import { Gradient, GradientProps } from '../common/Gradient';
import { Mask, MaskProps } from '../common/Mask';
import { DEFAULT_TRANSITION } from '../common/Motion';

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
   * Mask element for the arc.
   */
  mask: ReactElement<MaskProps, typeof Mask> | null;

  /**
   * Gradient shades for the arc.
   */
  gradient: ReactElement<GradientProps, typeof Gradient> | null;

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
  mask,
  gradient,
  onClick,
  onMouseEnter,
  onMouseLeave,
  animated,
  tooltip = <ChartTooltip />
}) => {
  const [internalActive, setInternalActive] = useState<boolean>(false);
  const bubbleRef = useRef<any | null>(null);
  const transition = animated ? DEFAULT_TRANSITION : { type: false, delay: 0 };

  const arcFill =
    gradient && !mask
      ? `url(#gradient-${id})`
      : mask
        ? `url(#mask-pattern-${id})`
        : fill;

  return (
    <Fragment>
      <motion.circle
        id={`${id}-bubble`}
        ref={bubbleRef}
        fill={arcFill}
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
        transition={transition}
        onClick={onClick}
        onMouseEnter={(event) => {
          setInternalActive(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setInternalActive(false);
          onMouseLeave?.(event);
        }}
      />
      {mask && (
        <Fragment>
          <Mask id={`mask-${id}`} fill={`url(#gradient-${id})`} />
          <CloneElement<MaskProps>
            element={mask}
            id={`mask-pattern-${id}`}
            fill={fill}
          />
        </Fragment>
      )}
      {gradient && (
        <CloneElement<GradientProps>
          element={gradient}
          id={`gradient-${id}`}
          color={fill}
        />
      )}
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
