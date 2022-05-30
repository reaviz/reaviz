import React, {
  FC,
  Fragment,
  ReactElement,
  useState,
  useRef,
  useCallback,
  useMemo
} from 'react';
import classNames from 'classnames';
import {
  ChartShallowDataShape,
  ChartInternalShallowDataShape,
  buildShallowChartData,
  ChartDataTypes
} from '../common/data';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxis,
  LinearYAxis,
  LinearAxis
} from '../common/Axis';
import { getYScale, getXScale } from '../common/scales';
import { ScatterSeries, ScatterSeriesProps } from './ScatterSeries';
import { GridlineSeries, GridlineSeriesProps } from '../common/Gridline';
import {
  ZoomPanChangeEvent,
  ChartZoomPanProps,
  ChartZoomPan
} from '../common/ZoomPan';
import { ChartBrushProps, ChartBrush } from '../common/Brush';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers/ChartContainer';
import { CloneElement } from 'rdk';
import css from './ScatterPlot.module.css';

interface ScatterPlotProps extends ChartProps {
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
  series,
  xAxis,
  yAxis,
  data,
  gridlines,
  containerClassName,
  brush,
  zoomPan,
  secondaryAxis
}) => {
  const zoomControlled = useMemo(
    () =>
      // eslint-disable-next-line
      !zoomPan?.props?.domain?.hasOwnProperty('domain'),
    [zoomPan]
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
        roundDomains: yAxis.props.roundDomains,
        type: yAxis.props.type,
        height: chartHeight,
        data: aggregatedData,
        domain: yAxis.props.domain
      });

      const xScale = getXScale({
        width: chartWidth,
        type: xAxis.props.type,
        roundDomains: xAxis.props.roundDomains,
        data: aggregatedData,
        domain: zoomDomain || xAxis.props.domain
      });

      return {
        yScale,
        xScale
      };
    },
    [yAxis, xAxis, aggregatedData, zoomDomain]
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
    [zoomControlled]
  );

  const renderChart = useCallback(
    ({
      chartHeight,
      chartWidth,
      id,
      updateAxes,
      chartSized
    }: ChartContainerChildProps) => {
      const { yScale, xScale } = getScales(chartHeight, chartWidth);
      const animated =
        preventAnimation === true ? false : series.props.animated;

      return (
        <Fragment>
          {chartSized && gridlines && (
            <CloneElement<GridlineSeriesProps>
              element={gridlines}
              height={chartHeight}
              width={chartWidth}
              yScale={yScale}
              xScale={xScale}
              yAxis={yAxis.props}
              xAxis={xAxis.props}
            />
          )}
          <CloneElement<LinearAxisProps>
            element={xAxis}
            height={chartHeight}
            width={chartWidth}
            scale={xScale}
            onDimensionsChange={(e) => updateAxes('horizontal', e)}
          />
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
            onDimensionsChange={(e) => updateAxes('vertical', e)}
          />
          {secondaryAxis &&
            secondaryAxis.map((axis, i) => (
              <CloneElement<LinearAxisProps>
                key={i}
                element={axis}
                height={chartHeight}
                width={chartWidth}
                onDimensionsChange={(e) => updateAxes('horizontal', e)}
              />
            ))}
          {chartSized && (
            <CloneElement<ChartBrushProps>
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
      secondaryAxis,
      brush,
      zoomPan,
      onZoomPan,
      aggregatedData,
      zoomDomain,
      isZoomed
    ]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      containerClassName={containerClassName}
      margins={margins}
      xAxisVisible={isAxisVisible(xAxis.props)}
      yAxisVisible={isAxisVisible(yAxis.props)}
      className={classNames(css.scatterPlot, className)}
    >
      {renderChart}
    </ChartContainer>
  );
};

ScatterPlot.defaultProps = {
  data: [],
  xAxis: <LinearXAxis type="time" />,
  yAxis: <LinearYAxis type="value" />,
  series: <ScatterSeries />,
  gridlines: <GridlineSeries />,
  brush: null,
  zoomPan: null
};
