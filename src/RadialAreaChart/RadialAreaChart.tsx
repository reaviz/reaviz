import React, { Fragment, ReactElement, FC, useCallback } from 'react';
import {
  ChartInternalShallowDataShape,
  buildShallowChartData,
  ChartDataShape,
  buildNestedChartData,
  ChartNestedDataShape,
  ChartShallowDataShape
} from '../common/data';
import { scaleTime, scaleBand, scalePoint } from 'd3-scale';
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
  data: ChartDataShape[];

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

  /**
   * Whether to render a semicircle or a full circle
   * Renders a full circle by default
   */
  isSemiCircle?: boolean;
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
  margins,
  isSemiCircle
}) => {
  const getXScale = useCallback(
    (points) => {
      const maxXScaleRange = isSemiCircle ? Math.PI : 2 * Math.PI;
      let xScale;
      if (axis?.props.type === 'category') {
        const isMultiSeries = series.props.type === 'grouped';

        let xDomain;
        if (isMultiSeries) {
          xDomain = uniqueBy<ChartInternalShallowDataShape>(
            points,
            (dd) => dd.data,
            (dd) => dd.x
          );
        } else {
          xDomain = uniqueBy<ChartInternalShallowDataShape>(
            points,
            (dd) => dd.x
          );
        }

        if (isSemiCircle) {
          // scaleBand() excludes the end value from the band:
          //  https://www.d3indepth.com/scales/#scaleband
          xScale = scalePoint()
            .range([0, maxXScaleRange])
            .domain(xDomain as any[]);
        } else {
          xScale = scaleBand()
            .range([0, maxXScaleRange])
            .domain(xDomain as any[]);
        }

      } else {
        const xDomain = getXDomain({ data: points });

        xScale = scaleTime()
          .range([0, maxXScaleRange])
          .domain(xDomain);
      }

      return xScale;
    },
    [axis?.props.type, isSemiCircle, series.props.type]
  );

  const getScales = useCallback(
    (preData: ChartDataShape[], outerRadius: number, innerRadius: number) => {
      const isMultiSeries = series.props.type === 'grouped';

      let d;
      if (isMultiSeries) {
        d = buildNestedChartData(preData as ChartNestedDataShape[], true);
      } else {
        d = buildShallowChartData(preData as ChartShallowDataShape[]);
      }

      const xScale = getXScale(d);
      const yDomain = getYDomain({ data: d, scaled: false });
      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      return {
        yScale,
        xScale,
        result: d
      };
    },
    [getXScale, series.props.type]
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
              isSemiCircle={isSemiCircle}
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
            isSemiCircle={isSemiCircle}
          />
        </Fragment>
      );
    },
    [getScales, data, innerRadius, axis, isSemiCircle, series]
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
  margins: 75,
  isSemiCircle: false
};
