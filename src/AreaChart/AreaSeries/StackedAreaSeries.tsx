import React, { FC } from 'react';
import {
  AreaSeriesProps,
  AreaSeries,
  AREA_SERIES_DEFAULT_PROPS
} from './AreaSeries';
import { CloneElement } from 'reablocks';
import { PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '@/ScatterPlot';

export const StackedAreaSeries: FC<Partial<AreaSeriesProps>> = ({
  type,
  symbols,
  ...rest
}) => (
  <AreaSeries
    {...rest}
    type="stacked"
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

StackedAreaSeries.defaultProps = {
  ...AREA_SERIES_DEFAULT_PROPS,
  type: 'stacked'
} as Partial<AreaSeriesProps>;
