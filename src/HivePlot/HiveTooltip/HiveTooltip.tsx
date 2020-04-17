import React, { Component } from 'react';
import { Axis, Node } from '../types';
import { formatValue } from '../../common/utils/formatting';
import css from './HiveTooltip.module.scss';

interface HiveTooltipProps {
  axis: Axis[];
  node: Node;
  nodes: Node[];
}

export class HiveTooltip extends Component<HiveTooltipProps, {}> {
  render() {
    const {
      axis,
      nodes,
      node: { x, value }
    } = this.props;
    const { label } = axis[x];
    const count = nodes.filter(n => n.value === value).length;

    return (
      <div>
        <div className={css.label}>
          {label} - {formatValue(value)}
        </div>
        <div className={css.value}>{formatValue(count)} Total</div>
      </div>
    );
  }
}
