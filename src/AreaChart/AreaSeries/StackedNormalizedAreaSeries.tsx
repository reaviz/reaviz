import React, { FC, useMemo } from 'react';
import {
  AreaSeriesProps,
  AreaSeries,
  AREA_SERIES_DEFAULT_PROPS
} from './AreaSeries';
import { formatValue } from '@/common/utils/formatting';
import { TooltipTemplate, TooltipArea, ChartTooltip } from '@/common/Tooltip';
import { CloneElement } from 'reablocks';
import { POINT_SERIES_DEFAULT_PROPS, PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '@/ScatterPlot';

export const StackedNormalizedAreaSeries: FC<Partial<AreaSeriesProps>> = ({
  type,
  symbols,
  ...rest
}) => {
  const symbolsProps = useMemo(
    () => ({
      ...POINT_SERIES_DEFAULT_PROPS,
      ...symbols?.props
    }),
    [symbols]
  );

  return (
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
                element={symbolsProps.point}
                {...symbolsProps.point.props}
                tooltip={null}
              />
            }
          />
        )
      }
    />
  );
};

StackedNormalizedAreaSeries.defaultProps = {
  ...AREA_SERIES_DEFAULT_PROPS,
  type: 'stackedNormalized',
  tooltip: (
    <TooltipArea
      tooltip={
        <ChartTooltip
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
