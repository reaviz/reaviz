import React, { FC } from 'react';
import { AreaSeries, Line, AreaSeriesProps, PointSeries } from '../AreaChart';
import { ScatterPoint } from '../ScatterPlot';

export type LineSeriesProps = AreaSeriesProps;

export const LineSeries: FC<Partial<LineSeriesProps>> = (props) => (
  <AreaSeries {...props} />
);

LineSeries.defaultProps = {
  ...AreaSeries.defaultProps,
  area: null,
  line: <Line strokeWidth={3} />,
  markerSymbols: (
    <PointSeries
      show={true}
      point={
        <ScatterPoint
          symbol={() => {
            return (
              <svg height="200" width="500">
                <line
                  x1="0"
                  y1="-10"
                  x2="0"
                  y2="10"
                  style={{
                    stroke: 'lime',
                    strokeWidth: 2
                  }}
                />
              </svg>
            );
          }}
        />
      }
    />
  )
};
