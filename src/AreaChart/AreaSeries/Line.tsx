import React, { Fragment, FC, useEffect, useRef } from 'react';
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

export const Line: FC<Partial<LineProps>> = ({
  showZeroStroke = true,
  strokeWidth = 3,
  interpolation,
  data,
  xScale,
  yScale,
  width,
  hasArea,
  animated,
  color,
  index,
  style,
  className
}) => {
  const [pathLength, setPathLength] = React.useState<number | null>(null);
  const ghostPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (ghostPathRef.current) {
      setPathLength(ghostPathRef.current?.getTotalLength());
    }
  }, []);
  useEffect(() => {
    setPathLength(ghostPathRef.current?.getTotalLength());
  }, [data, width, xScale, yScale]);

  const getLinePath = (data: ChartInternalShallowDataShape[]) => {
    const fn = line()
      .x((d: any) => d.x)
      .y((d: any) => d.y1)
      .defined((d: any) => showZeroStroke || calculateShowStroke(d, data))
      .curve(interpolate(interpolation));

    return fn(data as any);
  };

  const getCoords = () => {
    return data?.map((item: any) => ({
      x: xScale(item.x),
      x1: xScale(item.x) - xScale(item.x1),
      y: yScale(item.y),
      y0: yScale(item.y0),
      y1: yScale(item.y1)
    })) as ChartInternalShallowDataShape[];
  };

  const getLineEnter = (coords: ChartInternalShallowDataShape[]) => {
    const linePath = getLinePath(coords);

    let strokeDasharray = '';
    if (!hasArea && pathLength !== undefined) {
      strokeDasharray = `${pathLength} ${pathLength}`;
    }

    return {
      d: linePath === null ? undefined : linePath,
      strokeDashoffset: 0,
      strokeDasharray: strokeDasharray
    };
  };

  const getLineExit = () => {
    let coords: any;
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
      coords = getCoords();
    }

    const linePath = getLinePath(coords);

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
  };

  const getTransition = () => {
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
  };

  const coords = getCoords();
  const stroke = color(data, index);
  const enter = getLineEnter(coords);
  const exit = getLineExit();
  const extras = constructFunctionProps({ style, className }, data);
  const transition = getTransition();
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
        <path opacity="0" d={enter.d} ref={ghostPathRef} pointerEvents="none" />
      )}
    </Fragment>
  );
};
