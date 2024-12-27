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
import {
  AREA_SERIES_DEFAULT_PROPS,
  AreaSeries,
  AreaSeriesProps
} from './AreaSeries';
import {
  isAxisVisible,
  LinearAxisProps,
  LinearXAxis,
  LinearYAxis,
  LinearAxis,
  LINEAR_Y_AXIS_DEFAULT_PROPS,
  LINEAR_X_AXIS_DEFAULT_PROPS
} from '@/common/Axis/LinearAxis';
import { getXScale, getYScale } from '@/common/scales';
import { GridlineSeries, GridlineSeriesProps } from '@/common/Gridline';
import {
  ChartDataShape,
  ChartNestedDataShape,
  buildStackData,
  buildShallowChartData,
  ChartShallowDataShape,
  buildNestedChartData
} from '@/common/data';
import css from './AreaChart.module.css';
import { ChartBrushProps, ChartBrush } from '@/common/Brush';
import {
  ZoomPanChangeEvent,
  ChartZoomPanProps,
  ChartZoomPan
} from '@/common/ZoomPan';
import {
  ChartContainerChildProps,
  ChartContainer,
  ChartProps
} from '@/common/containers/ChartContainer';
import { CloneElement } from 'reablocks';
import { mergeDefaultProps } from '@/common';

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

export const AreaChart: FC<Partial<AreaChartProps>> = (props) => {
  const {
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
  } = mergeDefaultProps(AREA_CHART_DEFAULT_PROPS, props);

  const zoom: any = zoomPan ? zoomPan.props : {};
  const [zoomDomain, setZoomDomain] = useState<any>(zoom.domain);
  const [preventAnimation, setPreventAnimation] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(!!zoom.domain);
  // eslint-disable-next-line
  const [zoomControlled] = useState<boolean>(!zoom.hasOwnProperty('domain'));
  const xAxisProps = useMemo(
    () => ({ ...LINEAR_X_AXIS_DEFAULT_PROPS, ...xAxis.props }),
    [xAxis.props]
  );
  const yAxisProps = useMemo(
    () => ({ ...LINEAR_Y_AXIS_DEFAULT_PROPS, ...yAxis.props }),
    [yAxis.props]
  );
  const seriesProps = useMemo(
    () => ({ ...AREA_SERIES_DEFAULT_PROPS, ...series.props }),
    [series.props]
  );

  const timeoutRef = useRef<any | null>(null);

  const seriesType = seriesProps.type;
  const isMultiSeries =
    seriesType === 'stacked' ||
    seriesType === 'stackedNormalized' ||
    seriesType === 'grouped';

  const animated = preventAnimation === true ? false : seriesProps.animated;

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
        type: xAxisProps.type,
        roundDomains: xAxisProps.roundDomains,
        data: aggregatedData,
        domain: zoomDomain || xAxisProps.domain,
        isMultiSeries
      });

      const yScale = getYScale({
        roundDomains: yAxisProps.roundDomains,
        type: yAxisProps.type,
        height: chartHeight,
        data: aggregatedData,
        domain: yAxisProps.domain,
        isMultiSeries
      });

      return { xScale, yScale };
    },
    [
      aggregatedData,
      isMultiSeries,
      xAxisProps.domain,
      xAxisProps.roundDomains,
      xAxisProps.type,
      yAxisProps.domain,
      yAxisProps.roundDomains,
      yAxisProps.type,
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
            onDimensionsChange={(event) => updateAxes('horizontal', event)}
          >
            {xAxisProps.children}
          </CloneElement>
          <CloneElement<LinearAxisProps>
            element={yAxis}
            height={chartHeight}
            width={chartWidth}
            scale={yScale}
            visibility={chartSized ? 'visible' : 'hidden'}
            onDimensionsChange={(event) => updateAxes('vertical', event)}
          >
            {yAxisProps.children}
          </CloneElement>
          {secondaryAxis &&
            secondaryAxis.map((axis, i) => (
              <CloneElement<LinearAxisProps>
                key={i}
                element={axis}
                height={chartHeight}
                width={chartWidth}
                visibility={chartSized ? 'visible' : 'hidden'}
                onDimensionsChange={(event) => updateAxes('horizontal', event)}
              >
                {axis.props?.children}
              </CloneElement>
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
                axisType={xAxisProps.type}
                roundDomains={xAxisProps.roundDomains}
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
      xAxisProps,
      yAxisProps,
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
      xAxisVisible={isAxisVisible(xAxisProps)}
      yAxisVisible={isAxisVisible(yAxisProps)}
      className={classNames(
        css.areaChart,
        className,
        series.type as unknown as string
      )}
    >
      {renderChart}
    </ChartContainer>
  );
};

export const AREA_CHART_DEFAULT_PROPS = {
  data: [],
  xAxis: <LinearXAxis type="time" />,
  yAxis: <LinearYAxis type="value" />,
  series: <AreaSeries />,
  gridlines: <GridlineSeries />,
  brush: null,
  zoomPan: null
};
