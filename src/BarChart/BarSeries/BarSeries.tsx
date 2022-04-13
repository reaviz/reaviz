import React, {
  Fragment,
  ReactElement,
  useMemo,
  useRef,
  FC,
  useState,
  useCallback
} from 'react';
import { Bar, BarProps, BarType } from './Bar';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape,
  Direction
} from '../../common/data';
import { getColor, ColorSchemeType } from '../../common/color';
import { CloneElement } from 'rdk';
import {
  TooltipAreaProps,
  TooltipArea,
  ChartTooltip,
  TooltipAreaEvent
} from '../../common/Tooltip';

type BarElement = ReactElement<BarProps, typeof Bar>;

export interface BarSeriesProps {
  /**
   * Parsed data shape. Set internally by `BarChart`.
   */
  data: ChartInternalDataShape[];

  /**
   * Id of the bar chart. Set internally by `BarChart`.
   */
  id: string;

  /**
   * D3 scale for X Axis. Set internally by `BarChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `BarChart`.
   */
  yScale: any;

  /**
   * D3 scale for X Multi-Group Axis. Set internally by `BarChart`.
   */
  xScale1: any;

  /**
   * Bar element.
   */
  bar: BarElement | BarElement[];

  /**
   * Type of the chart.
   */
  type: BarType;

  /**
   * Color scheme for the chart.
   */
  colorScheme: ColorSchemeType;

  /**
   * Whether the chart is animated or not.
   */
  animated: boolean;

  /**
   * Amount of padding between each bar.
   */
  padding: number;

  /**
   * Amount of padding between each group.
   */
  groupPadding: number;

  /**
   * Whether the chart is categorical or not. Set internally by `BarChart`.
   */
  isCategorical: boolean;

  /**
   * Direction of the chart
   */
  layout: Direction;

  /**
   * The size of each bin/bucket in the bar chart.
   */
  binSize?: number;

  /**
   * Height of the chart. Set internally by `BarChart`.
   */
  height: number;

  /**
   * Width of the chart. Set internally by `BarChart`.
   */
  width: number;

  /**
   * Tooltip for the chart area.
   */
  tooltip: ReactElement<TooltipAreaProps, typeof TooltipArea> | null;
}

export const BarSeries: FC<Partial<BarSeriesProps>> = ({
  data,
  tooltip,
  xScale,
  yScale,
  height,
  width,
  colorScheme,
  xScale1,
  bar,
  padding,
  animated,
  isCategorical,
  layout,
  type,
  id
}) => {
  const ref = useRef<TooltipArea | null>(null);
  const [activeValues, setActiveValues] = useState<any | null>(null);
  const isVertical = useMemo(() => layout === 'vertical', [layout]);

  const isMultiSeries = useMemo(() => {
    return (
      type === 'grouped' ||
      type === 'stacked' ||
      type === 'marimekko' ||
      type === 'stackedNormalized' ||
      type === 'stackedDiverging'
    );
  }, [type]);

  const getTransform = useCallback(
    (data: ChartInternalNestedDataShape) => {
      let xPos = 0;
      let yPos = 0;
      if (type !== 'marimekko') {
        if (layout === 'vertical') {
          const val = xScale(data.key);
          xPos = val;
        } else {
          const val = yScale(data.key);
          yPos = val;
        }
      }

      return `translate(${xPos}, ${yPos})`;
    },
    [layout, type, xScale, yScale]
  );

  const getBarColor = useCallback(
    (point, index: number) => {
      let key = 'key';
      if (isMultiSeries) {
        if (layout === 'vertical') {
          key = 'x';
        } else {
          key = 'y';
        }
      }

      // histograms...
      if (point[key] === undefined) {
        key = 'x0';
      }

      return getColor({
        colorScheme,
        point,
        index,
        data,
        isMultiSeries,
        attribute: key
      });
    },
    [colorScheme, data, isMultiSeries, layout]
  );

  const onMouseMove = useCallback((event) => {
    // Manuallly call mouse move so we don't have to kill bar pointer events
    ref.current?.onMouseMove(event);
  }, []);

  const onValueEnter = useCallback((event: TooltipAreaEvent) => {
    setActiveValues(event.value);
  }, []);

  const onValueLeave = useCallback(() => {
    setActiveValues(null);
  }, []);

  const renderBar = useCallback(
    (
      data: ChartInternalShallowDataShape,
      barIndex: number,
      barCount: number,
      groupIndex?: number
    ) => {
      const active = activeValues && activeValues.x === data.key;

      let newYScale = yScale;
      let newXScale = xScale;

      if (xScale1) {
        if (isVertical) {
          newXScale = xScale1;
        } else {
          newYScale = xScale1;
        }
      }

      // Histograms dont have keys
      let key = barIndex.toString();
      if (data.key) {
        key = `${data.key!.toString()}-${groupIndex}-${data.x}`;
      }

      let barElements = Array.isArray(bar) ? bar[barIndex] : bar;
      if (!bar) {
        barElements = <Bar />;
      }

      return (
        <Fragment key={key}>
          <CloneElement<BarProps>
            element={barElements}
            id={`${id}-bar-${groupIndex}-${barIndex}`}
            animated={animated}
            active={active}
            xScale={newXScale}
            xScale1={xScale1}
            yScale={newYScale}
            padding={padding}
            barCount={barCount}
            groupIndex={groupIndex}
            barIndex={barIndex}
            data={data}
            isCategorical={isCategorical}
            color={getBarColor}
            layout={layout}
            type={type}
            onMouseMove={onMouseMove}
          />
        </Fragment>
      );
    },
    [
      activeValues,
      animated,
      bar,
      getBarColor,
      id,
      isCategorical,
      isVertical,
      layout,
      onMouseMove,
      padding,
      type,
      xScale,
      xScale1,
      yScale
    ]
  );

  const renderBarGroup = useCallback(
    (
      data: ChartInternalShallowDataShape[],
      barCount: number,
      groupIndex?: number
    ) => {
      return (
        <Fragment>
          {data.map((barData, barIndex) =>
            renderBar(barData, barIndex, barCount, groupIndex)
          )}
        </Fragment>
      );
    },
    [renderBar]
  );

  return (
    <CloneElement<TooltipAreaProps>
      element={tooltip}
      childRef={ref}
      xScale={xScale}
      yScale={yScale}
      data={data}
      height={height}
      width={width}
      inverse={false}
      isHorizontal={layout === 'horizontal'}
      color={getBarColor}
      onValueEnter={onValueEnter}
      onValueLeave={onValueLeave}
    >
      {isMultiSeries &&
        (data as ChartInternalNestedDataShape[]).map((groupData, index) => (
          <g transform={getTransform(groupData)} key={`bar-group-${index}`}>
            {renderBarGroup(
              groupData.data as ChartInternalShallowDataShape[],
              data.length,
              index
            )}
          </g>
        ))}
      {!isMultiSeries &&
        renderBarGroup(data as ChartInternalShallowDataShape[], data.length)}
    </CloneElement>
  );
};

BarSeries.defaultProps = {
  type: 'standard',
  padding: 0.1,
  groupPadding: 16,
  animated: true,
  tooltip: (
    <TooltipArea
      tooltip={
        <ChartTooltip
          followCursor={true}
          modifiers={{
            offset: '5px, 5px'
          }}
        />
      }
    />
  ),
  colorScheme: 'cybertron',
  bar: <Bar />,
  layout: 'vertical'
};
