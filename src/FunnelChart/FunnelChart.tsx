import React, { FC, ReactElement, useCallback } from 'react';
import { ChartContainer, ChartContainerChildProps, ChartProps, ChartShallowDataShape } from '../common';
import { scaleLinear } from 'd3-scale';
import { max, extent } from 'd3-array';
import { CloneElement, useId } from 'rdk';
import { FunnelArc, FunnelArcProps } from './FunnelArc';

export interface FunnelChartProps extends ChartProps {
  /**
   * Chart shape used to render the funnel.
   */
  data: ChartShallowDataShape[];

  /**
   * The arc component that renders funnel shape.
   */
  arc: ReactElement<FunnelArcProps, typeof FunnelArc>;
}

export const FunnelChart: FC<FunnelChartProps> = ({
  data,
  width,
  arc,
  margins,
  height,
  className,
  containerClassName,
  ...rest
}) => {
  const id = useId(rest.id);

  // Calculate the funnel data on mount and when data changes
  const getScales = useCallback(({ chartWidth, chartHeight }) => {
    const yScale = scaleLinear()
      .domain([-max(data,
        ({ data }) => data), max(data, ({ data }) => data)])
      .nice()
      .range([chartHeight - 10, 10]);

    const xScale = scaleLinear()
      .domain(extent(data, (_d, i) => i))
      .range([10, chartWidth - 10]);

    return {
      yScale,
      xScale
    };
  }, [data]);

  const renderChart = useCallback(
    ({ id, chartWidth, chartHeight, chartSized }: ChartContainerChildProps) => {
      if (!chartSized) {
        return null;
      }

      const { xScale, yScale } = getScales({ chartHeight, chartWidth });

      return (
        <>
          <CloneElement<FunnelArcProps>
            element={arc}
            id={id}
            data={data}
            xScale={xScale}
            yScale={yScale}
          />
        </>
      );
    }, [getScales, data, arc]);

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
  arc: <FunnelArc />
};
