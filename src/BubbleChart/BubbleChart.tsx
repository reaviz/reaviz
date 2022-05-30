import { hierarchy, pack } from 'd3-hierarchy';
import { CloneElement } from 'rdk';
import React, { FC, ReactElement, useCallback } from 'react';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps,
  ChartShallowDataShape
} from '../common';
import { BubbleSeries, BubbleSeriesProps } from './BubbleSeries';

export interface BubbleChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the arc components.
   */
  series?: ReactElement<BubbleSeriesProps, typeof BubbleSeries>;
}

export const BubbleChart: FC<Partial<BubbleChartProps>> = ({
  data = [],
  id,
  width,
  height,
  className,
  containerClassName,
  margins = 10,
  series = <BubbleSeries />
}) => {
  const getData = useCallback(
    (cw: number, ch: number) => {
      const bubble = pack().size([cw, ch]).padding(3);

      const root = hierarchy<any>({ children: data })
        .sum((d) => d.data)
        .sort((a, b) => b.data - a.data);

      return bubble(root).leaves();
    },
    [data]
  );

  const renderChart = useCallback(
    ({ chartWidth, chartHeight, ...rest }: ChartContainerChildProps) => {
      const circles = getData(chartWidth, chartHeight);

      return (
        <CloneElement<BubbleSeriesProps>
          element={series}
          id={`${rest.id}-series`}
          data={circles}
        />
      );
    },
    [series, getData]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      containerClassName={containerClassName}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
