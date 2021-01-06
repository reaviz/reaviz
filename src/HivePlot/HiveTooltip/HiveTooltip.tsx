import React, { FC, useMemo } from 'react';
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
  node: { x, value }
}) => {
  const { label } = axis[x];
  const count = useMemo(() => nodes.filter((n) => n.value === value).length, [
    nodes,
    value
  ]);

  return (
    <div>
      <div className={css.label}>
        {label} - {formatValue(value)}
      </div>
      <div className={css.value}>{formatValue(count)} Total</div>
    </div>
  );
};
