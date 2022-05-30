import React, {
  Fragment,
  useEffect,
  ReactElement,
  FC,
  useCallback,
  useMemo,
  useState,
  useRef
} from 'react';
import classNames from 'classnames';
import { AreaSeries, AreaSeriesProps } from './AreaSeries';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxis,
  LinearYAxis,
  LinearAxis
} from '../common/Axis/LinearAxis';
import { getXScale, getYScale } from '../common/scales';
import { GridlineSeries, GridlineSeriesProps } from '../common/Gridline';
import {
  ChartDataShape,
  ChartNestedDataShape,
  buildStackData,
  buildShallowChartData,
  ChartShallowDataShape,
  buildNestedChartData
} from '../common/data';
import css from './AreaChart.module.css';
import { ChartBrushProps, ChartBrush } from '../common/Brush';
import {
  ZoomPanChangeEvent,
  ChartZoomPanProps,
  ChartZoomPan
} from '../common/ZoomPan';
import {
  ChartContainerChildProps,
  ChartContainer,
  ChartProps
} from '../common/containers/ChartContainer';
import { CloneElement } from 'rdk';

export interface AreaChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartDataShape[];

  /**
   * The series component that renders the area/line/circles components.
   */
  series: ReactElement<AreaSeriesProps, typeof AreaSeries>;

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

export const AreaChart: FC<Partial<AreaChartProps>> = ({
  xAxis,
  yAxis,
  id,
  data,
  width,
  height,
  margins,
  className,
  containerClassName,
  series,
  gridlines,
  brush,
  zoomPan,
  secondaryAxis
}) => {
  const zoom: any = zoomPan ? zoomPan.props : {};
  const [zoomDomain, setZoomDomain] = useState<any>(zoom.domain);
  const [preventAnimation, setPreventAnimation] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(!!zoom.domain);
  // eslint-disable-next-line
  const [zoomControlled] = useState<boolean>(!zoom.hasOwnProperty('domain'));

  const timeoutRef = useRef<any | null>(null);

  const seriesType = series.props.type;
  const isMultiSeries =
    seriesType === 'stacked' ||
    seriesType === 'stackedNormalized' ||
    seriesType === 'grouped';

  const animated = preventAnimation === true ? false : series.props.animated;

  useEffect(() => {
    if (zoomPan) {
      const zoom = zoomPan.props;
      if (!zoomControlled && zoom.domain !== zoomDomain) {
        setZoomDomain(zoom.domain);
        setIsZoomed(!!zoom.domain);
      }
    }
  }, [zoomControlled, zoomDomain, zoomPan]);

  const aggregatedData = useMemo(() => {
    if (seriesType === 'stacked' || seriesType === 'stackedNormalized') {
      return buildStackData(
        data as ChartNestedDataShape[],
        seriesType === 'stackedNormalized'
      );
    } else if (seriesType === 'grouped') {
      return buildNestedChartData(data as ChartNestedDataShape[], true);
    } else {
      return buildShallowChartData(data as ChartShallowDataShape[]);
    }
  }, [data, seriesType]);

  const getScales = useCallback(
    (chartWidth: number, chartHeight: number) => {
      const xScale = getXScale({
        width: chartWidth,
        type: xAxis.props.type,
        roundDomains: xAxis.props.roundDomains,
        data: aggregatedData,
        domain: zoomDomain || xAxis.props.domain,
        isMultiSeries
      });

      const yScale = getYScale({
        roundDomains: yAxis.props.roundDomains,
        type: yAxis.props.type,
        height: chartHeight,
        data: aggregatedData,
        domain: yAxis.props.domain,
        isMultiSeries
      });

      return { xScale, yScale };
    },
    [
      aggregatedData,
      isMultiSeries,
      xAxis.props.domain,
      xAxis.props.roundDomains,
      xAxis.props.type,
      yAxis.props.domain,
      yAxis.props.roundDomains,
      yAxis.props.type,
      zoomDomain
    ]
  );

  const onZoomPan = useCallback(
    (event: ZoomPanChangeEvent) => {
      if (zoomControlled) {
        setZoomDomain(event.domain);
        setIsZoomed(event.isZoomed);
        setPreventAnimation(true);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setPreventAnimation(false));
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
      const { xScale, yScale } = getScales(chartWidth, chartHeight);

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
            onDimensionsChange={(event) => updateAxes('horizontal', event)}
          />
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
            onDimensionsChange={(event) => updateAxes('vertical', event)}
          />
          {secondaryAxis &&
            secondaryAxis.map((axis, i) => (
              <CloneElement<LinearAxisProps>
                key={i}
                element={axis}
                height={chartHeight}
                width={chartWidth}
                onDimensionsChange={(event) => updateAxes('horizontal', event)}
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
                <CloneElement<AreaSeriesProps>
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
      aggregatedData,
      animated,
      brush,
      getScales,
      gridlines,
      isZoomed,
      onZoomPan,
      secondaryAxis,
      series,
      xAxis,
      yAxis,
      zoomDomain,
      zoomPan
    ]
  );

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      containerClassName={containerClassName}
      xAxisVisible={isAxisVisible(xAxis.props)}
      yAxisVisible={isAxisVisible(yAxis.props)}
      className={classNames(css.areaChart, className, series.type)}
    >
      {renderChart}
    </ChartContainer>
  );
};

AreaChart.defaultProps = {
  data: [],
  xAxis: <LinearXAxis type="time" />,
  yAxis: <LinearYAxis type="value" />,
  series: <AreaSeries />,
  gridlines: <GridlineSeries />,
  brush: null,
  zoomPan: null
};
