import React, { FC, Fragment, ReactElement, useRef, useState } from 'react';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from 'rdk';
import { motion } from 'framer-motion';
import { Gradient, GradientProps } from '../common/Gradient';
import { Mask, MaskProps } from '../common/Mask';
import { DEFAULT_TRANSITION } from '../common/Motion';
import { useHoverIntent } from '../common/utils/useHoverIntent';
import { Glow } from '../common/Glow';
import { generateGlowStyles } from '../common/Glow/utils';

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
   * Mask element for the bubble.
   */
  mask: ReactElement<MaskProps, typeof Mask> | null;

  /**
   * Glow styling for the bubble.
   */
  glow?: Glow;

  /**
   * Gradient shades for the bubble.
   */
  gradient: ReactElement<GradientProps, typeof Gradient> | null;

  /**
   * Event for when the bubble is clicked.
   */
  onClick?: (event) => void;

  /**
   * Event for when the mouse enters bubble.
   */
  onMouseEnter?: (event) => void;

  /**
   * Event for when the mouse leaves the bubble.
   */
  onMouseLeave?: (event) => void;
}

export const Bubble: FC<Partial<BubbleProps>> = ({
  id,
  data,
  fill,
  mask,
  gradient,
  glow,
  onClick,
  onMouseEnter,
  onMouseLeave,
  animated,
  tooltip = <ChartTooltip />
}) => {
  const [internalActive, setInternalActive] = useState<boolean>(false);
  const bubbleRef = useRef<any | null>(null);
  const transition = animated ? DEFAULT_TRANSITION : { type: false, delay: 0 };

  const { pointerOut, pointerOver } = useHoverIntent({
    onPointerOver: (event) => {
      setInternalActive(true);
      onMouseEnter?.(event);
    },
    onPointerOut: (event) => {
      setInternalActive(false);
      onMouseLeave?.(event);
    }
  });

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
        style={generateGlowStyles({ glow })}
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
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        tabIndex={0}
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
