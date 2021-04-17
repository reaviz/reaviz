import React, { FC } from 'react';
import { ChartContainer, ChartProps, ChartShallowDataShape } from '../common';

export interface BubbleChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];
}

export const BubbleChart: FC<Partial<BubbleChartProps>> = ({
  data = [],
  id,
  width,
  height,
  className,
  margins = 10
}) => {
  const renderChart = () => {
    return (
      <g>

      </g>
    );
  };

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
