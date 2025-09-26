import classNames from 'classnames';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';

import type { LinearAxis, LinearAxisProps } from '@/common/Axis';
import {
  isAxisVisible,
  LINEAR_X_AXIS_DEFAULT_PROPS,
  LINEAR_Y_AXIS_DEFAULT_PROPS,
  LinearXAxis,
  LinearYAxis,
} from '@/common/Axis';
import type { ChartBrush, ChartBrushProps } from '@/common/Brush';
import type {
  ChartContainerChildProps,
  ChartProps,
} from '@/common/containers/ChartContainer';
import { ChartContainer } from '@/common/containers/ChartContainer';
import type { ChartDataTypes, ChartShallowDataShape } from '@/common/data';
import { buildShallowChartData } from '@/common/data';
import type { GridlineSeriesProps } from '@/common/Gridline';
import { GridlineSeries } from '@/common/Gridline';
import { getXScale, getYScale } from '@/common/scales';
import type {
  ChartZoomPan,
  ChartZoomPanProps,
  ZoomPanChangeEvent,
} from '@/common/ZoomPan';

import css from './ScatterPlot.module.css';
import type { ScatterSeriesProps } from './ScatterSeries';
import { ScatterSeries } from './ScatterSeries';

export interface ScatterPlotProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the scatter components.
   */
  series: ReactElement<ScatterSeriesProps, typeof ScatterSeries>;

  /**
   * The linear axis component for the Y Axis of the chart.
   */
  yAxis: ReactElement<LinearAxisProps, typeof LinearAxis>;

  /**
   * The linear axis component for the X Axis of the chart.
   */
  xAxis: ReactElement<LinearAxisProps, typeof LinearAxis>;

  /**
   * The chart's background gridlines component.
   */
  gridlines: ReactElement<GridlineSeriesProps, typeof GridlineSeries> | null;

  /**
   * The chart's brush component.
   */
  brush: ReactElement<ChartBrushProps, typeof ChartBrush> | null;

  /**
   * The chart's zoom pan component.
   */
  zoomPan: ReactElement<ChartZoomPanProps, typeof ChartZoomPan> | null;

  /**
   * Any secondary axis components. Useful for multi-axis charts.
   */
  secondaryAxis?: ReactElement<LinearAxisProps, typeof LinearAxis>[];
}

export const ScatterPlot: FC<Partial<ScatterPlotProps>> = ({
  id,
  width,
  height,
  margins,
  className,
  series = <ScatterSeries />,
  xAxis = <LinearXAxis type="time" />,
  yAxis = <LinearYAxis type="value" />,
  data = [],
  gridlines = <GridlineSeries />,
  containerClassName,
  brush = null,
  zoomPan = null,
  secondaryAxis,
}) => {
  const xAxisProps = useMemo(
    () => ({ ...LINEAR_X_AXIS_DEFAULT_PROPS, ...xAxis.props }),
    [xAxis.props],
  );
  const yAxisProps = useMemo(
    () => ({ ...LINEAR_Y_AXIS_DEFAULT_PROPS, ...yAxis.props }),
    [yAxis.props],
  );
  const zoomControlled = useMemo(
    () =>
      // eslint-disable-next-line
      !zoomPan?.props?.domain?.hasOwnProperty('domain'),
    [zoomPan],
  );

  const timeout = useRef<any | null>(null);
  const [preventAnimation, setPreventAnimation] = useState<boolean>(false);
  const [zoomDomain, setZoomDomain] = useState<
    [ChartDataTypes, ChartDataTypes] | null
  >(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const aggregatedData = useMemo(() => buildShallowChartData(data), [data]);

  const getScales = useCallback(
    (chartHeight: number, chartWidth: number) => {
      const yScale = getYScale({
        roundDomains: yAxisProps.roundDomains,
        type: yAxisProps.type,
        height: chartHeight,
        data: aggregatedData,
        domain: yAxisProps.domain,
      });

      const xScale = getXScale({
        width: chartWidth,
        type: xAxisProps.type,
        roundDomains: xAxisProps.roundDomains,
        data: aggregatedData,
        domain: zoomDomain || xAxisProps.domain,
      });

      return {
        yScale,
        xScale,
      };
    },
    [yAxisProps, xAxisProps, aggregatedData, zoomDomain],
  );

  const onZoomPan = useCallback(
    (event: ZoomPanChangeEvent) => {
      if (zoomControlled) {
        setPreventAnimation(true);
        setZoomDomain(event.domain);
        setIsZoomed(event.isZoomed);

        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setPreventAnimation(true), 500);
      }
    },
    [zoomControlled],
  );

  const renderChart = useCallback(
    ({
      chartHeight,
      chartWidth,
      id,
      updateAxes,
      chartSized,
    }: ChartContainerChildProps) => {
      const { yScale, xScale } = getScales(chartHeight, chartWidth);
      const animated =
        preventAnimation === true ? false : series.props.animated;
      const disableBrush = aggregatedData.length <= 1;

      return (
        <Fragment>
          {chartSized && gridlines && (
            <CloneElement<GridlineSeriesProps>
              element={gridlines}
              height={chartHeight}
              width={chartWidth}
              yScale={yScale}
              xScale={xScale}
              yAxis={yAxisProps}
              xAxis={xAxisProps}
            />
          )}
          <CloneElement<LinearAxisProps>
            element={xAxis}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(e) => updateAxes('horizontal', e)}
          />
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(e) => updateAxes('vertical', e)}
          />
          {secondaryAxis &&
            secondaryAxis.map((axis, i) => (
              <CloneElement<LinearAxisProps>
                key={i}
                element={axis}
                height={chartHeight}
                width={chartWidth}
                visibility={chartSized ? 'visible' : 'hidden'}
                onDimensionsChange={(e) => updateAxes('horizontal', e)}
              />
            ))}
          {chartSized && (
            <CloneElement<ChartBrushProps>
              disabled={disableBrush}
              element={brush}
              height={chartHeight}
              width={chartWidth}
              scale={xScale}
            >
              <CloneElement<ChartZoomPanProps>
                element={zoomPan}
                onZoomPan={onZoomPan}
                height={chartHeight}
                width={chartWidth}
                axisType={xAxis.props.type}
                roundDomains={xAxis.props.roundDomains}
                data={aggregatedData}
                domain={zoomDomain}
              >
                <CloneElement<ScatterSeriesProps>
                  element={series}
                  id={`area-series-${id}`}
                  data={aggregatedData}
                  height={chartHeight}
                  width={chartWidth}
                  yScale={yScale}
                  xScale={xScale}
                  isZoomed={isZoomed}
                  animated={animated}
                />
              </CloneElement>
            </CloneElement>
          )}
        </Fragment>
      );
    },
    [
      getScales,
      preventAnimation,
      series,
      gridlines,
      yAxis,
      xAxis,
      xAxisProps,
      yAxisProps,
      secondaryAxis,
      brush,
      zoomPan,
      onZoomPan,
      aggregatedData,
      zoomDomain,
      isZoomed,
    ],
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      containerClassName={containerClassName}
      margins={margins}
      xAxisVisible={isAxisVisible(xAxisProps)}
      yAxisVisible={isAxisVisible(yAxisProps)}
      className={classNames(css.scatterPlot, className)}
    >
      {renderChart}
    </ChartContainer>
  );
};
