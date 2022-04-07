import React, { FC, ReactElement } from 'react';
import classNames from 'classnames';
import { CloneElement } from 'rdk';
import {
  DiscreteLegendEntryProps,
  DiscreteLegendEntry
} from './DiscreteLegendEntry';
import css from './DiscreteLegend.module.css';

export interface DiscreteLegendProps {
  /**
   * CSS Class name.
   */
  className?: string;

  /**
   * CSS Styles.
   */
  style?: React.CSSProperties;

  /**
   * Orientation of the legend.
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Entry components to show in the legend.
   */
  entries: ReactElement<DiscreteLegendEntryProps, typeof DiscreteLegendEntry>[];
}

export const DiscreteLegend: FC<Partial<DiscreteLegendProps>> = ({
  entries,
  orientation,
  style,
  className
}) => (
  <div
    className={classNames(css.container, className, {
      [css.horizontal]: orientation === 'horizontal',
      [css.vertical]: orientation === 'vertical'
    })}
    style={style}
  >
    {entries.map((entry, index) => (
      <CloneElement<DiscreteLegendEntryProps>
        element={entry}
        key={`dle-${index}`}
        orientation={orientation}
      />
    ))}
  </div>
);

DiscreteLegend.defaultProps = {
  orientation: 'vertical'
};
