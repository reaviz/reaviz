import React, { FC } from 'react';
import classNames from 'classnames';
import { SankeyNodeExtra } from '../utils';
import css from './SankeyLabel.module.css';
import ellipsize from 'ellipsize';

export type SankeyLabelPosition = 'inside' | 'outside';

export interface SankeyLabelFormatProps {
  x: number;
  y: number;
  textAnchor: string;
  node: SankeyNodeExtra;
}

export interface SankeyLabelProps {
  /**
   * Whether the element is active or not. Set internally by `Sankey`.
   */
  active: boolean;

  /**
   * Whether the label is disabled. Set internally by `Sankey`.
   */
  disabled: boolean;

  /**
   * Width of the chart. Set internally by `Sankey`.
   */
  chartWidth?: number;

  /**
   * CSS class to apply.
   */
  className?: string;

  /**
   * Fill color.
   */
  fill: string;

  /**
   * Label position. Set internally by `Sankey`.
   */
  position?: SankeyLabelPosition;

   /**
   * Percentage of total width occupied by labels on 
   * either side of the graph inside the container.
   * Used for auto-ellipsizing labels
   * Set internally by `Sankey`.
   */
   labelPadding?: number;

  /**
   * Node data. Set internally by `Sankey`.
   */
  node?: SankeyNodeExtra;

  /**
   * Opacity callback. Used internally by `Sankey`.
   */
  opacity: (active: boolean, disabled: boolean) => number;

  /**
   * Padding between the label and the node.
   */
  padding?: string | number;

  /**
   * Whether to show the label or not.
   */
  visible: boolean;

  /**
   * Width of the node set by the 'Sankey'.
   */
  nodeWidth: number;

  /**
   * Custom formatting for the label.
   */
  format?: (value: SankeyLabelFormatProps) => any;

  /**
   * Specify the number of characters at which the text would be ellipsized.
   * Defaults to 'auto' based on available width and max cut-off at `LABEL_TRUNCATE_LENGTH=10`
   */
  ellipsis?: number | 'none' | 'auto'
}

const LABEL_PADDING = 5;
const LABEL_TRUNCATE_LENGTH = 10;

export const SankeyLabel: FC<Partial<SankeyLabelProps>> = ({
  active,
  chartWidth,
  className,
  nodeWidth,
  disabled,
  fill,
  format,
  node,
  position,
  opacity,
  padding,
  visible,
  ellipsis,
  labelPadding
}) => {
  const x0 = node?.x0 || 0;
  const x1 = node?.x1 || 0;
  const y0 = node?.y0 || 0;
  const y1 = node?.y1 || 0;
  const paddedWidth = nodeWidth + LABEL_PADDING;

  const width = chartWidth || 0;
  const showRightSide = x0 < width / 2;
  let x = showRightSide ? x1 + paddedWidth : x0 - paddedWidth;
  const y = (y1 + y0) / 2;

  let textAnchor = showRightSide ? 'start' : 'end';
  if (position === 'outside') {
    textAnchor = showRightSide ? 'end' : 'start';
    x = showRightSide ? x1 - paddedWidth : x0 + paddedWidth;
  }

  if (!visible || !node) {
    return null;
  }

  let truncatedTitle = '';
  if (ellipsis === 'auto') {
    // This math somehow works for now!
    const avaialableWidth = showRightSide ? x: width-x;
    truncatedTitle = ellipsize(node.title, Math.min(LABEL_TRUNCATE_LENGTH, avaialableWidth/(labelPadding*100)));
  } else if (ellipsis === 'none') {
    truncatedTitle = node.title;
  } else {
    truncatedTitle = ellipsize(node.title, ellipsis);
  }

  return (
    <text
      className={classNames(css.label, className)}
      x={x}
      y={y}
      dy="0.35em"
      textAnchor={textAnchor}
      fill={fill}
      opacity={opacity(active, disabled)}
      style={{ padding }}
    >
      {typeof format === 'function'
        ? format({ x, y, textAnchor, node })
        : truncatedTitle}
    </text>
  );
};

SankeyLabel.defaultProps = {
  active: false,
  fill: '#fff',
  position: 'inside',
  opacity: (active, disabled) => (active ? 1 : disabled ? 0.2 : 0.9),
  visible: true,
  ellipsis: 'auto'
};
