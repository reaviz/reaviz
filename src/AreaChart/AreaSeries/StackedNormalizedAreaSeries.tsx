import React, { FC } from 'react';
import {
  AreaSeriesProps,
  AreaSeries,
  AREA_SERIES_DEFAULT_PROPS
} from './AreaSeries';
import { formatValue } from '@/common/utils/formatting';
import {
  TooltipTemplate,
  TooltipArea,
  ChartTooltip,
  TOOLTIP_AREA_DEFAULT_PROPS,
  CHART_TOOLTIP_DEFAULT_PROPS
} from '@/common/Tooltip';
import { CloneElement } from 'reablocks';
import { PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '@/ScatterPlot';

export const StackedNormalizedAreaSeries: FC<Partial<AreaSeriesProps>> = ({
  type,
  symbols,
  ...rest
}) => (
  <AreaSeries
    {...rest}
    type="stackedNormalized"
    symbols={
      symbols && (
        <CloneElement<PointSeriesProps>
          element={symbols}
          {...symbols.props}
          point={
            <CloneElement<ScatterPointProps>
              element={symbols.props.point}
              {...symbols.props.point.props}
              tooltip={null}
            />
          }
        />
      )
    }
  />
);

StackedNormalizedAreaSeries.defaultProps = {
  ...AREA_SERIES_DEFAULT_PROPS,
  type: 'stackedNormalized',
  tooltip: (
    <TooltipArea
      {...TOOLTIP_AREA_DEFAULT_PROPS}
      tooltip={
        <ChartTooltip
          {...CHART_TOOLTIP_DEFAULT_PROPS}
          content={(series, color) => {
            if (!series) {
              return null;
            }

            const value = {
              ...series,
              data: series.data.map((d) => ({
                ...d,
                value: `${formatValue(d.value)} ∙ ${formatValue(
                  Math.floor((d.y1 - d.y0) * 100)
                )}%`
              }))
            };

            return <TooltipTemplate color={color} value={value} />;
          }}
        />
      }
    />
  )
} as Partial<AreaSeriesProps>;
