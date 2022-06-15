import React, { FC } from 'react';
import { ChartShallowDataShape } from '../../../common/data';
import classNames from 'classnames';
import css from './RadialGaugeValueLabel.module.css';
import { useCount } from '../../../common/Count';

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
