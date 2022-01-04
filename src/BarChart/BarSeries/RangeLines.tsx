import React, { FC, useMemo } from 'react';
import { ChartInternalShallowDataShape, Direction } from '../../common/data';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { BarType } from './Bar';

export interface RangeLinesProps {
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
   * Stroke width of the range line.
   */
  strokeWidth: number;

  /**
   * D3 scale for Axis. Set internally by `BarChart`.
   */
  scale: any;

  /**
   * Position of the range line.
   */
  position: 'top' | 'bottom';

  /**
   * Parsed data shape. Set internally by `BarChart`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Color for the range line.
   */
  color: string;

  /**
   * Total number of bars used for animation. Set internally by `BarSeries`.
   */
  barCount: number;

  /**
   * Direction of the chart. Set internally by `BarSeries`.
   */
  layout: Direction;

  /**
   * Whether to animate the enter/update/exit. Set internally by `BarSeries`.
   */
  animated: boolean;

  /**
   * Type of bar chart. Set internally by `BarSeries`.
   */
  type: BarType;
}

export const RangeLines: FC<Partial<RangeLinesProps>> = ({
  layout,
  color,
  x,
  y,
  scale,
  type,
  height,
  position,
  strokeWidth,
  width,
  animated,
  index,
  barCount,
  data
}) => {
  const isVertical = useMemo(() => layout === 'vertical', [layout]);
  const rangeLineHeight = useMemo(
    () => Math.min(strokeWidth, isVertical ? height : width),
    [height, isVertical, strokeWidth, width]
  );

  const [newWidth, newHeight] = useMemo(
    () => [
      isVertical ? width : rangeLineHeight,
      isVertical ? rangeLineHeight : height
    ],
    [height, isVertical, rangeLineHeight, width]
  );

  const enterProps = useMemo(() => {
    let newY = y;
    let newX = x;

    // If its diverging and the value is negative, we
    // need to reverse the type...
    const isTop = position === 'top';
    const direction = isVertical
      ? data.y < 0 && isTop
        ? 'bottom'
        : position
      : data.x0 < 0 && isTop
        ? 'bottom'
        : position;

    if (isVertical) {
      if (direction === 'top') {
        newY = y;
      } else {
        newY = y + height - rangeLineHeight;
      }
    } else {
      if (direction === 'top') {
        newX = x + width - rangeLineHeight;
      } else {
        newX = x;
      }
    }

    return {
      x: newX,
      y: newY,
      opacity: 1
    };
  }, [
    data.x0,
    data.y,
    height,
    isVertical,
    position,
    rangeLineHeight,
    width,
    x,
    y
  ]);

  const exitProps = useMemo(() => {
    let newY = y;
    let newX = x;

    if (isVertical) {
      const maxY = Math.max(...scale.range());
      if (position === 'top') {
        newY = maxY;
      } else {
        newY = maxY + height - rangeLineHeight;
      }
    } else {
      const minX = Math.min(...scale.range());
      if (position === 'top') {
        newX = minX;
      } else {
        newX = minX + width - rangeLineHeight;
      }
    }

    if (type === 'stackedDiverging') {
      if (isVertical) {
        newY = newY / 2;
      } else {
        newX = newX / 2;
      }
    }

    return {
      y: newY,
      x: newX,
      opacity: 0
    };
  }, [height, isVertical, position, rangeLineHeight, scale, type, width, x, y]);

  const delay = useMemo(() => {
    let delay = 0;
    if (animated) {
      if (layout === 'vertical') {
        return (index / barCount) * 0.5;
      } else {
        return ((barCount - index) / barCount) * 0.5;
      }
    }

    return delay;
  }, [animated, barCount, index, layout]);

  // UGH: https://github.com/framer/motion/issues/384
  const initial = useMemo(() => {
    const r = {
      ...exitProps,
      attrX: exitProps.x,
      attrY: exitProps.y
    };

    delete r.x;
    delete r.y;

    return r;
  }, [exitProps]);

  const animate = useMemo(() => {
    const r = {
      ...enterProps,
      attrX: enterProps.x,
      attrY: enterProps.y
    };

    delete r.x;
    delete r.y;

    return r;
  }, [enterProps]);

  return (
    <motion.rect
      pointerEvents="none"
      fill={color}
      width={newWidth}
      height={newHeight}
      initial={initial}
      animate={animate}
      exit={initial}
      transition={{
        ...DEFAULT_TRANSITION,
        delay
      }}
    />
  );
};

RangeLines.defaultProps = {
  position: 'top',
  strokeWidth: 1,
  layout: 'vertical'
};
