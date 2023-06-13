import React, { FC, ReactElement, useCallback } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { CloneElement, useId } from 'rdk';
import { FunnelArc, FunnelArcProps } from './FunnelArc';
import { FunnelAxis, FunnelAxisProps } from './FunnelAxis';
import { ChartContainer, ChartContainerChildProps, ChartProps } from '../common/containers';
import { ChartShallowDataShape } from '../common/data';

export interface FunnelChartProps extends ChartProps {
  /**
   * Chart shape used to render the funnel.
   */
  data: ChartShallowDataShape[];

  /**
   * The arc component that renders funnel shape.
   */
  arc?: ReactElement<FunnelArcProps, typeof FunnelArc>;

  /**
   * The axis component that renders the funnel axis.
   */
  axis?: ReactElement<FunnelAxisProps, typeof FunnelAxis>;
}

export const FunnelChart: FC<FunnelChartProps> = ({
  data,
  width,
  arc,
  axis,
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
      .range([chartHeight, 0]);

    const xScale = scaleLinear()
      .domain([0, data.length])
      .range([0, chartWidth]);

    const transformedData = data.map((d, i) => ({
      ...d,
      key: d.key,
      x: xScale(i),
      y: 0
    }));

    return {
      transformedData,
      yScale,
      xScale
    };
  }, [data]);

  const renderChart = useCallback(
    ({ id, chartWidth, chartHeight, chartSized }: ChartContainerChildProps) => {
      if (!chartSized) {
        return null;
      }

      const { xScale, yScale, transformedData } = getScales({ chartHeight, chartWidth });

      return (
        <>
          <CloneElement<FunnelArcProps>
            element={arc}
            id={id}
            data={transformedData}
            xScale={xScale}
            yScale={yScale}
          />
          <CloneElement<FunnelAxisProps>
            element={axis}
            data={transformedData}
            xScale={xScale}
            yScale={yScale}
          />
        </>
      );
    }, [getScales, arc, axis]);

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
  arc: <FunnelArc />,
  axis: <FunnelAxis />
};
