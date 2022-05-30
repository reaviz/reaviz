import React, { FC, ReactElement, useCallback, useState } from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { getColor, ColorSchemeType, schemes } from '../../common/color';
import { CloneElement } from 'rdk';
import { RadialAreaProps, RadialArea } from './RadialArea';
import { RadialLine, RadialLineProps } from './RadialLine';
import { RadialInterpolationTypes } from '../../common/utils/interpolation';
import { RadialPointSeries, RadialPointSeriesProps } from './RadialPointSeries';
import { TooltipAreaProps, TooltipArea } from '../../common/Tooltip';

export interface RadialAreaSeriesProps {
  /**
   * Parsed data shape. Set internally by `RadialAreaChart`.
   */
  data: ChartInternalShallowDataShape[];

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
  colorScheme,
  interpolation
}) => {
  const [activeValues, setActiveValues] = useState<any | null>(null);

  const getColorForPoint = useCallback(
    (point: ChartInternalShallowDataShape, index: number) => {
      return getColor({
        colorScheme,
        data,
        index,
        point
      });
    },
    [colorScheme, data]
  );

  const renderArea = useCallback(
    () => (
      <CloneElement<RadialAreaProps>
        element={area}
        id={`${id}-radial-area`}
        xScale={xScale}
        yScale={yScale}
        animated={animated}
        color={getColorForPoint}
        data={data}
        interpolation={interpolation}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
      />
    ),
    [
      animated,
      area,
      data,
      getColorForPoint,
      id,
      innerRadius,
      interpolation,
      outerRadius,
      xScale,
      yScale
    ]
  );

  const renderLine = useCallback(
    () => (
      <CloneElement<RadialLineProps>
        element={line}
        xScale={xScale}
        yScale={yScale}
        animated={animated}
        interpolation={interpolation}
        color={getColorForPoint}
        data={data}
      />
    ),
    [animated, data, getColorForPoint, interpolation, line, xScale, yScale]
  );

  const renderSymbols = useCallback(() => {
    // Animations are only valid for Area
    const activeSymbols =
      (symbols && symbols.props.activeValues) || activeValues;
    const isAnimated = area !== undefined && animated && !activeSymbols;

    return (
      <CloneElement<RadialPointSeriesProps>
        element={symbols}
        activeValues={activeValues}
        xScale={xScale}
        yScale={yScale}
        data={data}
        animated={isAnimated}
        color={getColorForPoint}
      />
    );
  }, [
    activeValues,
    animated,
    area,
    data,
    getColorForPoint,
    symbols,
    xScale,
    yScale
  ]);

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
    >
      <g clipPath={`url(#${id}-path)`}>
        {area && renderArea()}
        {line && renderLine()}
        {symbols && renderSymbols()}
      </g>
    </CloneElement>
  );
};

RadialAreaSeries.defaultProps = {
  colorScheme: schemes.cybertron[0],
  interpolation: 'smooth',
  animated: true,
  area: <RadialArea />,
  line: <RadialLine />,
  symbols: <RadialPointSeries />,
  tooltip: <TooltipArea />
};
