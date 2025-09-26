import type { FC } from 'react';
import React from 'react';

import { ChartTooltip, TooltipTemplate } from '@/common/Tooltip';

import type { BarProps } from '../BarChart';
import { Bar } from '../BarChart';

export type LinearGaugeBarProps = BarProps;

export const LinearGaugeBar: FC<Partial<LinearGaugeBarProps>> = (props) => (
  <Bar
    tooltip={
      <ChartTooltip
        placement="top"
        content={(data) => (
          <TooltipTemplate value={{ y: data.value, x: data.y }} />
        )}
      />
    }
    {...props}
  />
);
