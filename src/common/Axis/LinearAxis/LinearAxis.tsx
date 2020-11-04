import React, { Component, createRef, ReactElement } from 'react';
import {
  LinearAxisTickSeries,
  LinearAxisTickSeriesProps
} from './LinearAxisTickSeries';
import { ChartDataTypes } from '../../data';
import { CloneElement } from 'rdk';
import { LinearAxisLine, LinearAxisLineProps } from './LinearAxisLine';

export interface LinearAxisDimensionChanged {
  height?: number;
  width?: number;
}

export interface LinearAxisProps {
  domain?: ChartDataTypes[];
  scaled?: boolean;
  roundDomains?: boolean;
  type: 'value' | 'time' | 'category' | 'duration';
  position: 'start' | 'end' | 'center';
  tickSeries: ReactElement<
    LinearAxisTickSeriesProps,
    typeof LinearAxisTickSeries
  >;
  axisLine: ReactElement<LinearAxisLineProps, typeof LinearAxisLine> | null;
  height: number;
  width: number;
  scale: any;
  orientation: 'horizontal' | 'vertical';
  onDimensionsChange: (event: LinearAxisDimensionChanged) => void;
}

interface LinearAxisState {
  height?: number;
  width?: number;
}

export class LinearAxis extends Component<LinearAxisProps, LinearAxisState> {
  static defaultProps: Partial<LinearAxisProps> = {
    axisLine: <LinearAxisLine />,
    tickSeries: <LinearAxisTickSeries />,
    scaled: false,
    roundDomains: false,
    onDimensionsChange: () => undefined
  };

  ref = createRef<SVGGElement>();

  constructor(props: LinearAxisProps) {
    super(props);

    this.state = {
      height: props.height,
      width: props.width
    };
  }

  componentDidMount() {
    this.updateDimensions();
  }

  componentDidUpdate(prevProps: LinearAxisProps) {
    const { height, width, scale } = this.props;
    if (
      width !== prevProps.width ||
      height !== prevProps.height ||
      scale !== prevProps.scale
    ) {
      this.updateDimensions();
    }
  }

  updateDimensions() {
    const { onDimensionsChange, orientation, position } = this.props;
    const shouldOffset = position !== 'center';

    let height;
    let width;
    if (shouldOffset) {
      const dims = this.ref.current!.getBoundingClientRect();
      width = Math.floor(dims.width);
      height = Math.floor(dims.height);
    }

    if (orientation === 'vertical') {
      if (this.state.width !== width) {
        this.setState({ width });
        onDimensionsChange({ width });
      }
    } else {
      if (this.state.height !== height) {
        this.setState({ height });
        onDimensionsChange({ height });
      }
    }
  }

  getPosition() {
    const { position, width, height, orientation } = this.props;
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

  render() {
    const {
      scale,
      height,
      width,
      orientation,
      axisLine,
      tickSeries
    } = this.props;
    const { translateX, translateY } = this.getPosition();

    return (
      <g transform={`translate(${translateX}, ${translateY})`} ref={this.ref}>
        {axisLine && (
          <CloneElement<LinearAxisLineProps>
            element={axisLine}
            height={height}
            width={width}
            scale={scale}
            orientation={orientation}
          />
        )}
        {(tickSeries.props.line || tickSeries.props.label) && (
          <CloneElement<LinearAxisTickSeriesProps>
            element={tickSeries}
            height={height}
            width={width}
            scale={scale}
            orientation={orientation}
            axis={this.props}
          />
        )}
      </g>
    );
  }
}
