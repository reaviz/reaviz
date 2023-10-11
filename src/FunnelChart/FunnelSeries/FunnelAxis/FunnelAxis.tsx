import React, { FC, Fragment, ReactElement } from 'react';
import { ChartShallowDataShape } from '../../../common/data';
import { range } from 'd3-array';
import { FunnelAxisLabel, FunnelAxisLabelProps } from './FunnelAxisLabel';
import { CloneElement } from 'rdk';
import { FunnelAxisLine, FunnelAxisLineProps } from './FunnelAxisLine';

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
   * The funnel axis line.
   */
  line?: ReactElement<FunnelAxisLineProps, typeof FunnelAxisLine> | null;

  /**
   * Label component for the axis.
   */
  label?: ReactElement<FunnelAxisLabelProps, typeof FunnelAxisLabel> | null;
}

export const FunnelAxis: FC<Partial<FunnelAxisProps>> = ({
  data,
  xScale,
  yScale,
  line,
  label
}) => {
  const lines = range(0, data.length);

  return (
    <>
      {lines.map(index => (
        <Fragment key={index}>
          {line && index !== 0 && (
            <CloneElement<FunnelAxisLineProps>
              element={line}
              index={index}
              xScale={xScale}
              yScale={yScale}
            />
          )}
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
  label: <FunnelAxisLabel />,
  line: <FunnelAxisLine />
};
