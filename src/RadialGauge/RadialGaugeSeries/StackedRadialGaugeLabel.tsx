import React, { FC } from 'react';
import classNames from 'classnames';
import css from './StackedRadialGaugeValueLabel.module.css';

export interface StackedRadialGaugeLabelProps {
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

export const StackedRadialGaugeLabel: FC<
  Partial<StackedRadialGaugeLabelProps>
> = ({
  label,
  className,
  yOffset = 0
}) => (
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
