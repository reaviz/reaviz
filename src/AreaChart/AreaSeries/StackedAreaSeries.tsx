import { CloneElement } from 'reablocks';
import type { FC } from 'react';
import React, { useMemo } from 'react';

import type { InterpolationTypes } from '@/common';
import type { ScatterPointProps } from '@/ScatterPlot';
import { SCATTER_POINT_DEFAULT_PROPS } from '@/ScatterPlot';

import type { AreaSeriesProps } from './AreaSeries';
import { AREA_SERIES_DEFAULT_PROPS, AreaSeries } from './AreaSeries';
import type { PointSeriesProps } from './PointSeries';
import { POINT_SERIES_DEFAULT_PROPS } from './PointSeries';

export const StackedAreaSeries: FC<Partial<AreaSeriesProps>> = (props) => {
  const { symbols, interpolation, ...rest } = {
    ...AREA_SERIES_DEFAULT_PROPS,
    ...props,
  };

  const symbolsProps = useMemo(
    () => ({
      ...POINT_SERIES_DEFAULT_PROPS,
      ...symbols?.props,
    }),
    [symbols],
  );

  const pointProps = useMemo(
    () => ({
      ...SCATTER_POINT_DEFAULT_PROPS,
      ...symbolsProps.point?.props,
    }),
    [symbolsProps],
  );

  return (
    <AreaSeries
      {...rest}
      interpolation={interpolation as InterpolationTypes}
      type="stacked"
      symbols={
        symbols && (
          <CloneElement<PointSeriesProps>
            element={symbols}
            {...symbolsProps}
            point={
              <CloneElement<ScatterPointProps>
                element={symbolsProps.point}
                {...pointProps}
                tooltip={null}
              />
            }
          />
        )
      }
    />
  );
};
