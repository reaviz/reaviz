import React, { FC } from 'react';
import { Bar, BarProps } from '../BarChart';
import {
  CHART_TOOLTIP_DEFAULT_PROPS,
  ChartTooltip,
  TooltipTemplate
} from '@/common/Tooltip';

export type LinearGaugeBarProps = BarProps;

export const LinearGaugeBar: FC<Partial<LinearGaugeBarProps>> = (props) => (
  <Bar
    tooltip={
      <ChartTooltip
        {...CHART_TOOLTIP_DEFAULT_PROPS}
        placement="top"
        content={(data) => (
          <TooltipTemplate value={{ y: data.value, x: data.y }} />
        )}
      />
    }
    {...props}
  />
);
