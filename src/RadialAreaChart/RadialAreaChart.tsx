import React, { Fragment, ReactElement, FC, useCallback } from 'react';
import {
  ChartShallowDataShape,
  ChartInternalShallowDataShape,
  buildShallowChartData
} from '../common/data';
import { scaleTime, scaleBand } from 'd3-scale';
import { getYDomain, getXDomain } from '../common/utils/domains';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import { CloneElement } from 'rdk';
import { RadialAreaSeries, RadialAreaSeriesProps } from './RadialAreaSeries';
import { RadialAxis, RadialAxisProps } from '../common/Axis/RadialAxis';
import { getRadialYScale } from '../common/scales/radial';
import { uniqueBy } from '../common/utils';

export interface RadialAreaChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the area components.
   */
  series: ReactElement<RadialAreaSeriesProps, typeof RadialAreaSeries>;

  /**
   * The radial axis component for the chart.
   */
  innerRadius: number;

  /**
   * The inner radius for the chart center.
   */
  axis: ReactElement<RadialAxisProps, typeof RadialAxis> | null;
}

export const RadialAreaChart: FC<Partial<RadialAreaChartProps>> = ({
  id,
  width,
  height,
  className,
  data,
  containerClassName,
  innerRadius,
  series,
  axis,
  margins
}) => {
  const getScales = useCallback(
    (
      preData: ChartShallowDataShape[],
      outerRadius: number,
      innerRadius: number
    ) => {
      const d = buildShallowChartData(
        preData
      ) as ChartInternalShallowDataShape[];

      const yDomain = getYDomain({ data: d, scaled: false });

      let xScale;
      if (axis?.props.type === 'category') {
        const xDomain = uniqueBy<ChartInternalShallowDataShape>(
          d,
          (dd) => dd.x
        );
        xScale = scaleBand()
          .range([0, 2 * Math.PI])
          .domain(xDomain as any[]);
      } else {
        const xDomain = getXDomain({ data: d });
        xScale = scaleTime()
          .range([0, 2 * Math.PI])
          .domain(xDomain);
      }

      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      return {
        yScale,
        xScale,
        result: d
      };
    },
    [axis?.props.type]
  );

  const renderChart = useCallback(
    (containerProps: ChartContainerChildProps) => {
      const { chartWidth, chartHeight, id } = containerProps;
      const outerRadius = Math.min(chartWidth, chartHeight) / 2;
      const { yScale, xScale, result } = getScales(
        data!,
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
          <CloneElement<RadialAreaSeriesProps>
            element={series}
            id={id}
            data={result}
            xScale={xScale}
            yScale={yScale}
            height={chartHeight}
            width={chartWidth}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
          />
        </Fragment>
      );
    },
    [getScales, data, innerRadius, axis, series]
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
      center={true}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};

RadialAreaChart.defaultProps = {
  innerRadius: 0.1,
  series: <RadialAreaSeries />,
  axis: <RadialAxis />,
  margins: 75
};
