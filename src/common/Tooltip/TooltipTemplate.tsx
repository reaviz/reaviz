import React, { Fragment, FC } from 'react';
import { formatValue } from '../utils/formatting';
import { ChartInternalDataTypes } from '../data';
import css from './TooltipTemplate.module.css';

interface SingleTooltipValue {
  key?: ChartInternalDataTypes;
  value?: ChartInternalDataTypes;
  x: ChartInternalDataTypes;
  y: ChartInternalDataTypes;
}

interface MultipleTooltipValues {
  x: ChartInternalDataTypes;
  data: SingleTooltipValue[];
}

interface TooltipTemplateProps {
  /**
   * Tooltip data value.
   */
  value?: SingleTooltipValue | MultipleTooltipValues;

  /**
   * Color scheme to apply.
   */
  color?: any;

  /**
   * Additional CSS classes to apply.
   */
  className?: any;
}

export const TooltipTemplate: FC<TooltipTemplateProps> = ({
  value,
  color,
  className
}) => {
  if (!value) {
    return null;
  }

  const renderValues = (data: SingleTooltipValue, index: number) => {
    const fill = color(data, index);

    return (
      <span className={css.subValue}>
        <span className={css.subValueColor} style={{ backgroundColor: fill }} />
        <span className={css.subValueName}>
          {formatValue(data.key || data.x)}:
        </span>
        <span>{formatValue(data.value || data.y)}</span>
      </span>
    );
  };

  const renderMultiple = (value: MultipleTooltipValues) => {
    const excessCount = value.data.length - 15;
    const pagedValues = value.data.slice(0, 15);

    return (
      <Fragment>
        {pagedValues.map((point, i) => (
          <Fragment key={i}>{renderValues(point, i)}</Fragment>
        ))}
        {excessCount > 0 && <div>...{excessCount} more...</div>}
      </Fragment>
    );
  };

  const isMultiple = Array.isArray((value as any).data);

  return (
    <div className={className} role="tooltip">
      <div className={css.label}>{formatValue(value!.x)}</div>
      <div className={css.value}>
        {isMultiple && renderMultiple(value as MultipleTooltipValues)}
        {!isMultiple && (
          <Fragment>
            {formatValue(
              (value as SingleTooltipValue).value ||
                (value as SingleTooltipValue).y
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
