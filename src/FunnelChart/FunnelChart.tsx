import { CloneElement, useId } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { useCallback } from 'react';

import type { ChartContainerChildProps, ChartProps } from '@/common/containers';
import { ChartContainer } from '@/common/containers';
import type { ChartShallowDataShape } from '@/common/data';

import type { FunnelSeriesProps } from './FunnelSeries/FunnelSeries';
import { FunnelSeries } from './FunnelSeries/FunnelSeries';

export interface FunnelChartProps extends ChartProps {
  /**
   * Chart shape used to render the funnel.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the funnel components.
   */
  series: ReactElement<FunnelSeriesProps, typeof FunnelSeries>;
}

export const FunnelChart: FC<Partial<FunnelChartProps>> = ({
  data,
  width,
  margins = 0,
  height,
  className,
  containerClassName,
  series = <FunnelSeries />,
  ...rest
}) => {
  const id = useId(rest.id);

  const renderChart = useCallback(
    ({ id, chartWidth, chartHeight, chartSized }: ChartContainerChildProps) => {
      if (!chartSized) {
        return null;
      }

      return (
        <CloneElement<FunnelSeriesProps>
          element={series}
          id={`funnel-series-${id}`}
          data={data}
          height={chartHeight}
          width={chartWidth}
        />
      );
    },
    [data, series],
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      containerClassName={containerClassName}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
