import React, { PureComponent } from 'react';
import { ChartShallowDataShape } from '../../common/data';
import CountUp from 'react-countup';
import classNames from 'classnames';
import css from './RadialGaugeValueLabel.module.scss';

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

export class RadialGaugeValueLabel extends PureComponent<
  RadialGaugeValueLabelProps
> {
  static defaultProps: Partial<RadialGaugeValueLabelProps> = {};

  render() {
    const { data, className } = this.props;

    // TODO: Get seperator based on locale
    return (
      <CountUp
        start={0}
        end={data.data as number}
        delay={0}
        duration={1}
        separator=","
      >
        {({ countUpRef }) => (
          <text
            dy="-0.5em"
            x="0"
            y="15"
            textAnchor="middle"
            className={classNames(className, css.valueLabel)}
            ref={countUpRef}
          />
        )}
      </CountUp>
    );
  }
}
