import { CloneElement } from 'reablocks';
import React, {
  FC,
  ReactElement,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ChartDataTypes } from '@/common/data';
import { LinearAxisLine, LinearAxisLineProps } from './LinearAxisLine';
import {
  LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS,
  LinearAxisTickSeries,
  LinearAxisTickSeriesProps
} from './LinearAxisTickSeries';
import { mergeDefaultProps } from '@/common/utils';

export interface LinearAxisDimensionChanged {
  height?: number;
  width?: number;
}

export interface LinearAxisProps {
  /**
   * Height of the axis. Set internally by the parent chart.
   */
  height?: number;

  /**
   * Width of the axis. Set internally by the parent chart.
   */
  width?: number;

  /**
   * Explicit domain to use for the axis.
   */
  domain?: ChartDataTypes[];

  /**
   * Whether the axis is already scaled.
   *
   * @default false
   */
  scaled?: boolean;

  /**
   * Whether to round the domain values.
   *
   * @default false
   */
  roundDomains?: boolean;

  /**
   * Type of the axis.
   */
  type?: 'value' | 'time' | 'category' | 'duration';

  /**
   * Position of the axis relative to the chart area.
   */
  position?: 'start' | 'end' | 'center';

  /**
   * The tick series component for the axis.
   */
  tickSeries?: ReactElement<
    LinearAxisTickSeriesProps,
    typeof LinearAxisTickSeries
  >;

  /**
   * The axis line component.
   *
   * @default `<LinearAxisLine />`
   */
  axisLine?: ReactElement<LinearAxisLineProps, typeof LinearAxisLine> | null;

  /**
   * D3 scale for the axis. Set internally by the parent chart.
   */
  scale?: any;

  /**
   * Visibility of the axis.
   *
   * @default 'visible'
   */
  visibility?: 'visible' | 'hidden';

  /**
   * Orientation of the axis.
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Fires when the axis dimensions change.
   */
  onDimensionsChange?: (event: LinearAxisDimensionChanged) => void;
}

interface LinearAxisState {
  height?: number;
  width?: number;
}

const MIN_DIMENSION_CHANGE = 6;

export const LinearAxis: FC<Partial<LinearAxisProps>> = (props) => {
  const {
    position,
    tickSeries,
    axisLine,
    height,
    width,
    scale,
    orientation,
    visibility = 'visible',
    onDimensionsChange
  } = mergeDefaultProps(LINEAR_AXIS_DEFAULT_PROPS, props);
  const tickSeriesProps = useMemo(
    () =>
      mergeDefaultProps(
        LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS,
        tickSeries?.props
      ),
    [tickSeries?.props]
  );

  const containerRef = useRef<SVGGElement>(null);
  const [dimensions, setDimensions] = useState<LinearAxisState>({
    height: height,
    width: width
  });

  const updateDimensions = useCallback(() => {
    const shouldOffset = position !== 'center';

    // Centered axes reserve no edge offset (width/height stay 0), but must still
    // notify ChartContainer so xAxisSized/yAxisSized flip true and chartSized
    // unhides the axes and data series.
    let height = 0;
    let width = 0;
    if (shouldOffset) {
      const dims = containerRef.current!.getBoundingClientRect();
      width = Math.floor(dims.width);
      height = Math.floor(dims.height);
    }

    if (orientation === 'vertical') {
      // Condition check to prevent the infinite loop of re-renders when the tickSize prop is changed
      if (
        dimensions.width === undefined ||
        Math.abs(dimensions.width - width) > MIN_DIMENSION_CHANGE
      ) {
        setDimensions({ ...dimensions, width });
        onDimensionsChange({ width });
      }
    } else {
      if (dimensions.height !== height) {
        setDimensions({ ...dimensions, height });
        onDimensionsChange({ height });
      }
    }
  }, [containerRef, dimensions, onDimensionsChange, orientation, position]);

  useEffect(() => {
    updateDimensions();
  }, [updateDimensions, height, width, scale]);

  function getPosition() {
    let translateY = 0;
    let translateX = 0;

    if (position === 'end' && orientation === 'horizontal') {
      translateY = height;
    } else if (position === 'center' && orientation === 'horizontal') {
      translateY = height / 2;
    } else if (position === 'end' && orientation === 'vertical') {
      translateX = width;
    } else if (position === 'center' && orientation === 'vertical') {
      translateX = width / 2;
    }

    return { translateX, translateY };
  }

  const { translateX, translateY } = getPosition();

  return (
    <g
      transform={`translate(${translateX}, ${translateY})`}
      ref={containerRef}
      visibility={visibility}
    >
      {axisLine && (
        <CloneElement<LinearAxisLineProps>
          element={axisLine}
          height={height}
          width={width}
          scale={scale}
          orientation={orientation}
        />
      )}
      {(tickSeriesProps.line || tickSeriesProps.label) && (
        <CloneElement<LinearAxisTickSeriesProps>
          element={tickSeries}
          height={height}
          width={width}
          scale={scale}
          orientation={orientation}
          axis={props}
        />
      )}
    </g>
  );
};

export const LINEAR_AXIS_DEFAULT_PROPS = {
  scaled: false,
  roundDomains: false,
  axisLine: <LinearAxisLine />,
  onDimensionsChange: () => undefined
};
