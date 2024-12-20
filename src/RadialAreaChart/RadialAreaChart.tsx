import React, { Fragment, ReactElement, FC, useCallback, useMemo } from 'react';
import {
  ChartInternalShallowDataShape,
  buildShallowChartData,
  ChartDataShape,
  buildNestedChartData,
  ChartNestedDataShape,
  ChartShallowDataShape
} from '@/common/data';
import { scaleTime, scaleBand, scalePoint } from 'd3-scale';
import { getYDomain, getXDomain } from '@/common/utils/domains';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '@/common/containers';
import { CloneElement } from 'reablocks';
import {
  RADIAL_AREA_SERIES_DEFAULT_PROPS,
  RadialAreaSeries,
  RadialAreaSeriesProps
} from './RadialAreaSeries';
import {
  RADIAL_AXIS_DEFAULT_PROPS,
  RadialAxis,
  RadialAxisProps
} from '@/common/Axis/RadialAxis';
import { getRadialYScale } from '@/common/scales/radial';
import { uniqueBy } from '@/common/utils';

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
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;

  /**
   * Whether the curve should be closed. Set to true by deafult
   */
  isClosedCurve?: boolean;
}

export const RadialAreaChart: FC<Partial<RadialAreaChartProps>> = ({
  id,
  width,
  height,
  className,
  data,
  containerClassName,
  innerRadius = 0.1,
  series = <RadialAreaSeries />,
  axis = <RadialAxis />,
  margins = 75,
  startAngle = 0,
  endAngle = 2 * Math.PI,
  isClosedCurve = true
}) => {
  const seriesProps = useMemo(
    () => ({ ...RADIAL_AREA_SERIES_DEFAULT_PROPS, ...series.props }),
    [series.props]
  );
  const axisProps = useMemo(
    () => ({ ...RADIAL_AXIS_DEFAULT_PROPS, ...(axis?.props ?? {}) }),
    [axis?.props]
  );

  const getXScale = useCallback(
    (points) => {
      const isFullCircle = Math.abs(endAngle - startAngle) >= 2 * Math.PI;
      let xScale;
      if (axisProps.type === 'category') {
        const isMultiSeries = seriesProps.type === 'grouped';

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

        if (isFullCircle) {
          xScale = scaleBand()
            .range([0, 2 * Math.PI])
            .domain(xDomain as any[]);
        } else {
          // scaleBand() excludes the end value from the band:
          //  https://www.d3indepth.com/scales/#scaleband
          xScale = scalePoint()
            .range([startAngle, endAngle])
            .domain(xDomain as any[]);
        }
      } else {
        const xDomain = getXDomain({ data: points });

        xScale = scaleTime().range([startAngle, endAngle]).domain(xDomain);
      }

      return xScale;
    },
    [axisProps.type, endAngle, seriesProps.type, startAngle]
  );

  const getScales = useCallback(
    (preData: ChartDataShape[], outerRadius: number, innerRadius: number) => {
      const isMultiSeries = seriesProps.type === 'grouped';

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
    [getXScale, seriesProps.type]
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
              startAngle={startAngle}
              endAngle={endAngle}
            >
              {axis.props?.children}
            </CloneElement>
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
            startAngle={startAngle}
            endAngle={endAngle}
            isClosedCurve={isClosedCurve}
          />
        </Fragment>
      );
    },
    [
      getScales,
      data,
      innerRadius,
      axis,
      startAngle,
      endAngle,
      series,
      isClosedCurve
    ]
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
