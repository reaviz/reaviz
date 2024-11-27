import { CloneElement } from 'reablocks';
import React, {
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ChartDataTypes } from '@/common/data';
import { LinearAxisLine, LinearAxisLineProps } from './LinearAxisLine';
import {
  LinearAxisTickSeries,
  LinearAxisTickSeriesProps
} from './LinearAxisTickSeries';
import { getChildComponent, hasChildComponent } from '@/common/utils';
import {
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries
} from './LinearYAxis';
import {
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries
} from './LinearXAxis';
import { LinearAxisTickLabel } from './LinearAxisTickLabel';

export interface LinearAxisDimensionChanged {
  height?: number;
  width?: number;
}

export interface LinearAxisProps extends PropsWithChildren {
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

export const LinearAxis: FC<Partial<LinearAxisProps>> = (props) => {
  const {
    position,
    // axisLine,
    height,
    width,
    scale,
    orientation,
    visibility = 'visible',
    children,
    onDimensionsChange
  } = props;

  const tickSeries = useMemo(
    () =>
      getChildComponent<
        ReactElement<LinearAxisTickSeriesProps, typeof LinearAxisTickSeries>
      >(
        children,
        orientation === 'vertical'
          ? LinearYAxisTickSeries.name
          : LinearXAxisTickSeries.name,
        orientation === 'vertical' ? (
          // TODO: add default child component
          <LinearYAxisTickSeries />
        ) : (
          // TODO: add default child component
          <LinearXAxisTickSeries />
        )
      ),
    [children, orientation]
  );
  const axisLine = useMemo(() => {
    return getChildComponent<
      ReactElement<LinearAxisLineProps, typeof LinearAxisLine>
    >(children, LinearAxisLine.name, <LinearAxisLine />);
  }, [children]);

  const containerRef = createRef<SVGGElement>();
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
      if (dimensions.width !== width) {
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

  // TODO: think how to make it abstract (get rid X,Y names)
  const hasLineOrLabel = useMemo(() => {
    return (
      hasChildComponent(
        tickSeries.props.children,
        orientation === 'vertical'
          ? LinearYAxisTickLine.name
          : LinearXAxisTickLine.name
      ) ||
      hasChildComponent(
        tickSeries.props.children,
        orientation === 'vertical'
          ? LinearYAxisTickLabel.name
          : LinearXAxisTickLabel.name
      )
    );
  }, [orientation, tickSeries]);

  return (
    <g
      transform={`translate(${translateX}, ${translateY})`}
      ref={containerRef}
      visibility={visibility}
    >
      {axisLine && (
        <LinearAxisLine
          height={height}
          width={width}
          scale={scale}
          orientation={orientation}
          {...axisLine?.props}
        />
      )}
      {hasLineOrLabel &&
        (orientation === 'vertical' ? (
          <LinearYAxisTickSeries
            {...tickSeries.props}
            height={height}
            width={width}
            scale={scale}
            orientation={orientation}
            axis={props}
          >
            {tickSeries.props.children}
          </LinearYAxisTickSeries>
        ) : (
          <LinearXAxisTickSeries
            {...tickSeries.props}
            height={height}
            width={width}
            scale={scale}
            orientation={orientation}
            axis={props}
          >
            {tickSeries.props.children}
          </LinearXAxisTickSeries>
        ))}
    </g>
  );
};

// LinearAxis.defaultProps = {
//   scaled: false,
//   roundDomains: false,
//   axisLine: <LinearAxisLine />,
//   onDimensionsChange: () => undefined
// };

export const defaultProps = {
  scaled: false,
  roundDomains: false,
  axisLine: <LinearAxisLine />,
  onDimensionsChange: () => undefined
};
