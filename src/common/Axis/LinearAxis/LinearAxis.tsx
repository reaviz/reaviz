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
  height?: number;
  width?: number;
  domain?: ChartDataTypes[];
  scaled?: boolean;
  roundDomains?: boolean;
  type?: 'value' | 'time' | 'category' | 'duration';
  position?: 'start' | 'end' | 'center';
  tickSeries?: ReactElement<
    LinearAxisTickSeriesProps,
    typeof LinearAxisTickSeries
  >;
  axisLine?: ReactElement<LinearAxisLineProps, typeof LinearAxisLine> | null;
  scale?: any;
  visibility?: 'visible' | 'hidden';
  orientation?: 'horizontal' | 'vertical';
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

    let height;
    let width;
    if (shouldOffset) {
      const dims = containerRef.current!.getBoundingClientRect();
      width = Math.floor(dims.width);
      height = Math.floor(dims.height);
    }

    if (orientation === 'vertical') {
      // Condition check to prevent the infinite loop of re-renders when the tickSize prop is changed
      if (Math.abs(dimensions.width - width) > MIN_DIMENSION_CHANGE) {
        setDimensions({ ...dimensions, width: width });
        onDimensionsChange({ width });
      }
    } else {
      if (dimensions.height !== height) {
        setDimensions({ ...dimensions, height: height });
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
