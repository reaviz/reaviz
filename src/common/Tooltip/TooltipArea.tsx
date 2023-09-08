import React, { Fragment, ReactElement, useState, useRef, useCallback, useMemo, forwardRef } from 'react';
import { TooltipAreaEvent } from './TooltipAreaEvent';
import { Placement } from 'rdk';
import {
  ChartDataTypes,
  ChartInternalDataShape,
  ChartInternalShallowDataShape,
  ChartInternalNestedDataShape
} from '../data';
import { getPositionForTarget, getClosestPoint } from '../utils/position';
import { CloneElement } from 'rdk';
import { ChartTooltip, ChartTooltipProps } from './ChartTooltip';
import { arc } from 'd3-shape';
import isEqual from 'react-fast-compare';

export interface TooltipAreaProps {
  /**
   * Popperjs placement.
   */
  placement: Placement;

  /**
   * Chart height. Set internally.
   */
  height: number;

  /**
   * Chart width. Set internally.
   */
  width: number;

  /**
   * Chart D3 XScale. Set internally.
   */
  xScale: any;

  /**
   * Chart D3 YScale. Set internally.
   */
  yScale: any;

  /**
   * Whether the tooltip is disabled or not.
   */
  disabled: boolean;

  /**
   * Color setter.
   */
  color: any;

  /**
   * Chart internal data type.
   */
  data: ChartInternalDataShape[];

  /**
   * Child elements to be contained by.
   */
  children?: any;

  /**
   * Whether the area is radial or not.
   */
  isRadial?: boolean;

  /**
   * Inner-radius to set the positioning by. Set internally.
   */
  innerRadius?: number;

  /**
   * Outer-radius to set the positioning by. Set internally.
   */
  outerRadius?: number;

  /**
   * Tooltip element.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip>;

  /**
   * Whether to inverse the data or not.
   */
  inverse: boolean;

  /**
   * When pointer entered mouse area.
   */
  onValueEnter: (event: TooltipAreaEvent) => void;

  /**
   * When pointer left mouse area.
   */
  onValueLeave: () => void;

  /**
   * Whether the layout is horizontal or not.
   */
  isHorizontal: boolean;
}

interface TooltipDataShape {
  x?: ChartDataTypes;
  y?: ChartDataTypes;
  data?: ChartDataTypes | Array<ChartDataTypes | ChartInternalShallowDataShape>;
}

// eslint-disable-next-line react/display-name
export const TooltipArea = forwardRef<any, Partial<TooltipAreaProps>>(({
  children,
  inverse,
  tooltip,
  disabled,
  color,
  isRadial,
  width,
  height,
  xScale,
  yScale,
  onValueEnter,
  data,
  isHorizontal,
  innerRadius,
  outerRadius,
  placement: placementProp,
  onValueLeave
}, _) => {
  const [visible, setVisible] = useState<boolean>();
  const [placement, setPlacement] = useState<Placement>();
  const [value, setValue] = useState<any>();
  const [offsetX, setOffsetX] = useState<any>();
  const [offsetY, setOffsetY] = useState<any>();
  const [prevX, setPrevX] = useState<number>();
  const [prevY, setPrevY] = useState<number>();
  const ref = useRef<SVGRectElement | SVGPathElement | any>();

  const getXCoord = useCallback((x: number, y: number) => {
    // If the shape is radial, we need to convert the X coords to a radial format.
    if (isRadial) {
      const outerRadius = Math.min(width, height) / 2;
      let rad = Math.atan2(y - outerRadius, x - outerRadius) + Math.PI / 2;

      // TODO: Figure out what the 'correct' way to do this is...
      if (rad < 0) {
        rad += Math.PI * 2;
      }

      return rad;
    }

    return x;
  }, [height, isRadial, width]);

  const transformData = useCallback((series: ChartInternalDataShape[]) => {
    const result: TooltipDataShape[] = [];

    if (inverse) {
      for (const point of series) {
        const seriesPoint = point as ChartInternalNestedDataShape;
        if (Array.isArray(seriesPoint.data)) {
          for (const nestedPoint of seriesPoint.data) {
            const right = nestedPoint.x;
            let idx = result.findIndex((r) => {
              const left = r.x;
              if (left instanceof Date && right instanceof Date) {
                return left.getTime() === right.getTime();
              }
              return left === right;
            });

            if (idx === -1) {
              result.push({
                x: nestedPoint.x,
                data: []
              });

              idx = result.length - 1;
            }

            const data = result[idx].data;

            if (Array.isArray(data)) {
              data.push(nestedPoint);
            }
          }
        } else {
          result.push(point);
        }
      }
    } else {
      for (const point of series) {
        const nestedPoint = point as ChartInternalNestedDataShape;
        if (Array.isArray(nestedPoint.data)) {
          result.push({
            ...nestedPoint,
            x: nestedPoint.key,
            data: nestedPoint.data.map((d) => ({
              ...d,
              key: !isHorizontal ? d.x : d.y,
              value: !isHorizontal ? d.y : d.x
            }))
          });
        } else {
          const shallowPoint = point as ChartInternalShallowDataShape;
          result.push({
            ...shallowPoint,
            // Histograms special logic...
            x: shallowPoint.key === undefined ? shallowPoint.x0 : point.key,
            y:
              shallowPoint.value === undefined
                ? shallowPoint.y
                : shallowPoint.value
          });
        }
      }
    }

    return result;
  }, [inverse, isHorizontal]);

  const onMouseMove = useCallback((event: React.MouseEvent) => {
    const transformed = transformData(data);

    // Get our default placement
    let newPlacement = placementProp;
    if (!placementProp) {
      if (isHorizontal) {
        newPlacement = 'right';
      } else {
        newPlacement = 'top';
      }
    }

    // Get the path container element
    let target = ref.current;

    const { y, x } = getPositionForTarget({
      target: target,
      // Manually pass the x/y from the event
      clientX: event.clientX,
      clientY: event.clientY
    });

    // Need to flip scales/coords if we are a horz layout
    let keyScale;
    let valueScale;
    let coord;
    if (isHorizontal) {
      keyScale = yScale;
      valueScale = xScale;
      coord = y;
    } else {
      coord = getXCoord(x, y);
      keyScale = xScale;
      valueScale = yScale;
    }

    const newValue = getClosestPoint(coord, keyScale, transformed);

    if (!isEqual(newValue, value) && newValue) {
      const pointX = keyScale(newValue.x);
      let pointY = valueScale(newValue.y);
      let marginX = 0;
      let marginY = 0;

      if (isNaN(pointY)) {
        pointY = height / 2;
        marginX = 10;
        if (!placement) {
          newPlacement = 'right';
        }
      } else {
        marginY = -10;
      }

      // If the points didn't change, don't trigger an update
      if (pointX === prevX && pointY === prevY) {
        return;
      }

      setPrevX(pointX);
      setPrevY(pointY);

      const target = event.target as SVGRectElement;
      const { top, left } = target.getBoundingClientRect();

      let offsetX = 0;
      let offsetY = 0;

      if (isRadial) {
        // If its radial, we need to convert the coords to radial format
        const outerRadius = Math.min(width, height) / 2;
        offsetX = pointY * Math.cos(pointX - Math.PI / 2) + outerRadius;
        offsetY = pointY * Math.sin(pointX - Math.PI / 2) + outerRadius;
      } else {
        offsetX = pointX;
        offsetY = pointY;
      }

      offsetX += left + marginX;
      offsetY += top + marginY;


      setPlacement(newPlacement);
      setVisible(true);
      setValue(newValue);
      setOffsetX(offsetX);
      setOffsetY(offsetY);

      onValueEnter({
        visible: true,
        value: newValue,
        pointY,
        pointX,
        offsetX,
        offsetY,
        nativeEvent: event
      });
    }
  }, [data, getXCoord, height, isHorizontal, isRadial, onValueEnter, placement, placementProp, prevX, prevY, transformData, value, width, xScale, yScale]);

  const onMouseLeave = useCallback(() => {
    setPrevX(undefined);
    setPrevY(undefined);

    setValue(undefined);
    setVisible(false);

    onValueLeave();
  }, [onValueLeave]);

  const tooltipReference = useMemo(() => ({
    width: 4,
    height: 4,
    top: offsetY,
    left: offsetX
  }), [offsetX, offsetY]);

  const renderRadial = useCallback(() => {
    const innerRadiusNew = innerRadius || 0;
    const outerRadiusNew = outerRadius || Math.min(width, height) / 2;

    const d = arc()({
      innerRadius: innerRadiusNew,
      outerRadius: outerRadiusNew,
      startAngle: 180,
      endAngle: Math.PI / 2
    });

    return (
      <path
        d={d!}
        opacity="0"
        cursor="auto"
        ref={ref}
        onMouseMove={onMouseMove}
      />
    );
  }, [height, innerRadius, onMouseMove, outerRadius, width]);

  const renderLinear = useCallback(() => {
    return (
      <rect
        height={height}
        ref={ref}
        width={width}
        opacity={0}
        cursor="auto"
        onMouseMove={onMouseMove}
      />
    );
  }, [height, onMouseMove, width]);

  return (
    <Fragment>
      {disabled && children}
      {!disabled && (
        <g onMouseLeave={onMouseLeave}>
          {isRadial && renderRadial()}
          {!isRadial && renderLinear()}
          <CloneElement<ChartTooltipProps>
            element={tooltip}
            visible={visible}
            placement={placement}
            modifiers={{
              offset: {
                offset: '0, 15px'
              }
            }}
            reference={tooltipReference}
            color={color}
            value={value}
          />
          {children}
        </g>
      )}
    </Fragment>
  );
});

TooltipArea.defaultProps = {
  isRadial: false,
  tooltip: <ChartTooltip />,
  inverse: true,
  onValueEnter: () => undefined,
  onValueLeave: () => undefined
};
