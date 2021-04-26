import { hierarchy, pack } from 'd3-hierarchy';
import { motion } from 'framer-motion';
import React, { FC, useCallback } from 'react';
import { ChartContainer, ChartContainerChildProps, ChartProps, ChartShallowDataShape } from '../common';

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

  const aggregatedData = useCallback((cw: number, ch: number) => {
    const bubble = pack()
      .size([cw, ch])
      .padding(3);

    const root = hierarchy<any>({ children: data })
      .sum(d => d.data)
      .sort((a, b) => b.data - a.data);

    const circles = bubble(root).leaves();

    console.log('cir', circles);

    return circles;
  }, [data]);

  const renderChart = ({ chartWidth, chartHeight }: ChartContainerChildProps) => {
    const circles = aggregatedData(chartWidth, chartHeight);

    return (
      <g>
        {circles.map(c => (
          <motion.g
            key={(c.data as any).key}
            initial={{
              scale: .5,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
          >
            <circle
              r={c.r}
              stroke="black"
              cx={c.x}
              cy={c.y}
              fillOpacity={.8}
              fill="red"
            />
            <text
              x={c.x}
              y={c.y}
              textAnchor="middle"
            >
              {(c.data as any).key}
            </text>
          </motion.g>
        ))}
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
