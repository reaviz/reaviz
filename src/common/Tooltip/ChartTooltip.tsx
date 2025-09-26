import type { TooltipProps } from 'reablocks';
import { Tooltip } from 'reablocks';
import type { FC } from 'react';
import React, { cloneElement } from 'react';

import { TooltipTemplate } from './TooltipTemplate';
import { tooltipTheme } from './TooltipTheme';

export interface ChartTooltipProps extends TooltipProps {
  /**
   * Content for the tooltip.
   */
  content: any;

  /**
   * Tooltip data value.
   */
  value?: any;

  /**
   * Color scheme to apply.
   */
  color?: any;

  /**
   * Complete dataset.
   */
  data: any;

  /**
   * Whether the tooltip should move with the cursor or not.
   */
  followCursor?: boolean;
}

export const ChartTooltip: FC<Partial<ChartTooltipProps>> = ({
  content = <TooltipTemplate />,
  value,
  data,
  color,
  ...rest
}) => {
  return (
    <Tooltip
      theme={tooltipTheme}
      {...rest}
      content={() => {
        if (!value && !data) {
          return null;
        }

        return typeof content === 'function'
          ? content(data || value, color)
          : cloneElement(content, {
              ...content.props,
              value,
              color,
            });
      }}
    />
  );
};
