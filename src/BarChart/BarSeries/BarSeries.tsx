import { LinearValueMarker, LinearValueMarkerProps } from '@/common';
import { ColorSchemeType, getColor } from '@/common/color';
import {
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape,
  Direction
} from '@/common/data';
import {
  CHART_TOOLTIP_DEFAULT_PROPS,
  ChartTooltip,
  TOOLTIP_AREA_DEFAULT_PROPS,
  TooltipArea,
  TooltipAreaEvent,
  TooltipAreaProps
} from '@/common/Tooltip';
import { offset } from '@floating-ui/dom';
import { CloneElement } from 'reablocks';
import React, {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
import { Bar, BAR_DEFAULT_PROPS, BarProps, BarType } from './Bar';

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

  /**
   * Value markers line for the chart.
   */
  valueMarkers:
    | ReactElement<LinearValueMarkerProps, typeof LinearValueMarker>[]
    | null;
}

export const BarSeries: FC<Partial<BarSeriesProps>> = (props) => {
  const {
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
    id,
    valueMarkers
  } = { ...BAR_SERIES_DEFAULT_PROPS, ...props };
  const ref = useRef<any | null>(null);
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
          xPos = xScale(data.key);
        } else {
          yPos = yScale(data.key);
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
    ref.current?.triggerMouseMove(event);
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
        barElements = <Bar {...BAR_DEFAULT_PROPS} />;
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

  const renderValueMarkers = useCallback(
    () => (
      <>
        {valueMarkers?.length &&
          valueMarkers.map((marker) => (
            <CloneElement<LinearValueMarkerProps>
              key={marker.key}
              element={marker}
              size={layout === 'vertical' ? width : height}
              value={
                layout === 'vertical'
                  ? yScale(marker.props.value)
                  : xScale(marker.props.value)
              }
              isHorizontal={layout === 'vertical'}
            />
          ))}
      </>
    ),
    [height, layout, valueMarkers, width, xScale, yScale]
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
      isContinous={false}
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
      {renderValueMarkers()}
    </CloneElement>
  );
};

export const BAR_SERIES_DEFAULT_PROPS = {
  type: 'standard' as BarType,
  padding: 0.1,
  groupPadding: 16,
  animated: true,
  tooltip: (
    <TooltipArea
      {...TOOLTIP_AREA_DEFAULT_PROPS}
      tooltip={
        <ChartTooltip
          {...CHART_TOOLTIP_DEFAULT_PROPS}
          followCursor={true}
          modifiers={[offset(5)]}
        />
      }
    />
  ),
  colorScheme: 'cybertron',
  bar: <Bar {...BAR_DEFAULT_PROPS} />,
  layout: 'vertical' as const
};
