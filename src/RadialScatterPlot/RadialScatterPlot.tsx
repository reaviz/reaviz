import React, { FC, useCallback, Fragment, ReactElement } from 'react';
import {
  ChartShallowDataShape,
  buildShallowChartData,
  ChartInternalShallowDataShape
} from '../common/data';
import { scaleTime } from 'd3-scale';
import { getYDomain, getXDomain } from '../common/utils/domains';
import {
  RadialScatterSeries,
  RadialScatterSeriesProps
} from './RadialScatterSeries';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import { CloneElement } from 'rdk';
import { RadialAxisProps, RadialAxis } from '../common/Axis/RadialAxis';
import { getRadialYScale } from '../common/scales';

export interface RadialScatterPlotProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the scatter components.
   */
  series: ReactElement<RadialScatterSeriesProps, typeof RadialScatterSeries>;

  /**
   * The radial axis component for the chart.
   */
  axis: ReactElement<RadialAxisProps, typeof RadialAxis> | null;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;
}

export const RadialScatterPlot: FC<Partial<RadialScatterPlotProps>> = ({
  id,
  width,
  height,
  margins,
  className,
  containerClassName,
  innerRadius,
  series,
  axis,
  data
}) => {
  const getScales = useCallback(
    (
      aggregatedData: ChartInternalShallowDataShape[],
      outer: number,
      inner: number
    ) => {
      const yDomain = getYDomain({ data: aggregatedData, scaled: false });
      const xDomain = getXDomain({ data: aggregatedData });

      const xScale = scaleTime()
        .range([0, 2 * Math.PI])
        .domain(xDomain);

      const yScale = getRadialYScale(inner, outer, yDomain);

      return {
        yScale,
        xScale
      };
    },
    []
  );

  const renderChart = useCallback(
    (containerProps: ChartContainerChildProps) => {
      const { chartWidth, chartHeight, id } = containerProps;
      const outerRadius = Math.min(chartWidth, chartHeight) / 2;
      const aggregatedData = buildShallowChartData(data);
      const { yScale, xScale } = getScales(
        aggregatedData,
        outerRadius,
        innerRadius
      );

      return (
        <Fragment>
          {axis && (
            <CloneElement<RadialAxisProps>
              element={axis}
              xScale={xScale}
              height={chartHeight}
              width={chartWidth}
              innerRadius={innerRadius}
            />
          )}
          <CloneElement<RadialScatterSeriesProps>
            element={series}
            id={id}
            data={aggregatedData}
            xScale={xScale}
            yScale={yScale}
          />
        </Fragment>
      );
    },
    [data, getScales, innerRadius, series, axis]
  );

  return (
    <ChartContainer
      id={id}
      containerClassName={containerClassName}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={true}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
