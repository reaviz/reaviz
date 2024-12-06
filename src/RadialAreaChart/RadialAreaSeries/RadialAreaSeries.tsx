import React, {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useState
} from 'react';
import {
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape
} from '@/common/data';
import { getColor, ColorSchemeType, schemes } from '@/common/color';
import { CloneElement } from 'reablocks';
import { RadialAreaProps, RadialArea } from './RadialArea';
import { RadialLine, RadialLineProps } from './RadialLine';
import { RadialInterpolationTypes } from '@/common/utils/interpolation';
import { RadialPointSeries, RadialPointSeriesProps } from './RadialPointSeries';
import {
  TooltipAreaProps,
  TooltipArea,
  TOOLTIP_AREA_DEFAULT_PROPS
} from '@/common/Tooltip';
import { RadialValueMarker, RadialValueMarkerProps } from '@/common';

export type RadialPointSeriesType = 'standard' | 'grouped';

export interface RadialAreaSeriesProps {
  /**
   * Parsed data shape. Set internally by `RadialAreaChart`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * The type of the chart.
   */
  type?: RadialPointSeriesType;

  /**
   * Color scheme for the series.
   */
  colorScheme: ColorSchemeType;

  /**
   * The outer radius for the chart center.
   */
  outerRadius: number;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;

  /**
   * D3 scale for X Axis. Set internally by `RadialAreaChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialAreaChart`.
   */
  yScale: any;

  /**
   * Id set internally by `RadialAreaChart`.
   */
  id: string;

  /**
   * interpolation set internally by `RadialAreaChart`.
   */
  interpolation: RadialInterpolationTypes;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Height of the chart. Set internally by `RadialAreaChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `RadialAreaChart`.
   */
  width: number;

  /**
   * Area that is rendered.
   */
  area: ReactElement<RadialAreaProps, typeof RadialArea> | null;

  /**
   * Line that is rendered.
   */
  line: ReactElement<RadialLineProps, typeof RadialLine> | null;

  /**
   * Symbols used to show points.
   */
  symbols: ReactElement<
    RadialPointSeriesProps,
    typeof RadialPointSeries
  > | null;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea>;

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
  isClosedCurve: boolean;

  /**
   * Value markers line for the chart.
   */
  valueMarkers:
    | ReactElement<RadialValueMarkerProps, typeof RadialValueMarker>[]
    | null;
}

export const RadialAreaSeries: FC<Partial<RadialAreaSeriesProps>> = ({
  area,
  line,
  symbols,
  tooltip,
  xScale,
  yScale,
  data,
  id,
  animated,
  width,
  height,
  innerRadius,
  outerRadius,
  type,
  colorScheme,
  interpolation,
  startAngle,
  endAngle,
  isClosedCurve,
  valueMarkers
}) => {
  const [activeValues, setActiveValues] = useState<any | null>(null);
  const isMulti = type === 'grouped';

  const getColorForPoint = useCallback(
    (point: ChartInternalShallowDataShape, index: number) => {
      const key = Array.isArray(point) ? point?.[0]?.key : point?.key;

      return getColor({
        colorScheme,
        data,
        index,
        point,
        key
      });
    },
    [colorScheme, data]
  );

  const renderArea = useCallback(
    (point: ChartInternalShallowDataShape[], index = 0) => (
      <>
        {area && (
          <CloneElement<RadialAreaProps>
            element={area}
            id={`${id}-radial-area-${index}`}
            xScale={xScale}
            yScale={yScale}
            animated={animated}
            color={getColorForPoint}
            index={index}
            data={point}
            interpolation={interpolation}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            isClosedCurve={isClosedCurve}
          />
        )}
        {line && (
          <CloneElement<RadialLineProps>
            element={line}
            xScale={xScale}
            yScale={yScale}
            hasArea={area !== null}
            index={index}
            animated={animated}
            interpolation={interpolation}
            color={getColorForPoint}
            data={point}
            isClosedCurve={isClosedCurve}
          />
        )}
      </>
    ),
    [
      animated,
      area,
      getColorForPoint,
      id,
      innerRadius,
      interpolation,
      isClosedCurve,
      line,
      outerRadius,
      xScale,
      yScale
    ]
  );

  const renderSymbols = useCallback(
    (data: ChartInternalShallowDataShape[], index = 0) => {
      // Animations are only valid for Area
      const activeSymbols =
        (symbols && symbols.props.activeValues) || activeValues;
      const isAnimated = area !== undefined && animated && !activeSymbols;

      return (
        <CloneElement<RadialPointSeriesProps>
          element={symbols}
          activeValues={activeValues}
          xScale={xScale}
          index={index}
          yScale={yScale}
          data={data}
          animated={isAnimated}
          color={getColorForPoint}
        />
      );
    },
    [activeValues, animated, area, getColorForPoint, symbols, xScale, yScale]
  );

  const renderSingleSeries = useCallback(
    (points: ChartInternalShallowDataShape[]) => (
      <Fragment>
        {renderArea(points)}
        {symbols && renderSymbols(points)}
      </Fragment>
    ),
    [renderArea, renderSymbols, symbols]
  );

  const renderMultiSeries = useCallback(
    (points: ChartInternalNestedDataShape[]) => (
      <Fragment>
        {points
          .map((point, index) => (
            <Fragment key={`${point.key!.toString()}`}>
              {renderArea(point.data, index)}
            </Fragment>
          ))
          .reverse()}
        {points
          .map((point, index) => (
            <Fragment key={`${point.key!.toString()}`}>
              {renderSymbols(point.data, index)}
            </Fragment>
          ))
          .reverse()}
      </Fragment>
    ),
    [renderArea, renderSymbols]
  );

  const renderValueMarkers = useCallback(
    () => (
      <>
        {valueMarkers?.length &&
          valueMarkers.map((marker) => (
            <CloneElement<RadialValueMarkerProps>
              key={marker.key}
              element={marker}
              value={yScale(marker.props.value)}
            />
          ))}
      </>
    ),
    [valueMarkers, yScale]
  );

  return (
    <CloneElement<TooltipAreaProps>
      element={tooltip}
      xScale={xScale}
      yScale={yScale}
      data={data}
      height={height}
      width={width}
      isRadial={true}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      color={getColorForPoint}
      onValueEnter={(event) => setActiveValues(event.value)}
      onValueLeave={() => setActiveValues(null)}
      startAngle={startAngle}
      endAngle={endAngle}
    >
      <g clipPath={`url(#${id}-path)`}>
        {isMulti &&
          renderMultiSeries(data as unknown as ChartInternalNestedDataShape[])}
        {!isMulti &&
          renderSingleSeries(data as ChartInternalShallowDataShape[])}
        {renderValueMarkers()}
      </g>
    </CloneElement>
  );
};

RadialAreaSeries.defaultProps = {
  colorScheme: schemes.cybertron,
  interpolation: 'smooth',
  type: 'standard',
  animated: true,
  area: <RadialArea />,
  line: <RadialLine />,
  symbols: <RadialPointSeries />,
  tooltip: <TooltipArea {...TOOLTIP_AREA_DEFAULT_PROPS} />,
  startAngle: 0,
  endAngle: 2 * Math.PI,
  isClosedCurve: true
};
