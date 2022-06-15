import React, { FC } from 'react';
import classNames from 'classnames';
import css from './StackedRadialGaugeValueLabel.module.css';

export interface StackedRadialGaugeValueLabelProps {
  /**
   * A label shown at the center
   */
  label: string;

  /**
   * A class name to apply
   */
  className?: string;

  /**
   * A y offset to apply to the label
   */
  yOffset?: number;
}

export const StackedRadialGaugeValueLabel: FC<
  Partial<StackedRadialGaugeValueLabelProps>
> = ({ label, className, yOffset }) => (
  <>
    {label && (
      <text
        x="0"
        y={yOffset}
        textAnchor="middle"
        alignmentBaseline="middle"
        className={classNames(className, css.stackedValueLabel)}
      >
        {label}
      </text>
    )}
  </>
);

StackedRadialGaugeValueLabel.defaultProps = {
  yOffset: 0
};
