import { offset } from '@floating-ui/dom';
import type { FC } from 'react';
import React from 'react';

import { schemes } from '@/common/color';
import { ChartTooltip, TooltipArea, TooltipTemplate } from '@/common/Tooltip';
import { formatValue } from '@/common/utils/formatting';

import type { BarSeriesProps } from './BarSeries';
import { BAR_SERIES_DEFAULT_PROPS, BarSeries } from './BarSeries';

export const HistogramBarSeries: FC<Partial<BarSeriesProps>> = ({
  type,
  ...rest
}) => <BarSeries {...HISTOGRAM_BAR_SERIES_DEFAULT_PROPS} {...rest} />;

export const HISTOGRAM_BAR_SERIES_DEFAULT_PROPS = {
  ...BAR_SERIES_DEFAULT_PROPS,
  colorScheme: schemes.cybertron[0],
  tooltip: (
    <TooltipArea
      tooltip={
        <ChartTooltip
          followCursor={true}
          modifiers={[offset(5)]}
          content={(point, color) => {
            const data = {
              ...point,
              x: `${formatValue(point.x0)} - ${formatValue(point.x1)}`,
              value: point.y
            };

            return <TooltipTemplate value={data} color={color} />;
          }}
        />
      }
    />
  )
};
