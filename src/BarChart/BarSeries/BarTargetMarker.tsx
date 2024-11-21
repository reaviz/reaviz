import React, { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChartInternalShallowDataShape,
  DEFAULT_TRANSITION,
  Direction
} from '@/common';

export interface BarTargetMarkerProps {
  /**
   * Height of the bar.
   */
  height: number;

  /**
   * Width of the bar.
   */
  width: number;

  /**
   * SVG x attribute for the bar.
   */
  x: number;

  /**
   * SVG y attribute for the bar.
   */
  y: number;

  /**
   * Group index or index of the bar. Set internally by `BarSeries`.
   */
  index: number;

  /**
   * D3 scale for Axis. Set internally by `BarChart`.
   */
  scale: any;

  /**
   * Parsed data shape. Set internally by `BarChart`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Color of the target marker line.
   */
  fill: string;

  /**
   * Color of the positive delta line.
   */
  positiveDeltaFill: string;

  /**
   * Color of the negative delta line.
   */
  negativeDeltaFill: string;

  /**
   * Number of the bars in the bar group. Set internally by `BarSeries`.
   */
  barCount: number;

  /**
   * Layout of bar chart to render. Set internally by `BarSeries`.
   */
  layout: Direction;

  /**
   * Whether to animate the enter/update/exit. Set internally by `BarSeries`.
   */
  animated: boolean;

  /**
   * Class name to apply to the text.
   */
  className?: string;

  /**
   * Thickness of the target marker line.
   */
  targetStrokeWidth?: number;

  /**
   * Thickness of the difference/delta line that shows distance between target and actual value.
   */
  deltaStrokeWidth?: number;
}

export const BarTargetMarker: FC<Partial<BarTargetMarkerProps>> = ({
  data,
  height,
  width,
  x,
  y,
  animated,
  layout = 'vertical',
  scale,
  index,
  barCount,
  fill = '#fff',
  positiveDeltaFill = '#00C49F',
  negativeDeltaFill = '#FF7361',
  targetStrokeWidth = 2,
  deltaStrokeWidth = 1
}) => {
  const isVertical = layout === 'vertical';
  const [valuePos, targetPos] = useMemo(
    () => [scale(data.value), scale(data.target)],
    [data.target, data.value, scale]
  );

  const enterProps = useMemo(() => {
    let newY = y;
    let newX = x;

    if (isVertical) {
      newY = targetPos;
    } else {
      newX = targetPos;
    }

    return {
      translateX: newX,
      translateY: newY,
      opacity: 1
    };
  }, [isVertical, targetPos, x, y]);

  const exitProps = useMemo(() => {
    let newY = y;
    let newX = x;

    if (isVertical) {
      const maxY = Math.max(...scale.range());
      newY = maxY;

      newX = newX + width / 2;
    } else {
      const minX = Math.min(...scale.range());
      newX = minX;
    }

    return {
      translateY: newY,
      translateX: newX,
      opacity: 0
    };
  }, [isVertical, scale, width, x, y]);

  const delay = useMemo(() => {
    let delay = 0;
    if (animated) {
      return (index / barCount) * 0.5;
    }

    return delay;
  }, [animated, barCount, index]);

  const delta = Math.abs(valuePos - targetPos);
  const isTargetGreaterThanValue = targetPos > valuePos;
  const targetWidth = isVertical ? width : targetStrokeWidth;
  const targetHeight = isVertical ? targetStrokeWidth : height;
  const deltaWidth = isVertical
    ? Math.max(deltaStrokeWidth, 0)
    : Math.max(delta, 0);
  const deltaHeight = isVertical
    ? Math.max(delta, 0)
    : Math.max(deltaStrokeWidth, 0);
  const animateDelta = {
    x: isVertical ? width / 2 : isTargetGreaterThanValue ? -delta : 0,
    y: isVertical ? (isTargetGreaterThanValue ? -delta : 0) : height / 2
  };

  return (
    <motion.g
      initial={exitProps}
      animate={enterProps}
      exit={exitProps}
      transition={{
        ...DEFAULT_TRANSITION,
        delay
      }}
    >
      <motion.rect
        width={deltaWidth}
        height={deltaHeight}
        fill={isTargetGreaterThanValue ? positiveDeltaFill : negativeDeltaFill}
        animate={animateDelta}
        transition={DEFAULT_TRANSITION}
      />
      <rect width={targetWidth} height={targetHeight} fill={fill} />
    </motion.g>
  );
};
