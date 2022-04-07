import React, { Component, ReactNode, ReactElement, FC } from 'react';
import classNames from 'classnames';
import {
  DiscreteLegendSymbol,
  DiscreteLegendSymbolProps
} from './DiscreteLegendSymbol';
import { CloneElement } from 'rdk';
import css from './DiscreteLegendEntry.module.css';

export interface DiscreteLegendEntryProps {
  /**
   * Label for the entry.
   */
  label: string;

  /**
   * Color for the entry.
   */
  color: string;

  /**
   * Symbol for the entry.
   */
  symbol:
    | ReactElement<DiscreteLegendSymbolProps, typeof DiscreteLegendSymbol>
    | ReactNode;

  /**
   * CSS Styles.
   */
  style?: React.CSSProperties;

  /**
   * CSS Class names.
   */
  className?: string;

  /**
   * HTML Title Attribute.
   */
  title?: string;

  /**
   * Orientation of the entry set internally by `DiscreteLegend`.
   */
  orientation: 'horizontal' | 'vertical';

  /**
   * Mouse enter event.
   */
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Mouse leave event.
   */
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * On click event.
   */
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const DiscreteLegendEntry: FC<Partial<DiscreteLegendEntryProps>> = ({
  label,
  symbol,
  title,
  className,
  color,
  style,
  orientation,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => (
  <div
    title={title}
    className={classNames(css.entry, className, {
      [css.vertical]: orientation === 'vertical',
      [css.horizontal]: orientation === 'horizontal'
    })}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={style}
  >
    <CloneElement<DiscreteLegendSymbolProps> element={symbol} color={color} />
    <span className={css.label}>{label}</span>
  </div>
);

DiscreteLegendEntry.defaultProps = {
  symbol: <DiscreteLegendSymbol />,
  orientation: 'horizontal'
};
