import React, { Component, ReactNode, ReactElement } from 'react';
import css from './DiscreteLegendEntry.module.scss';
import classNames from 'classnames';
import {
  DiscreteLegendSymbol,
  DiscreteLegendSymbolProps
} from './DiscreteLegendSymbol';
import { CloneElement } from '../../utils/children';

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
  style?: any;

  /**
   * CSS Class names.
   */
  className?: any;

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

export class DiscreteLegendEntry extends Component<DiscreteLegendEntryProps> {
  static defaultProps: Partial<DiscreteLegendEntryProps> = {
    symbol: <DiscreteLegendSymbol />,
    orientation: 'horizontal',
    onMouseEnter: () => undefined,
    onMouseLeave: () => undefined,
    onClick: () => undefined
  };

  render() {
    const {
      label,
      symbol,
      onMouseEnter,
      onMouseLeave,
      title,
      color,
      style,
      onClick,
      orientation
    } = this.props;
    const className = classNames(css.entry, this.props.className, {
      [css.vertical]: orientation === 'vertical',
      [css.horizontal]: orientation === 'horizontal'
    });

    return (
      <div
        title={title}
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
      >
        <CloneElement<DiscreteLegendSymbolProps>
          element={symbol}
          color={color}
        />
        <span className={css.label}>{label}</span>
      </div>
    );
  }
}
