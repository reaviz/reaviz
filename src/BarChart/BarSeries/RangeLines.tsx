import React, { Component } from 'react';
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

export class RangeLines extends Component<RangeLinesProps> {
  static defaultProps: Partial<RangeLinesProps> = {
    position: 'top',
    strokeWidth: 1,
    layout: 'vertical'
  };

  getIsVertical() {
    return this.props.layout === 'vertical';
  }

  getEnter(rangeLineHeight: number) {
    const { x, y, height, position, width, data } = this.props;

    const isVertical = this.getIsVertical();
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
  }

  getExit(rangeLineHeight: number) {
    const { x, scale, height, width, y, position, type } = this.props;

    const isVertical = this.getIsVertical();
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
  }

  getLineHeight() {
    const { height, width, strokeWidth } = this.props;
    const isVertical = this.getIsVertical();

    return Math.min(strokeWidth, isVertical ? height : width);
  }

  getHeightWidth(rangeLineHeight: number) {
    const { height, width } = this.props;
    const isVertical = this.getIsVertical();

    return {
      width: isVertical ? width : rangeLineHeight,
      height: isVertical ? rangeLineHeight : height
    };
  }

  getDelay() {
    const { animated, index, barCount, layout } = this.props;

    let delay = 0;
    if (animated) {
      if (layout === 'vertical') {
        return (index / barCount) * 0.5;
      } else {
        return ((barCount - index) / barCount) * 0.5;
      }
    }

    return delay;
  }

  render() {
    const { color } = this.props;
    const rangeLineHeight = this.getLineHeight();
    const enterProps = this.getEnter(rangeLineHeight);
    const exitProps = this.getExit(rangeLineHeight);
    const { height, width } = this.getHeightWidth(rangeLineHeight);
    const delay = this.getDelay();

    // UGH: https://github.com/framer/motion/issues/384
    const initial = {
      ...exitProps,
      attrX: exitProps.x,
      attrY: exitProps.y
    };

    delete initial.x;
    delete initial.y;

    const animate = {
      ...enterProps,
      attrX: enterProps.x,
      attrY: enterProps.y
    };

    delete animate.x;
    delete animate.y;

    return (
      <motion.rect
        pointerEvents="none"
        fill={color}
        width={width}
        height={height}
        initial={initial}
        animate={animate}
        exit={initial}
        transition={{
          ...DEFAULT_TRANSITION,
          delay
        }}
      />
    );
  }
}
