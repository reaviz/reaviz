import React, { FC, PureComponent, useMemo } from 'react';
import { ChartInternalShallowDataShape, Direction } from '../../common/data';
import { BarType } from './Bar';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../../common/Motion';

export interface BarLabelProps {
  /**
   * Text of the label. Set internally by `Bar`.
   */
  text: string;

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
   * Position of the label.
   */
  position: 'top' | 'center' | 'bottom';

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
   * Font size of the text.
   */
  fontSize: number;

  /**
   * Font family of the text.
   */
  fontFamily: string;

  /**
   * Padding of the label.
   */
  padding: number;

  /**
   * Class name to apply to the text.
   */
  className?: any;
}

export const BarLabel: FC<BarLabelProps> = ({
  fontSize,
  fontFamily,
  fill,
  layout,
  className,
  text,
  x,
  y,
  height,
  position,
  width,
  data,
  padding,
  scale,
  type,
  animated,
  index,
  barCount
}) => {
  const isVertical = useMemo(() => layout === 'vertical', [layout]);
  const textAnchor = isVertical ? 'middle' : 'start';

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
        newY = y - padding;
      } else if (direction === 'center') {
        newY = y + height / 2;
      } else if (direction === 'bottom') {
        newY = y + height - padding;
      }
      newX = newX + width / 2;
    } else {
      if (direction === 'top') {
        newX = x + width + padding;
      } else if (direction === 'center') {
        newX = x + width / 2;
      } else if (direction === 'bottom') {
        newX = x + padding;
      }
      newY = newY + height / 2;
    }

    return {
      translateX: newX,
      translateY: newY,
      opacity: 1
    };
  }, [data.x0, data.y, height, isVertical, padding, position, width, x, y]);

  const exitProps = useMemo(() => {
    let newY = y;
    let newX = x;

    if (isVertical) {
      const maxY = Math.max(...scale.range());
      if (position === 'top') {
        newY = maxY;
      } else {
        newY = maxY + height + padding;
      }

      newX = newX + width / 2;
    } else {
      const minX = Math.min(...scale.range());
      if (position === 'top') {
        newX = minX;
      } else {
        newX = minX + width + padding;
      }

      newY = newY + height / 2;
    }

    if (type === 'stackedDiverging') {
      if (isVertical) {
        newY = newY / 2;
      } else {
        newX = newX / 2;
      }
    }

    return {
      translateY: newY,
      translateX: newX,
      opacity: 0
    };
  }, [height, isVertical, padding, position, scale, type, width, x, y]);

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

  return (
    <motion.g
      initial={exitProps}
      animate={enterProps}
      exit={exitProps}
      transition={{
        ...DEFAULT_TRANSITION,
        delay
      }}
      fontSize={fontSize}
      fontFamily={fontFamily}
    >
      <text fill={fill} className={className} textAnchor={textAnchor}>
        {text}
      </text>
    </motion.g>
  );
};

BarLabel.defaultProps = {
  position: 'top',
  layout: 'vertical',
  fontSize: 13,
  padding: 5,
  fontFamily: 'sans-serif',
  fill: '#000'
};
