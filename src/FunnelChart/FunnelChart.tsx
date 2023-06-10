import React, { FC, useCallback } from 'react';
import { ChartContainer, ChartContainerChildProps, ChartProps, ChartShallowDataShape } from '../common';
import { scaleLinear } from 'd3-scale';
import { area, line } from 'd3-shape';
import { useId } from 'rdk';
import { motion } from 'framer-motion';

export interface FunnelChartProps extends ChartProps {
  data: ChartShallowDataShape[];
}

interface Point {
  x: number;
  y: number;
}

export const FunnelChart: FC<FunnelChartProps> = ({
  data,
  width,
  margins,
  height,
  className,
  containerClassName,
  ...rest
}) => {
  const id = useId(rest.id);

  // Calculate the funnel data on mount and when data changes
  const getScales = useCallback(({ chartWidth, chartHeight }) => {
    // Setup the y scale
    const yScale = scaleLinear()
      .domain([0, data.length])
      .range([0, height]);

    // Create a point list
    const points: Point[][] = data.map((d, i) => {
      const upperWidth = i > 0 ? (data[i - 1].data / data[0].data) * width * 0.5 : width * 0.5;
      const lowerWidth = (d.data / data[0].data) * width * 0.5;

      return [
        { x: width * 0.5 - upperWidth, y: yScale(i) },
        { x: width * 0.5 + upperWidth, y: yScale(i) },
        { x: width * 0.5 + lowerWidth, y: yScale(i + 1) },
        { x: width * 0.5 - lowerWidth, y: yScale(i + 1) }
      ];
    });

    // Create polygons from points
    const newPolygons = points.map(pointGroup =>
      pointGroup.reduce((acc, point) => acc + `${point.x},${point.y} `, '')
    );

    return { internalData: newPaths };
  }, [data]);

  const renderChart = useCallback(
    ({ id, chartWidth, chartHeight, chartSized }: ChartContainerChildProps) => {
      if (!chartSized) {
        return null;
      }

      const { internalData } = getScales({ chartHeight, chartWidth });

      return (
        <>
          {internalData.map(d => (
            <motion.path
              key={d}
              d={d}
              fill="#69b3a2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          ))}

        </>
      );
    }, [getScales]);

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

};
