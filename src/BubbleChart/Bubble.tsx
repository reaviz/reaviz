import type { HierarchyCircularNode } from 'd3-hierarchy';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment, useMemo, useRef, useState } from 'react';

import { getAriaLabel } from '@/common';
import type { Glow } from '@/common/Glow';
import { generateGlowStyles } from '@/common/Glow/utils';
import type { Gradient, GradientProps } from '@/common/Gradient';
import type { MaskProps } from '@/common/Mask';
import { Mask } from '@/common/Mask';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import type { ChartTooltipProps } from '@/common/Tooltip';
import { ChartTooltip } from '@/common/Tooltip';
import { useHoverIntent } from '@/common/utils/useHoverIntent';

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
  onClick?: (
    event: React.MouseEvent<SVGCircleElement>,
    currentItem?: HierarchyCircularNode<any>
  ) => void;

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
  const transition = animated
    ? DEFAULT_TRANSITION
    : { type: false as const, delay: 0 };

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

  const tooltipData = useMemo(
    () => ({ y: data.data.data, x: data.data.key }),
    [data]
  );
  const ariaLabelData = useMemo(() => getAriaLabel(tooltipData), [tooltipData]);

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
        onClick={(event) => onClick && onClick(event, data)}
        onPointerOver={pointerOver}
        onPointerOut={pointerOut}
        tabIndex={0}
        aria-label={ariaLabelData}
        role="graphics-document"
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
          value={tooltipData}
        />
      )}
    </Fragment>
  );
};
