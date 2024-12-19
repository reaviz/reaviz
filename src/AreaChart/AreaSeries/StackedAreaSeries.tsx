import React, { FC, useMemo } from 'react';
import {
  AreaSeriesProps,
  AreaSeries,
  AREA_SERIES_DEFAULT_PROPS
} from './AreaSeries';
import { CloneElement } from 'reablocks';
import { POINT_SERIES_DEFAULT_PROPS, PointSeriesProps } from './PointSeries';
import { SCATTER_POINT_DEFAULT_PROPS, ScatterPointProps } from '@/ScatterPlot';
import { InterpolationTypes } from '@/common';

export const StackedAreaSeries: FC<Partial<AreaSeriesProps>> = (props) => {
  const { symbols, interpolation, ...rest } = {
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

  const pointProps = useMemo(
    () => ({
      ...SCATTER_POINT_DEFAULT_PROPS,
      ...symbolsProps.point?.props
    }),
    [symbolsProps]
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
