import React, { FC } from 'react';
import classNames from 'classnames';
import css from './StackedRadialGaugeDescriptionLabel.module.css';

export interface StackedRadialGaugeDescriptionLabelProps {
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

export const StackedRadialGaugeDescriptionLabel: FC<
  Partial<StackedRadialGaugeDescriptionLabelProps>
> = ({ label, className, yOffset = 0 }) => (
  <>
    {label && (
      <text
        x="0"
        y={yOffset - 20}
        textAnchor="middle"
        alignmentBaseline="middle"
        className={classNames(className, css.stackedDescriptionLabel)}
      >
        {label}
      </text>
    )}
  </>
);
