import React, {
  Fragment,
  ReactElement,
  FC,
  useCallback,
  useState
} from 'react';
import { PointSeries, PointSeriesProps } from './PointSeries';
import { Area, AreaProps } from './Area';
import { MarkLine, MarkLineProps } from '../../common/MarkLine';
import { Marker, MarkerProps } from '../../common/Marker';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape
} from '../../common/data';
import { CloneElement } from 'rdk';
import {
  TooltipArea,
  TooltipAreaProps,
  TooltipAreaEvent
} from '../../common/Tooltip';
import { Line, LineProps } from './Line';
import { InterpolationTypes } from '../../common/utils/interpolation';
import { getColor, ColorSchemeType } from '../../common/color';

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
   * Marker for the chart.
   */
  marker: ReactElement<MarkerProps, typeof Marker> | null;

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
}

// For area charts, often symbols exceed the area
// and we want to add a little bit of padding to prevent clipping
const PADDING = 25;
const HALF_PADDING = PADDING / 2;

export const AreaSeries: FC<Partial<AreaSeriesProps>> = ({
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
  marker,
  symbols,
  animated,
  area,
  interpolation,
  line,
  colorScheme
}) => {
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
        key
      });
    },
    [activeValues, colorScheme, data]
  );

  const renderArea = useCallback(
    (data: ChartInternalShallowDataShape[], index = 0, total = 1) => {
      return (
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
              interpolation={interpolation}
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
              interpolation={interpolation}
              color={getPointColor}
            />
          )}
        </Fragment>
      );
    },
    [
      animated,
      area,
      getPointColor,
      id,
      interpolation,
      line,
      width,
      xScale,
      yScale
    ]
  );

  const renderSymbols = useCallback(
    (data: ChartInternalShallowDataShape[], index = 0) => {
      const visible = symbols !== null;
      const activeSymbols =
        (symbols && symbols.props.activeValues) || activeValues;

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
      yScale
    ]
  );

  const renderMarkLine = useCallback(() => {
    return (
      <Fragment>
        {activeValues && markLine && (
          <CloneElement<MarkLineProps>
            element={markLine}
            height={height}
            pointX={activePoint}
          />
        )}
      </Fragment>
    );
  }, [activePoint, activeValues, height, markLine]);

  const renderMarker = useCallback(() => {
    return (
      <Fragment>
        {marker && (
          <CloneElement<MarkerProps>
            element={marker}
            width={width}
            pointY={marker.props.pointY}
            label={marker.props.label}
            data={data}
          />
        )}
      </Fragment>
    );
  }, [activePoint, activeValues, width, marker]);

  const renderSingleSeries = useCallback(
    (data: ChartInternalShallowDataShape[]) => {
      return (
        <Fragment>
          {renderArea(data)}
          {renderMarkLine()}
          {renderMarker()}
          {renderSymbols(data)}
        </Fragment>
      );
    },
    [renderArea, renderMarkLine,renderMarker, renderSymbols]
  );

  const renderMultiSeries = useCallback(
    (data: ChartInternalNestedDataShape[]) => {
      return (
        <Fragment>
          {data
            .map((point, index) => (
              <Fragment key={`${point.key!.toString()}`}>
                {renderArea(point.data, index, data.length)}
              </Fragment>
            ))
            .reverse()}
          {renderMarkLine()}
          {renderMarker()}
          {data
            .map((point, index) => (
              <Fragment key={`${point.key!.toString()}`}>
                {renderSymbols(point.data, index)}
              </Fragment>
            ))
            .reverse()}
        </Fragment>
      );
    },
    [renderArea, renderMarkLine,renderMarker, renderSymbols]
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
        </g>
      </CloneElement>
    </Fragment>
  );
};

AreaSeries.defaultProps = {
  colorScheme: 'cybertron',
  animated: true,
  interpolation: 'linear',
  type: 'standard',
  line: <Line />,
  area: <Area />,
  markLine: <MarkLine />,
  marker: <Marker />,
  tooltip: <TooltipArea />,
  symbols: <PointSeries />
};
