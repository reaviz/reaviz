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
import { InterpolationTypes } from '@/common';

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
