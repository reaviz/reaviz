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

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
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
  axis,
  startAngle,
  endAngle
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
        .range([startAngle, endAngle])
        .domain(xDomain as any[]);

      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      return {
        xScale,
        yScale,
        newData
      };
    },
    [endAngle, startAngle]
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
              startAngle={startAngle}
              endAngle={endAngle}
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
            startAngle={startAngle}
            endAngle={endAngle}
          />
        </Fragment>
      );
    },
    [axis, data, endAngle, getScales, innerRadius, series, startAngle]
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
  series: <RadialBarSeries />,
  startAngle: 0,
  endAngle: 2 * Math.PI
};
