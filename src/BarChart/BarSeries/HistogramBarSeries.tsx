import React, { Component, FC } from 'react';
import { BarSeriesProps, BarSeries } from './BarSeries';
import {
  ChartTooltip,
  TooltipTemplate,
  TooltipArea
} from '../../common/Tooltip';
import { formatValue } from '../../common/utils/formatting';
import { schemes } from '../../common/color';

export const HistogramBarSeries: FC<Partial<BarSeriesProps>> = ({
  type,
  ...rest
}) => <BarSeries {...rest} />;

HistogramBarSeries.defaultProps = {
  ...BarSeries.defaultProps,
  colorScheme: schemes.cybertron[0],
  tooltip: (
    <TooltipArea
      tooltip={
        <ChartTooltip
          followCursor={true}
          modifiers={{
            offset: '5px, 5px'
          }}
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
