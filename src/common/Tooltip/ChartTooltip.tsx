import React, { cloneElement, FC } from 'react';
import { Tooltip, TooltipProps } from 'realayers';
import { TooltipTemplate } from './TooltipTemplate';

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
  content,
  value,
  data,
  color,
  ...rest
}) => (
  <Tooltip
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
          color
        });
    }}
  />
);

ChartTooltip.defaultProps = {
  content: <TooltipTemplate />,
};
