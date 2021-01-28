import React, { FC } from 'react';
import { Axis, Node } from '../types';
import { formatValue } from '../../common/utils/formatting';
import css from './HiveTooltip.module.css';

interface HiveTooltipProps {
  axis: Axis[];
  node: Node;
  nodes: Node[];
}

export const HiveTooltip: FC<Partial<HiveTooltipProps>> = ({
  axis,
  nodes,
  node
}) => {
  const { label } = axis[node.x];
  const count = nodes.filter((n) => n.value === node.value).length;

  return (
    <>
      <div className={css.label}>
        {label} - {formatValue(node.value)}
      </div>
      <div className={css.value}>{formatValue(count)} Total</div>
    </>
  );
};
