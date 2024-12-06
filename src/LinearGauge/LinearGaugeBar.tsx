import React, { FC } from 'react';
import { Bar, BAR_DEFAULT_PROPS, BarProps } from '../BarChart';
import { ChartTooltip, TooltipTemplate } from '@/common/Tooltip';

export type LinearGaugeBarProps = BarProps;

export const LinearGaugeBar: FC<Partial<LinearGaugeBarProps>> = (props) => (
  <Bar {...BAR_DEFAULT_PROPS} {...props} />
);

LinearGaugeBar.defaultProps = {
  tooltip: (
    <ChartTooltip
      placement="top"
      content={(data) => (
        <TooltipTemplate value={{ y: data.value, x: data.y }} />
      )}
    />
  )
};
