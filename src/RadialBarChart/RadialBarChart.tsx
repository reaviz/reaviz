import React, { useCallback, FC, Fragment, ReactElement } from 'react';
import {
  ChartShallowDataShape,
  ChartInternalShallowDataShape,
  buildShallowChartData
} from '../common/data';
import { scaleBand } from 'd3-scale';
import { getYDomain } from '../common/utils/domains';
import { RadialBarSeries, RadialBarSeriesProps } from './RadialBarSeries';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import { CloneElement } from 'rdk';
import { RadialAxis, RadialAxisProps } from '../common/Axis/RadialAxis';
import { getRadialYScale } from '../common/scales';
import { uniqueBy } from '../common/utils/array';

export interface RadialBarChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the bar components.
   */
  series: ReactElement<RadialBarSeriesProps, typeof RadialBarSeries>;

  /**
   * The radial axis component for the chart.
   */
  axis: ReactElement<RadialAxisProps, typeof RadialAxis> | null;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;
}

export const RadialBarChart: FC<Partial<RadialBarChartProps>> = ({
  id,
  width,
  height,
  margins,
  className,
  containerClassName,
  data,
  innerRadius,
  series,
  axis
}) => {
  const getScales = useCallback(
    (
      preData: ChartShallowDataShape[],
      innerRadius: number,
      outerRadius: number
    ) => {
      const newData = buildShallowChartData(
        preData
      ) as ChartInternalShallowDataShape[];
      const xDomain = uniqueBy(newData, (d) => d.x);
      const yDomain = getYDomain({ data: newData, scaled: false });

      const xScale = scaleBand()
        .range([0, 2 * Math.PI])
        .domain(xDomain as any[]);

      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      return {
        xScale,
        yScale,
        newData
      };
    },
    []
  );

  const renderChart = useCallback(
    ({ chartWidth, chartHeight, id }: ChartContainerChildProps) => {
      const outerRadius = Math.min(chartWidth, chartHeight) / 2;
      const { yScale, xScale, newData } = getScales(
        data,
        innerRadius,
        outerRadius
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
          <CloneElement<RadialBarSeriesProps>
            element={series}
            id={id}
            data={newData}
            height={chartHeight}
            width={chartWidth}
            xScale={xScale}
            yScale={yScale}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        </Fragment>
      );
    },
    [axis, data, getScales, innerRadius, series]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={true}
      className={className}
      containerClassName={containerClassName}
    >
      {renderChart}
    </ChartContainer>
  );
};

RadialBarChart.defaultProps = {
  innerRadius: 0.1,
  margins: 75,
  axis: <RadialAxis />,
  series: <RadialBarSeries />
};
