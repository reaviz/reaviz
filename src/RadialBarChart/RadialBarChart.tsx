import React, { useCallback, FC, Fragment, ReactElement, useMemo } from 'react';
import {
  ChartShallowDataShape,
  ChartInternalShallowDataShape,
  buildShallowChartData,
  ChartDataShape,
  buildNestedChartData,
  ChartNestedDataShape
} from '@/common/data';
import { scaleBand, scalePoint } from 'd3-scale';
import { getYDomain } from '@/common/utils/domains';
import { RadialBarSeries, RadialBarSeriesProps } from './RadialBarSeries';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '@/common/containers';
import { CloneElement } from 'reablocks';
import {
  RADIAL_AXIS_DEFAULT_PROPS,
  RadialAxis,
  RadialAxisProps
} from '@/common/Axis/RadialAxis';
import { getRadialYScale } from '@/common/scales';
import { uniqueBy } from '@/common/utils/array';
import { hasDataArray } from '@/common/utils/hasDataArray';

export interface RadialBarChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartDataShape[];

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

  /**
   * Determines which chart elements (bars, labels, both, or none)
   * should get an onClick event that opens the `key_url` of the data node.
   */

  attachUrl?: 'none' | 'axis' | 'bars' | 'both';
}

export const RadialBarChart: FC<Partial<RadialBarChartProps>> = ({
  id,
  width,
  height,
  margins = 75,
  className,
  containerClassName,
  data,
  innerRadius = 10,
  series = <RadialBarSeries />,
  axis = <RadialAxis />,
  startAngle = 0,
  endAngle = 2 * Math.PI,
  attachUrl = 'axis'
}) => {
  const axisProps = useMemo(
    () => ({ ...RADIAL_AXIS_DEFAULT_PROPS, ...(axis?.props ?? {}) }),
    [axis?.props]
  );

  const seriesProps = useMemo(
    () => ({ ...RADIAL_AXIS_DEFAULT_PROPS, ...(series?.props ?? {}) }),
    [series?.props]
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
        const xDomain = uniqueBy(points, (d) => d.x);

        xScale = scaleBand()
          .range([startAngle, endAngle])
          .domain(xDomain as any[]);
      }

      return xScale;
    },
    [axisProps.type, endAngle, seriesProps.type, startAngle]
  );

  /**
   * creates a url tick map for quick lookups.
   */

  const urlMap = useMemo(() => {
    if (!data) return new Map();
    const isMultiSeries = seriesProps.type === 'grouped';
    const map = new Map();
    if (isMultiSeries) {
      for (const d of data) {
        if (hasDataArray(d)) {
          for (const { key, key_url } of d.data) {
            if (key_url) map.set(key, key_url);
          }
        }
      }
    } else {
      for (const { key, key_url } of data) {
        if (key_url) map.set(key, key_url);
      }
    }
    return map;
  }, [data, seriesProps.type]);

  const getScales = useCallback(
    (preData: ChartDataShape[], innerRadius: number, outerRadius: number) => {
      const isMultiSeries = seriesProps.type === 'grouped';
      let newData;
      if (isMultiSeries) {
        newData = buildNestedChartData(
          preData as ChartNestedDataShape[],
          true,
          'vertical',
          true
        );
      } else {
        newData = buildShallowChartData(preData as ChartShallowDataShape[]);
      }

      const yDomain = getYDomain({ data: newData, scaled: false });

      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      const xScale = getXScale(newData);

      return {
        xScale,
        yScale,
        newData
      };
    },
    [getXScale, seriesProps.type]
  );

  let clickTarget = attachUrl;
  const onClickLabels = clickTarget === 'axis' || clickTarget === 'both';
  const onClickBars = clickTarget === 'bars' || clickTarget === 'both';

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
              urls={onClickLabels && urlMap}
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
            urlEvents={onClickBars}
          />
        </Fragment>
      );
    },
    [
      axis,
      data,
      endAngle,
      getScales,
      innerRadius,
      series,
      startAngle,
      onClickBars,
      onClickLabels,
      urlMap
    ]
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
