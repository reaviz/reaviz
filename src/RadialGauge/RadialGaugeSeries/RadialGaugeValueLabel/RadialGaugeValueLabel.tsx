import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

import { useCount } from '@/common/Count';
import type { ChartShallowDataShape } from '@/common/data';

import css from './RadialGaugeValueLabel.module.css';

export interface RadialGaugeValueLabelProps {
  /**
   * Data set by the `RadialGaugeSeries` component.
   */
  data: ChartShallowDataShape;

  /**
   * Classname to apply to the value label.
   */
  className?: any;
}

export const RadialGaugeValueLabel: FC<Partial<RadialGaugeValueLabelProps>> = ({
  data,
  className
}) => {
  const ref = useCount({
    to: data.data as number
  });

  return (
    <text
      dy="-0.5em"
      x="0"
      y="15"
      textAnchor="middle"
      className={classNames(className, css.valueLabel)}
      ref={ref}
    />
  );
};
