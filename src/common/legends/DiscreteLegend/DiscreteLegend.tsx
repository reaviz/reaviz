import classNames from 'classnames';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React from 'react';

import css from './DiscreteLegend.module.css';
import type {
  DiscreteLegendEntry,
  DiscreteLegendEntryProps,
} from './DiscreteLegendEntry';

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
  orientation = 'vertical',
  style,
  className,
}) => (
  <div
    className={classNames(css.container, className, {
      [css.horizontal]: orientation === 'horizontal',
      [css.vertical]: orientation === 'vertical',
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
