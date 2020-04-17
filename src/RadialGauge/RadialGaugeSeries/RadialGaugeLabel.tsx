import React, { PureComponent } from 'react';
import {
  ChartShallowDataShape,
  ChartInternalDataTypes
} from '../../common/data';
import { formatValue } from '../../common/utils/formatting';
import css from './RadialGaugeLabel.module.scss';
import classNames from 'classnames';

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

export class RadialGaugeLabel extends PureComponent<RadialGaugeLabelProps> {
  static defaultProps: Partial<RadialGaugeLabelProps> = {
    onClick: () => undefined
  };

  render() {
    const { data, className, offset, onClick } = this.props;
    const label = formatValue(data.key as ChartInternalDataTypes);

    return (
      <text
        dy="1.23em"
        x="0"
        y={offset}
        textAnchor="middle"
        onClick={nativeEvent => onClick({ data, nativeEvent })}
        className={classNames(className, css.valueLabel)}
      >
        {label}
      </text>
    );
  }
}
