import React, { FC } from 'react';
import { AreaSeriesProps, AreaSeries } from './AreaSeries';
import { CloneElement } from 'rdk';
import { PointSeriesProps } from './PointSeries';
import { ScatterPointProps } from '../../ScatterPlot';

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
  ...AreaSeries.defaultProps,
  type: 'stacked'
};
