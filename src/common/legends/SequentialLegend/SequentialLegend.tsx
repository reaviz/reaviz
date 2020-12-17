import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { ChartDataShape } from '../../../common/data';
import chroma from 'chroma-js';
import { uniqueBy } from '../../../common/utils/array';
import { extent } from 'd3-array';
import { formatValue } from '../../utils/formatting';
import css from './SequentialLegend.module.css';

export interface SequentialLegendProps {
  /**
   * CSS Class name.
   */
  className?: any;

  /**
   * CSS Styles.
   */
  style?: any;

  /**
   * Orientation of the legend.
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Data to use to render the scale.
   */
  data: ChartDataShape[];

  /**
   * Color scheme for the scale.
   */
  colorScheme: string[];
}

export class SequentialLegend extends PureComponent<SequentialLegendProps> {
  static defaultProps: Partial<SequentialLegendProps> = {
    colorScheme: ['rgba(28, 107, 86, 0.5)', '#2da283'],
    orientation: 'vertical'
  };

  render() {
    const { orientation, className, style, colorScheme, data } = this.props;

    // Generate the color gradient
    const color = chroma
      .scale(colorScheme)
      .colors(10)
      .reverse()
      .map((c, i) => `${c} ${i * 10}%`)
      .join(',');

    // Get the extent from the data passed
    const [end, start] = extent(
      uniqueBy(
        data,
        (d) => d.data,
        (d) => d.data
      )
    );

    // Get direction
    const gradientDir = orientation === 'vertical' ? '' : 'to left,';

    return (
      <div
        style={style}
        className={classNames(css.container, className, {
          [css.vertical]: orientation === 'vertical',
          [css.horizontal]: orientation === 'horizontal'
        })}
      >
        <div className={css.start}>{formatValue(start)}</div>
        <div
          className={css.gradient}
          style={{
            background: `linear-gradient(${gradientDir}${color})`
          }}
        />
        <div className={css.end}>{formatValue(end)}</div>
      </div>
    );
  }
}
