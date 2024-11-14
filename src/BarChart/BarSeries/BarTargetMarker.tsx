import React, { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChartInternalShallowDataShape,
  DEFAULT_TRANSITION,
  Direction
} from '@/common';
import { BarType } from './Bar';

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
   * Color of the text.
   */
  fill: string;

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
   * Type of bar chart to render. Set internally by `BarSeries`.
   */
  type: BarType;

  /**
   * Padding of the label.
   */
  padding: number;

  /**
   * Class name to apply to the text.
   */
  className?: any;

  /**
   * Thickness of the line.
   */
  lineThickness?: number;
}

export const BarTargetMarker: FC<Partial<BarTargetMarkerProps>> = ({
  data,
  height,
  width,
  x,
  y,
  animated,
  layout,
  scale,
  index,
  barCount,
  fill,
  lineThickness = 2
}) => {
  const isVertical = useMemo(() => layout === 'vertical', [layout]);
  const valuePosition = useMemo(() => scale(data.value), [data.value, scale]);
  const targetPosition = useMemo(
    () => scale(data.target),
    [data.target, scale]
  );

  const enterProps = useMemo(() => {
    let newY = y;
    let newX = x;

    if (isVertical) {
      newY = targetPosition;
    } else {
      newX = targetPosition;
    }

    return {
      translateX: newX,
      translateY: newY,
      opacity: 1
    };
  }, [isVertical, targetPosition, x, y]);

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

  const delta = useMemo(() => {
    return Math.abs(valuePosition - targetPosition);
  }, [valuePosition, targetPosition]);

  const isTargetGreaterThanValue = useMemo(() => {
    return targetPosition > valuePosition;
  }, [valuePosition, targetPosition]);

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
      {isVertical && (
        <motion.rect
          width={Math.max(lineThickness, 0)}
          height={Math.max(delta, 0)}
          fill={fill}
          animate={{
            x: width / 2,
            y: isTargetGreaterThanValue ? -delta : 0
          }}
          transition={DEFAULT_TRANSITION}
        />
      )}
      {!isVertical && (
        <motion.rect
          width={Math.max(delta, 0)}
          height={Math.max(lineThickness, 0)}
          fill={fill}
          animate={{
            x: isTargetGreaterThanValue ? -delta : 0,
            y: height / 2
          }}
          transition={DEFAULT_TRANSITION}
        />
      )}
      <motion.rect
        width={isVertical ? width : lineThickness}
        height={isVertical ? lineThickness : height}
        fill={fill}
      />
    </motion.g>
  );
};

BarTargetMarker.defaultProps = {
  layout: 'vertical',
  padding: 5,
  fill: '#8F979F'
};
