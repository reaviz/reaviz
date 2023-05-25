import React, { FC } from 'react';
import classNames from 'classnames';
import css from './StackedRadialGaugeSupportingLabel.module.css';

export interface StackedRadialGaugeSupportingLabelProps {
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

export const StackedRadialGaugeSupportingLabel: FC<
  Partial<StackedRadialGaugeSupportingLabelProps>
> = ({ label, className, yOffset }) => (
  <>
    {label && (
      <text
        x="0"
        y={yOffset - 20}
        textAnchor="middle"
        alignmentBaseline="middle"
        className={classNames(className, css.stackedSupportingLabel)}
      >
        {label}
      </text>
    )}
  </>
);

StackedRadialGaugeSupportingLabel.defaultProps = {
  yOffset: 0
};
