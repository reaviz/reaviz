import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { identifier } from 'safe-identifier';

import type { LinearValueMarker, LinearValueMarkerProps } from '@/common';
import { mergeDefaultProps } from '@/common';
import type { ColorSchemeType } from '@/common/color';
import { getColor } from '@/common/color';
import type {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape,
} from '@/common/data';
import type { MarkLineProps } from '@/common/MarkLine';
import { MarkLine } from '@/common/MarkLine';
import type { TooltipAreaEvent, TooltipAreaProps } from '@/common/Tooltip';
import { TooltipArea } from '@/common/Tooltip';
import type { InterpolationTypes } from '@/common/utils/interpolation';

import type { AreaProps } from './Area';
import { Area } from './Area';
import type { LineProps } from './Line';
import { Line } from './Line';
import type { PointSeriesProps } from './PointSeries';
import { POINT_SERIES_DEFAULT_PROPS, PointSeries } from './PointSeries';

export type AreaChartTypes =
  | 'standard'
  | 'grouped'
  | 'stacked'
  | 'stackedNormalized';

export interface AreaSeriesProps {
  /**
   * Id set internally by `AreaChart`.
   */
  id: string;

  /**
   * D3 scale for X Axis. Set internally by `AreaChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `AreaChart`.
   */
  yScale: any;

  /**
   * Parsed data shape. Set internally by `AreaChart`.
   */
  data: ChartInternalDataShape[];

  /**
   * Height of the chart. Set internally by `AreaChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `AreaChart`.
   */
  width: number;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Type of area chart to render.
   */
  type: AreaChartTypes;

  /**
   * Interpolation type for the area/line.
   */
  interpolation: InterpolationTypes;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea>;

  /**
   * Markline for the chart.
   */
  markLine: ReactElement<MarkLineProps, typeof MarkLine> | null;

  /**
   * Symbols used to show points.
   */
  symbols: ReactElement<PointSeriesProps, typeof PointSeries> | null;

  /**
   * Line that is rendered.
   */
  line: ReactElement<LineProps, typeof Line> | null;

  /**
   * Area that is rendered.
   */
  area: ReactElement<AreaProps, typeof Area> | null;

  /**
   * Color scheme for the series.
   */
  colorScheme: ColorSchemeType;

  /**
   * Whether the chart has been zoomed or not. Set internally by `AreaChart`.
   */
  isZoomed: boolean;

  /**
   * Value markers line for the chart.
   */
  valueMarkers:
    | ReactElement<LinearValueMarkerProps, typeof LinearValueMarker>[]
    | null;
}

// For area charts, often symbols exceed the area
// and we want to add a little bit of padding to prevent clipping
const PADDING = 25;
const HALF_PADDING = PADDING / 2;

export const AreaSeries: FC<Partial<AreaSeriesProps>> = (props) => {
  const {
    data,
    height,
    id,
    width,
    isZoomed,
    tooltip,
    xScale,
    yScale,
    type,
    markLine,
    symbols,
    animated,
    area,
    interpolation,
    line,
    colorScheme,
    valueMarkers,
  } = mergeDefaultProps(AREA_SERIES_DEFAULT_PROPS, props);

  const symbolsProps = useMemo(
    () => ({
      ...POINT_SERIES_DEFAULT_PROPS,
      ...(symbols?.props ?? {}),
    }),
    [symbols],
  );

  const [activeValues, setActiveValues] = useState<any | null>(null);
  const [activePoint, setActivePoint] = useState<any | null>(null);

  const onValueEnter = useCallback((event: TooltipAreaEvent) => {
    setActivePoint(event.pointX);
    setActiveValues(event.value);
  }, []);

  const onValueLeave = useCallback(() => {
    setActivePoint(undefined);
    setActiveValues(undefined);
  }, []);

  const isMulti =
    type === 'grouped' || type === 'stacked' || type === 'stackedNormalized';

  const getPointColor = useCallback(
    (point, index: number) => {
      const key = Array.isArray(point) ? point?.[0]?.key : point?.key;

      return getColor({
        data,
        colorScheme,
        active: activeValues,
        point,
        index,
        key,
      });
    },
    [activeValues, colorScheme, data],
  );

  const renderArea = useCallback(
    (data: ChartInternalShallowDataShape[], index = 0, total = 1) => (
      <Fragment>
        {line && (
          <CloneElement<LineProps>
            element={line}
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            index={index}
            hasArea={area !== null}
            animated={animated}
            interpolation={interpolation as InterpolationTypes}
            color={getPointColor}
          />
        )}
        {area && (
          <CloneElement<AreaProps>
            element={area}
            id={`${id}-area-${index}`}
            xScale={xScale}
            yScale={yScale}
            data={data}
            index={index}
            total={total}
            animated={animated}
            interpolation={interpolation as InterpolationTypes}
            color={getPointColor}
          />
        )}
      </Fragment>
    ),
    [
      animated,
      area,
      getPointColor,
      id,
      interpolation,
      line,
      width,
      xScale,
      yScale,
    ],
  );

  const renderSymbols = useCallback(
    (data: ChartInternalShallowDataShape[], index = 0) => {
      const visible = symbols !== null;
      const activeSymbols =
        (symbols && symbolsProps.activeValues) || activeValues;

      // Animations are only valid for Area
      const isAnimated = area !== undefined && animated && !activeSymbols;

      return (
        <Fragment>
          {visible && (
            <CloneElement<PointSeriesProps>
              element={symbols}
              key={`point-series-${id}`}
              id={id}
              height={height}
              width={width}
              activeValues={activeSymbols}
              xScale={xScale}
              yScale={yScale}
              index={index}
              data={data}
              animated={isAnimated}
              color={() => getPointColor(data, index)}
            />
          )}
        </Fragment>
      );
    },
    [
      activeValues,
      animated,
      area,
      getPointColor,
      height,
      id,
      symbols,
      width,
      xScale,
      yScale,
    ],
  );

  const renderMarkLine = useCallback(
    () => (
      <>
        {activeValues && markLine && (
          <CloneElement<MarkLineProps>
            element={markLine}
            height={height}
            pointX={activePoint}
          />
        )}
      </>
    ),
    [activePoint, activeValues, height, markLine],
  );

  const renderSingleSeries = useCallback(
    (data: ChartInternalShallowDataShape[]) => (
      <Fragment>
        {renderArea(data)}
        {renderMarkLine()}
        {renderSymbols(data)}
      </Fragment>
    ),
    [renderArea, renderMarkLine, renderSymbols],
  );

  const renderMultiSeries = useCallback(
    (data: ChartInternalNestedDataShape[]) => (
      <Fragment>
        {data
          .map((point, index) => (
            <Fragment key={identifier(`${point.key}`)}>
              {renderArea(point.data, index, data.length)}
            </Fragment>
          ))
          .reverse()}
        {renderMarkLine()}
        {data
          .map((point, index) => (
            <Fragment key={identifier(`${point.key}`)}>
              {renderSymbols(point.data, index)}
            </Fragment>
          ))
          .reverse()}
      </Fragment>
    ),
    [renderArea, renderMarkLine, renderSymbols],
  );

  const renderValueMarkers = useCallback(
    () => (
      <>
        {valueMarkers?.length &&
          valueMarkers.map((marker) => {
            const isVertical = marker?.props?.direction === 'vertical';
            const size = isVertical ? height : width;
            const value = isVertical
              ? xScale(marker.props.value)
              : yScale(marker.props.value);
            return (
              <CloneElement<LinearValueMarkerProps>
                key={marker.key}
                element={marker}
                size={size}
                value={value}
              />
            );
          })}
      </>
    ),
    [valueMarkers, width, yScale, xScale, height],
  );

  return (
    <Fragment>
      <defs>
        <clipPath id={`${id}-path`}>
          <rect
            width={isZoomed ? width : width + PADDING}
            height={height + PADDING}
            x={isZoomed ? 0 : -HALF_PADDING}
            y={-HALF_PADDING}
          />
        </clipPath>
      </defs>
      <CloneElement<TooltipAreaProps>
        element={tooltip}
        xScale={xScale}
        yScale={yScale}
        data={data}
        height={height}
        width={width}
        color={getPointColor}
        onValueEnter={onValueEnter}
        onValueLeave={onValueLeave}
      >
        <g clipPath={`url(#${id}-path)`}>
          {isMulti && renderMultiSeries(data as ChartInternalNestedDataShape[])}
          {!isMulti &&
            renderSingleSeries(data as ChartInternalShallowDataShape[])}
          {renderValueMarkers()}
        </g>
      </CloneElement>
    </Fragment>
  );
};

export const AREA_SERIES_DEFAULT_PROPS: Partial<AreaSeriesProps> = {
  colorScheme: 'cybertron',
  animated: true,
  interpolation: 'linear',
  type: 'standard',
  line: <Line />,
  area: <Area />,
  markLine: <MarkLine />,
  tooltip: <TooltipArea />,
  symbols: <PointSeries />,
};
