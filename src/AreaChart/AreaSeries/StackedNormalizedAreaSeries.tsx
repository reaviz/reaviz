import { CloneElement } from 'reablocks';
import type { FC } from 'react';
import React, { useMemo } from 'react';

import type { InterpolationTypes } from '@/common';
import { ChartTooltip, TooltipArea, TooltipTemplate } from '@/common/Tooltip';
import { formatValue } from '@/common/utils/formatting';
import type { ScatterPointProps } from '@/ScatterPlot';

import type { AreaSeriesProps } from './AreaSeries';
import { AREA_SERIES_DEFAULT_PROPS, AreaSeries } from './AreaSeries';
import type { PointSeriesProps } from './PointSeries';
import { POINT_SERIES_DEFAULT_PROPS } from './PointSeries';

export const StackedNormalizedAreaSeries: FC<Partial<AreaSeriesProps>> = (
  props
) => {
  const { interpolation, symbols, ...rest } = {
    ...AREA_SERIES_DEFAULT_PROPS,
    ...props
  };

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
      interpolation={interpolation as InterpolationTypes}
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
      tooltip={
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
      }
    />
  );
};
