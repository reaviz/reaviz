import React, { Component } from 'react';
import classNames from 'classnames';
import { Node } from '../utils';
import css from './SankeyLabel.module.css';

export type Location = 'inside' | 'outside';

export interface SankeyLabelProps {
  active: boolean;
  chartWidth?: number;
  className?: string;
  fill: string;
  location: Location;
  node?: Node;
  opacity: (active: boolean) => number;
  padding?: string | number;
  visible: boolean;
}

export class SankeyLabel extends Component<SankeyLabelProps> {
  static defaultProps: Partial<SankeyLabelProps> = {
    active: false,
    fill: '#fff',
    location: 'outside', // TODO: implement for inside
    opacity: (active) => (active ? 1 : 0.5),
    visible: true
  };

  render() {
    const {
      active,
      chartWidth,
      className,
      fill,
      node,
      opacity,
      padding,
      visible
    } = this.props;

    const nodePositions = {
      x0: node && node.x0 ? node.x0 : 0,
      y0: node && node.y0 ? node.y0 : 0,
      x1: node && node.x1 ? node.x1 : 0,
      y1: node && node.y1 ? node.y1 : 0
    };
    const width = chartWidth || 0;
    const showRightSide = nodePositions.x0 < width / 2;
    const textAnchor = showRightSide ? 'start' : 'end';

    return (
      visible &&
      node && (
        <text
          className={classNames(css.label, className)}
          x={showRightSide ? nodePositions.x1 + 6 : nodePositions.x0 - 6}
          y={(nodePositions.y1 + nodePositions.y0) / 2}
          dy="0.35em"
          textAnchor={textAnchor}
          fill={fill}
          opacity={opacity(active)}
          style={{ padding }}
        >
          {node.title}
        </text>
      )
    );
  }
}
