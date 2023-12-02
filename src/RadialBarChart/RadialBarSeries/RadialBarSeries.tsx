import React, {
  FC,
  Fragment,
  ReactElement,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape
} from '../../common/data';
import { RadialBar, RadialBarProps } from './RadialBar';
import { CloneElement } from 'rdk';
import { ColorSchemeType, getColor, schemes } from '../../common/color';
import {
  TooltipAreaProps,
  TooltipArea,
  ChartTooltip
} from '../../common/Tooltip';
import isEqual from 'react-fast-compare';

export type RadialBarSeriesType = 'standard' | 'grouped';
export interface RadialBarSeriesProps {
  /**
   * Parsed data shape. Set internally by `RadialBarChart`.
   */
  data: ChartInternalDataShape[];

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

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;

  /**
   * The type of the chart.
   */
  type?: RadialBarSeriesType;
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
  animated,
  startAngle,
  endAngle,
  type
}) => {
  const [activeValues, setActiveValues] = useState<any | null>(null);
  const isMultiSeries = useMemo(() => type === 'grouped', [type]);
  const [isAnimating, setIsAnimating] = useState<boolean>(animated);

  const onValueEnter = (e) => {
    if (!isAnimating) {
      setActiveValues(e.value);
    }
  };

  const onValueLeave = () => {
    if (!isAnimating) {
      setActiveValues(null);
    }
  };

  const renderBar = useCallback(
    (point: ChartInternalShallowDataShape, innerBarCount: number, index: number, barCount: number,
      groupIndex?: number) => {
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
            barCount={barCount}
            innerBarCount={innerBarCount}
            groupIndex={groupIndex}
            animated={animated}
            startAngle={startAngle}
            endAngle={endAngle}
            setIsAnimating={setIsAnimating}
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
      endAngle,
      id,
      innerRadius,
      startAngle,
      xScale,
      yScale
    ]
  );

  const renderBarGroup = useCallback(
    (
      data: ChartInternalShallowDataShape[],
      innerBarCount: number,
      barCount: number,
      groupIndex?: number
    ) => {
      return (
        <Fragment>
          {data.map((barData, barIndex) =>
            renderBar(barData, innerBarCount, barIndex, barCount, groupIndex)
          )}
        </Fragment>
      );
    },
    [renderBar]
  );

  useEffect(() => {
    setIsAnimating(animated);
  }, [animated, data]);

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
      onValueEnter={onValueEnter}
      onValueLeave={onValueLeave}
      color={(point, index) => getColor({ data, point, index, colorScheme })}
      startAngle={startAngle}
      endAngle={endAngle}
    >
      {isMultiSeries ?
        (data as ChartInternalNestedDataShape[]).map((groupData, index) => (
          <g key={`bar-group-${index}`}>
            {renderBarGroup(
              groupData.data as ChartInternalShallowDataShape[],
              data.length,
              groupData.data.length,
              index
            )}
          </g>
        ))
        :
        renderBarGroup(data as ChartInternalShallowDataShape[], 1, data.length)
      }
    </CloneElement>
  );
};

RadialBarSeries.defaultProps = {
  colorScheme: schemes.cybertron[0],
  tooltip: <TooltipArea tooltip={<ChartTooltip followCursor={true} />} />,
  bar: <RadialBar />,
  animated: true,
  startAngle: 0,
  endAngle: 2 * Math.PI,
  type: 'standard'
};
