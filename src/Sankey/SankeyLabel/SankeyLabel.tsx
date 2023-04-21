import React, { FC } from 'react';
import classNames from 'classnames';
import { SankeyNodeExtra } from '../utils';
import css from './SankeyLabel.module.css';

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
   * Label position.
   */
  position?: SankeyLabelPosition;

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
  format?: (value: SankeyLabelFormatProps) => string;
}

const LABEL_PADDING = 5;

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
  visible
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
        : node.title}
    </text>
  );
};

SankeyLabel.defaultProps = {
  active: false,
  fill: '#fff',
  position: 'inside',
  opacity: (active, disabled) => (active ? 1 : disabled ? 0.2 : 0.9),
  visible: true
};
