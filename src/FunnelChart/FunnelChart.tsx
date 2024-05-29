import React, { FC, ReactElement, useCallback } from 'react';
import { CloneElement, useId } from 'reablocks';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '@/common/containers';
import { ChartShallowDataShape } from '@/common/data';
import { FunnelSeries, FunnelSeriesProps } from './FunnelSeries/FunnelSeries';

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
  margins,
  height,
  className,
  containerClassName,
  series,
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
    [data, series]
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

FunnelChart.defaultProps = {
  margins: 0,
  series: <FunnelSeries />
};
