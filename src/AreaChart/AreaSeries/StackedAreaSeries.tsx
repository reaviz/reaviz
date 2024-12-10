import React, { FC, useMemo } from 'react';
import {
  AreaSeriesProps,
  AreaSeries,
  AREA_SERIES_DEFAULT_PROPS
} from './AreaSeries';
import { CloneElement } from 'reablocks';
import { POINT_SERIES_DEFAULT_PROPS, PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '@/ScatterPlot';

export const StackedAreaSeries: FC<Partial<AreaSeriesProps>> = ({
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
      type="stacked"
      symbols={
        symbols && (
          <CloneElement<PointSeriesProps>
            element={symbols}
            {...symbolsProps}
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

StackedAreaSeries.defaultProps = {
  ...AREA_SERIES_DEFAULT_PROPS,
  type: 'stacked'
} as Partial<AreaSeriesProps>;
