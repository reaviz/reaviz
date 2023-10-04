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
      .domain([
        -max(data, ({ data }) => data),
        max(data, ({ data }) => data)
      ])
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
      data: transformedData,
      yScale,
      xScale
    };
  }, [data]);

  const getDatas = useCallback(({ chartWidth, chartHeight }) => {
    // The 'layered' variant is actually just a series of funnel charts
    // laid on top of each other to create the effect of a layered funnel.
    if (arc.props.variant === 'layered') {
      const offset = chartHeight / 4;
      const halfOffset = offset / 2;

      return {
        halfOffset,
        datas: [
          { data, ...getScales({ chartHeight: chartHeight, chartWidth }) },
          { data, ...getScales({ chartHeight: chartHeight - offset, chartWidth }) },
          { data, ...getScales({ chartHeight: chartHeight - (offset * 2), chartWidth }) },
        ]
      };
    } else {
      return {
        halfOffset: 0,
        datas: [
          { data, ...getScales({ chartHeight: chartHeight, chartWidth }) }
        ]
      };
    }
  }, [data, arc, getScales]);

  const renderChart = useCallback(
    ({ id, chartWidth, chartHeight, chartSized }: ChartContainerChildProps) => {
      if (!chartSized) {
        return null;
      }

      const { datas, halfOffset } = getDatas({ chartHeight, chartWidth });

      return (
        <>
          {datas.map((d, i) => (
            <g key={i} style={{ transform: `translate(0, ${i * halfOffset}px)` }}>
              <CloneElement<FunnelArcProps>
                element={arc}
                {...d}
                id={id}
                index={i}
              />
            </g>
          ))}
          <CloneElement<FunnelAxisProps>
            element={axis}
            data={data}
            xScale={datas[0].xScale}
            yScale={datas[0].yScale}
          />
        </>
      );
    }, [getDatas, axis, data, arc]);

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
