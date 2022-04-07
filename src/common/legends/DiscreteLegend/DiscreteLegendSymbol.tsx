import React, { FC } from 'react';
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
  className?: string;
}

export const DiscreteLegendSymbol: FC<Partial<DiscreteLegendSymbolProps>> = ({
  className,
  color
}) => (
  <div
    className={classNames(css.symbol, className)}
    style={{ background: color }}
  />
);
