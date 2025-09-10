import React, {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { line } from 'd3-shape';
import { interpolate, InterpolationTypes } from '@/common/utils/interpolation';
import {
  ChartInternalDataShape,
  ChartInternalShallowDataShape
} from '@/common/data';
import { calculateShowStroke } from '@/common/utils/stroke';
import {
  constructFunctionProps,
  PropFunctionTypes
} from '@/common/utils/functions';
import { MotionPath, DEFAULT_TRANSITION } from '@/common/Motion';
import { Glow, Gradient, GradientProps, roundDecimals } from '@/common';
import { generateGlowStyles } from '@/common/Glow/utils';
import { CloneElement } from 'reablocks';

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

  /**
   * Gradient to apply to the line.
   */
  gradient: ReactElement<GradientProps, typeof Gradient> | null;

  /**
   * Glow to apply to the line.
   */
  glow?: Glow;
}

export const Line: FC<Partial<LineProps>> = ({
  id,
  width,
  data,
  color,
  index,
  strokeWidth = 3,
  hasArea,
  animated,
  yScale,
  xScale,
  showZeroStroke = true,
  interpolation,
  gradient,
  glow,
  ...rest
}) => {
  const [pathLength, setPathLength] = useState<number | null>(null);
  const ghostPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (ghostPathRef.current) {
      setPathLength(roundDecimals(ghostPathRef.current.getTotalLength()));
    }
  }, [data, xScale, yScale, width]);

  const getLinePath = useCallback(
    (point: ChartInternalShallowDataShape[]) => {
      const fn = line()
        .x((d: any) => roundDecimals(d.x))
        .y((d: any) => roundDecimals(d.y1))
        .defined((d: any) => showZeroStroke || calculateShowStroke(d, point))
        .curve(interpolate(interpolation));

      return fn(point as any);
    },
    [interpolation, showZeroStroke]
  );

  const transition = useMemo(() => {
    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: hasArea ? 0 : index * 0.05
      };
    } else {
      return {
        type: false as const,
        delay: 0
      };
    }
  }, [animated, hasArea, index]);

  const coords = useMemo(() => {
    return data.map((item: any) => ({
      x: xScale(item.x),
      x1: xScale(item.x) - xScale(item.x1),
      y: yScale(item.y),
      y0: yScale(item.y0),
      y1: yScale(item.y1)
    })) as ChartInternalShallowDataShape[];
  }, [data, xScale, yScale]);

  const enter = useMemo(() => {
    const linePath = getLinePath(coords);

    let strokeDasharray = '';
    if (!hasArea && pathLength !== null) {
      strokeDasharray = `${pathLength} ${pathLength}`;
    }

    return {
      d: linePath === null ? undefined : linePath,
      strokeDashoffset: 0,
      strokeDasharray: strokeDasharray
    };
  }, [coords, getLinePath, hasArea, pathLength]);

  const exit = useMemo(() => {
    let newCoords = coords;
    if (hasArea) {
      const maxY = Math.max(...yScale.range());
      newCoords = data.map((item: any) => ({
        x: xScale(item.x),
        x1: 0,
        y: maxY,
        y1: maxY,
        y0: maxY
      })) as ChartInternalShallowDataShape[];
    }

    const linePath = getLinePath(newCoords);

    let strokeDasharray = '';
    let strokeDashoffset = 0;
    if (!hasArea && pathLength !== null) {
      strokeDasharray = `${pathLength} ${pathLength}`;
      strokeDashoffset = pathLength;
    }

    return {
      d: linePath === null ? undefined : linePath,
      strokeDasharray,
      strokeDashoffset
    };
  }, [coords, data, getLinePath, hasArea, pathLength, xScale, yScale]);

  const stroke = color(data, index);
  const extras = constructFunctionProps(rest, data);
  const showLine = hasArea || pathLength !== null;

  const strokeFill = useMemo(() => {
    if (gradient) {
      return `url(#gradient-${id})`;
    }
    return stroke;
  }, [gradient, id]);

  // framer-motion freaks out when these are added for area
  if (hasArea) {
    delete enter.strokeDashoffset;
    delete exit.strokeDashoffset;
  }

  return (
    <Fragment>
      {showLine && (
        <MotionPath
          {...extras}
          pointerEvents="none"
          stroke={strokeFill}
          strokeWidth={strokeWidth}
          fill="none"
          transition={transition}
          custom={{
            enter,
            exit
          }}
          style={{
            ...extras.style,
            ...generateGlowStyles({ glow, colorSchemeColor: strokeFill })
          }}
        />
      )}
      {!hasArea && (
        <path opacity="0" d={enter.d} ref={ghostPathRef} pointerEvents="none" />
      )}
      {gradient && (
        <CloneElement<GradientProps>
          element={gradient}
          id={`gradient-${id}`}
          color={stroke}
        />
      )}
    </Fragment>
  );
};
