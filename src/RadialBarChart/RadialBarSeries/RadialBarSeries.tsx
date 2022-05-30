import React, {
  FC,
  Fragment,
  ReactElement,
  useState,
  useCallback
} from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { RadialBar, RadialBarProps } from './RadialBar';
import { CloneElement } from 'rdk';
import { ColorSchemeType, getColor, schemes } from '../../common/color';
import {
  TooltipAreaProps,
  TooltipArea,
  ChartTooltip
} from '../../common/Tooltip';
import isEqual from 'react-fast-compare';

export interface RadialBarSeriesProps {
  /**
   * Parsed data shape. Set internally by `RadialBarChart`.
   */
  data: ChartInternalShallowDataShape[];

  /**
   * Color scheme for the series.
   */
  colorScheme: ColorSchemeType;

  /**
   * The inner radius for the chart center.
   */
  innerRadius: number;

  /**
   * The outer radius for the chart center.
   */
  outerRadius: number;

  /**
   * D3 scale for X Axis. Set internally by `RadialBarChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialBarChart`.
   */
  yScale: any;

  /**
   * Id set internally by `RadialBarChart`.
   */
  id: string;

  /**
   * Bar that is rendered.
   */
  bar: ReactElement<RadialBarProps, typeof RadialBar>;

  /**
   * Whether to animate the enter/update/exit.
   */
  animated: boolean;

  /**
   * Height of the chart. Set internally by `RadialBarChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `RadialBarChart`.
   */
  width: number;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea>;
}

export const RadialBarSeries: FC<Partial<RadialBarSeriesProps>> = ({
  data,
  id,
  innerRadius,
  outerRadius,
  xScale,
  yScale,
  height,
  width,
  tooltip,
  colorScheme,
  bar,
  animated
}) => {
  const [activeValues, setActiveValues] = useState<any | null>(null);

  const renderBar = useCallback(
    (point: ChartInternalShallowDataShape, index: number) => {
      const active = activeValues && data && isEqual(activeValues.x, point.x);

      return (
        <Fragment key={index}>
          <CloneElement<RadialBarProps>
            element={bar}
            id={`radialbar-${id}-${index}`}
            index={index}
            data={point}
            xScale={xScale}
            active={active}
            yScale={yScale}
            innerRadius={innerRadius}
            color={(point) => getColor({ data, point, index: 0, colorScheme })}
            barCount={data.length}
            animated={animated}
          />
        </Fragment>
      );
    },
    [
      activeValues,
      animated,
      bar,
      colorScheme,
      data,
      id,
      innerRadius,
      xScale,
      yScale
    ]
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
      onValueEnter={(event) => setActiveValues(event.value)}
      onValueLeave={() => setActiveValues(null)}
      color={(point, index) => getColor({ data, point, index, colorScheme })}
    >
      <g clipPath={`url(#${id}-path)`}>{data.map(renderBar)}</g>
    </CloneElement>
  );
};

RadialBarSeries.defaultProps = {
  colorScheme: schemes.cybertron[0],
  tooltip: <TooltipArea tooltip={<ChartTooltip followCursor={true} />} />,
  bar: <RadialBar />,
  animated: true
};
