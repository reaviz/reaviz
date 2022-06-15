import React, { FC } from 'react';
import {
  ChartShallowDataShape,
  ChartInternalDataTypes
} from '../../../common/data';
import { formatValue } from '../../../common/utils';
import classNames from 'classnames';
import css from './RadialGaugeLabel.module.css';

export interface RadialGaugeLabelProps {
  /**
   * Data set by the `RadialGaugeSeries` component.
   */
  data: ChartShallowDataShape;

  /**
   * Offset set by the `RadialGaugeSeries` component.
   */
  offset: number;

  /**
   * Classname to apply to the label.
   */
  className?: any;

  /**
   * Label click event.
   */
  onClick: (event: { data; nativeEvent }) => void;
}

export const RadialGaugeLabel: FC<Partial<RadialGaugeLabelProps>> = ({
  data,
  className,
  offset,
  onClick = () => undefined
}) => {
  const label = formatValue(data.key as ChartInternalDataTypes);

  return (
    <text
      x="0"
      y={offset}
      textAnchor="middle"
      // This is only valid when placed below the chart
      alignmentBaseline={'text-after-edge'}
      onClick={(nativeEvent) => onClick({ data, nativeEvent })}
      className={classNames(className, css.valueLabel)}
    >
      {label}
    </text>
  );
};
