import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import { CloneElement } from '../../utils/children';
import {
  DiscreteLegendEntryProps,
  DiscreteLegendEntry
} from './DiscreteLegendEntry';
import css from './DiscreteLegend.module.scss';

export interface DiscreteLegendProps {
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
   * Entry components to show in the legend.
   */
  entries: ReactElement<DiscreteLegendEntryProps, typeof DiscreteLegendEntry>[];
}

export class DiscreteLegend extends Component<DiscreteLegendProps> {
  static defaultProps: Partial<DiscreteLegendProps> = {
    orientation: 'vertical'
  };

  render() {
    const { entries, orientation, style } = this.props;
    const className = classNames(css.container, this.props.className, {
      [css.horizontal]: orientation === 'horizontal',
      [css.vertical]: orientation === 'vertical'
    });

    return (
      <div className={className} style={style}>
        {entries.map((entry, index) => (
          <CloneElement<DiscreteLegendEntryProps>
            element={entry}
            key={`dle-${index}`}
          />
        ))}
      </div>
    );
  }
}
