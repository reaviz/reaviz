import React, { createRef, Fragment, PureComponent } from 'react';
import { line } from 'd3-shape';
import {
  interpolate,
  InterpolationTypes
} from '../../common/utils/interpolation';
import {
  ChartInternalDataShape,
  ChartInternalShallowDataShape
} from '../../common/data';
import { calculateShowStroke } from '../../common/utils/stroke';
import {
  constructFunctionProps,
  PropFunctionTypes
} from '../../common/utils/functions';
import { MotionPath, DEFAULT_TRANSITION } from '../../common/Motion';

export interface LineProps extends PropFunctionTypes {
  /**
   * Id set internally by `AreaChart`.
   */
  id: string;

  /**
   * Parsed data shape. Set internally by `AreaChart`.
   */
  data: ChartInternalDataShape[];

  /**
   * Width of the chart. Set internally by `AreaChart`.
   */
  width: number;

  /**
   * Interpolation for the area. Set internally by `AreaSeries`.
   */
  interpolation: InterpolationTypes;

  /**
   * Color for the area. Set internally by `AreaSeries`.
   */
  color: any;

  /**
   * D3 scale for X Axis. Set internally by `AreaChart`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `AreaChart`.
   */
  yScale: any;

  /**
   * Index of the area in the series. Set internally by `AreaSeries`.
   */
  index: number;

  /**
   * Whether to animate the enter/update/exit. Set internally by `AreaSeries`.
   */
  animated: boolean;

  /**
   * Stroke width of the line.
   */
  strokeWidth: number;

  /**
   * Show the stroke if there is no value.
   */
  showZeroStroke: boolean;

  /**
   * Internal property to identify if there is a area or not.
   */
  hasArea: boolean;
}

interface LineState {
  pathLength?: number;
}

export class Line extends PureComponent<LineProps, LineState> {
  static defaultProps: Partial<LineProps> = {
    showZeroStroke: true,
    strokeWidth: 3
  };

  state: LineState = {};
  ghostPathRef = createRef<SVGPathElement>();

  componentDidMount() {
    if (this.ghostPathRef.current) {
      this.setState({
        pathLength: this.ghostPathRef.current!.getTotalLength()
      });
    }
  }

  componentDidUpdate(prevProps: LineProps) {
    if (
      this.ghostPathRef.current &&
      (prevProps.data !== this.props.data ||
        prevProps.width !== this.props.width)
    ) {
      this.setState({
        pathLength: this.ghostPathRef.current!.getTotalLength()
      });
    }
  }

  getLinePath(data: ChartInternalShallowDataShape[]) {
    const { showZeroStroke, interpolation } = this.props;

    const fn = line()
      .x((d: any) => d.x)
      .y((d: any) => d.y1)
      .defined((d: any) => showZeroStroke || calculateShowStroke(d, data))
      .curve(interpolate(interpolation));

    return fn(data as any);
  }

  getCoords() {
    const { data, xScale, yScale } = this.props;

    return data.map((item: any) => ({
      x: xScale(item.x),
      x1: xScale(item.x) - xScale(item.x1),
      y: yScale(item.y),
      y0: yScale(item.y0),
      y1: yScale(item.y1)
    })) as ChartInternalShallowDataShape[];
  }

  getLineEnter(coords: ChartInternalShallowDataShape[]) {
    const { hasArea } = this.props;
    const { pathLength } = this.state;
    const linePath = this.getLinePath(coords);

    let strokeDasharray = '';
    if (!hasArea && pathLength !== undefined) {
      strokeDasharray = `${pathLength} ${pathLength}`;
    }

    return {
      d: linePath === null ? undefined : linePath,
      strokeDashoffset: 0,
      strokeDasharray: strokeDasharray
    };
  }

  getLineExit() {
    const { hasArea, yScale, xScale, data } = this.props;
    const { pathLength } = this.state;

    let coords;
    if (hasArea) {
      const maxY = Math.max(...yScale.range());
      coords = data.map((item: any) => ({
        x: xScale(item.x),
        x1: 0,
        y: maxY,
        y1: maxY,
        y0: maxY
      })) as ChartInternalShallowDataShape[];
    } else {
      coords = this.getCoords();
    }

    const linePath = this.getLinePath(coords);

    let strokeDasharray = '';
    let strokeDashoffset = 0;
    if (!hasArea && pathLength !== undefined) {
      strokeDasharray = `${pathLength} ${pathLength}`;
      strokeDashoffset = pathLength;
    }

    return {
      d: linePath === null ? undefined : linePath,
      strokeDasharray,
      strokeDashoffset
    };
  }

  getTransition() {
    const { animated, index, hasArea } = this.props;

    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: hasArea ? 0 : index * 0.05
      };
    } else {
      return {
        type: false,
        delay: 0
      };
    }
  }

  render() {
    const { data, color, index, strokeWidth, hasArea } = this.props;
    const { pathLength } = this.state;
    const coords = this.getCoords();
    const stroke = color(data, index);
    const enter = this.getLineEnter(coords);
    const exit = this.getLineExit();
    const extras = constructFunctionProps(this.props, data);
    const transition = this.getTransition();
    const showLine = hasArea || pathLength !== undefined;

    return (
      <Fragment>
        {showLine && (
          <MotionPath
            {...extras}
            pointerEvents="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="none"
            transition={transition}
            custom={{
              enter,
              exit
            }}
          />
        )}
        {!hasArea && (
          <path
            opacity="0"
            d={enter.d}
            ref={this.ghostPathRef}
            pointerEvents="none"
          />
        )}
      </Fragment>
    );
  }
}
