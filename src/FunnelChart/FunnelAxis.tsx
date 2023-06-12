import React, { FC, Fragment, ReactElement } from 'react';
import { ChartShallowDataShape } from '../common';
import { range } from 'd3-array';
import { FunnelAxisLabel, FunnelAxisLabelProps } from './FunnelAxisLabel';
import { CloneElement } from 'rdk';

export interface FunnelAxisProps {
  /**
   * Data to render the funnel. Set internally by `FunnelChart`.
   */
  data: ChartShallowDataShape[];

  /**
   * xScale for the funnel. Set internally by `FunnelChart`.
   */
  xScale: any;

  /**
   * yScale for the funnel. Set internally by `FunnelChart`.
   */
  yScale: any;

  /**
   * Color of the axis lines.
   */
  strokeColor: string;

  /**
   * Width of the axis lines.
   */
  strokeWidth: number;

  /**
   * Label component for the axis.
   */
  label?: ReactElement<FunnelAxisLabelProps, typeof FunnelAxisLabel> | null;
}

export const FunnelAxis: FC<Partial<FunnelAxisProps>> = ({
  data,
  strokeColor,
  strokeWidth,
  xScale,
  yScale,
  label
}) => {
  const lines = range(0, data.length);
  const [height] = yScale.range();

  return (
    <>
      {lines.map(index => (
        <Fragment key={index}>
          <line
            x1={xScale(index)}
            y1={0}
            x2={xScale(index)}
            y2={height}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {label && (
            <CloneElement<FunnelAxisLabelProps>
              element={label}
              index={index}
              data={data[index]}
              xScale={xScale}
              yScale={yScale}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};

FunnelAxis.defaultProps = {
  strokeColor: '#333',
  strokeWidth: 2,
  label: <FunnelAxisLabel />
};
