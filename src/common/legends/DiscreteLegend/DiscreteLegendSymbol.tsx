import React, { PureComponent } from 'react';
import classNames from 'classnames';
import css from './DiscreteLegendSymbol.module.css';

export interface DiscreteLegendSymbolProps {
  /**
   * Color for the symbol set by the `DiscreteLegendEntry`.
   */
  color: string;

  /**
   * CSS Class names.
   */
  className?: any;
}

export class DiscreteLegendSymbol extends PureComponent<DiscreteLegendSymbolProps> {
  static defaultProps: Partial<DiscreteLegendSymbolProps> = {};

  render() {
    const { className, color } = this.props;

    return (
      <div
        className={classNames(css.symbol, className)}
        style={{ background: color }}
      />
    );
  }
}
