import React, { FC } from 'react';
import { Bar, BarProps } from '../BarChart';
import { ChartTooltip, TooltipTemplate } from '../common/Tooltip';

export type LinearGaugeBarProps = BarProps;

export const LinearGaugeBar: FC<Partial<LinearGaugeBarProps>> = (props) => (
  <Bar {...props} />
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
