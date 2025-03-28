import React, {
  Fragment,
  ReactElement,
  useState,
  useRef,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle
} from 'react';
import { flip, offset } from '@floating-ui/dom';
import { TooltipAreaEvent } from './TooltipAreaEvent';
import {
  ChartDataTypes,
  ChartInternalDataShape,
  ChartInternalShallowDataShape,
  ChartInternalNestedDataShape
} from '@/common/data';
import {
  getPositionForTarget,
  getClosestContinousScalePoint,
  getClosestBandScalePoint
} from '@/common/utils/position';
import { CloneElement, Placement } from 'reablocks';
import { ChartTooltip, ChartTooltipProps } from './ChartTooltip';
import { arc } from 'd3-shape';
import isEqual from 'react-fast-compare';
import { scaleLinear } from 'd3-scale';

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
   * Whether the area is continous or not (e.g. line and area charts are continous, bar charts are not).
   */
  isContinous?: boolean;

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

  /**
   * Start angle for the first value.
   */
  startAngle?: number;

  /**
   * End angle for the last value.
   */
  endAngle?: number;
}

interface TooltipDataShape {
  x?: ChartDataTypes;
  y?: ChartDataTypes;
  data?: ChartDataTypes | Array<ChartDataTypes | ChartInternalShallowDataShape>;
  i?: number;
}

// eslint-disable-next-line react/display-name
export const TooltipArea = forwardRef<any, Partial<TooltipAreaProps>>(
  (
    {
      children,
      inverse = true,
      tooltip = <ChartTooltip />,
      disabled,
      color,
      isRadial = false,
      isContinous = true,
      width,
      height,
      xScale,
      yScale,
      onValueEnter = () => undefined,
      data,
      isHorizontal,
      innerRadius,
      outerRadius,
      placement: placementProp,
      onValueLeave = () => undefined,
      startAngle = 0,
      endAngle = 2 * Math.PI
    },
    childRef
  ) => {
    const [visible, setVisible] = useState<boolean>();
    const [placement, setPlacement] = useState<Placement>();
    const [value, setValue] = useState<any>();
    const [offsetX, setOffsetX] = useState<any>();
    const [offsetY, setOffsetY] = useState<any>();
    const [prevX, setPrevX] = useState<number>();
    const [prevY, setPrevY] = useState<number>();
    const ref = useRef<SVGRectElement | SVGPathElement | any>();
    const fullCircleref = useRef<SVGRectElement | SVGPathElement | any>(null);
    const isFullCircle = Math.abs(endAngle - startAngle) >= 2 * Math.PI;

    const range = Math.abs(endAngle - startAngle);

    const rotationFactor = 0.5;

    const getXCoord = useCallback(
      (x: number, y: number) => {
        // If the shape is radial, we need to convert the X coords to a radial format.
        if (isRadial) {
          const outerRadiusNew = outerRadius || Math.min(width, height) / 2;
          let rad =
            Math.atan2(y - outerRadiusNew, x - outerRadiusNew) +
            rotationFactor * Math.PI;

          // Align it with the expected start angle
          rad = (rad - startAngle) % (2 * Math.PI);

          // TODO: Figure out what the 'correct' way to do this is...
          if (rad < 0) {
            rad += Math.PI * 2;
          }

          // convert to given range
          const scale = scaleLinear()
            .domain([0, range])
            .range([startAngle, endAngle]);
          rad = scale(rad);

          return rad;
        }

        return x;
      },
      [endAngle, height, isRadial, outerRadius, range, startAngle, width]
    );

    const transformData = useCallback(
      (series: ChartInternalDataShape[]) => {
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
      },
      [inverse, isHorizontal]
    );

    const onMouseMove = useCallback(
      (event: React.MouseEvent) => {
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
        // Note that we are using the dummy 'full' circle for alignment
        let target = fullCircleref.current || ref.current;

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
        let attr = 'x';
        if (isHorizontal) {
          keyScale = yScale;
          valueScale = xScale;
          coord = y;
        } else {
          coord = getXCoord(x, y);
          keyScale = xScale;
          valueScale = yScale;
        }

        // If an index value exists in the data, use that to grab closest point
        if (typeof transformed[0].i === 'number') {
          attr = 'i';
        }

        // Get the closest point to the mouse
        // Consider invertable scales to be continous
        // Round non-continous charts with a continous scale down
        // Round band scales to the closest point for radial charts
        const newValue = keyScale.invert
          ? getClosestContinousScalePoint({
            pos: coord,
            scale: keyScale,
            data: transformed,
            attr,
            roundDown: !isContinous
          })
          : getClosestBandScalePoint({
            pos: coord,
            scale: keyScale,
            data: transformed,
            attr,
            roundClosest: isRadial
          });

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
            offsetX =
              pointY * Math.cos(pointX - rotationFactor * Math.PI) +
              outerRadius;
            offsetY =
              pointY * Math.sin(pointX - rotationFactor * Math.PI) +
              outerRadius;
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
      },
      [
        data,
        getXCoord,
        height,
        isContinous,
        isHorizontal,
        isRadial,
        onValueEnter,
        placement,
        placementProp,
        prevX,
        prevY,
        transformData,
        value,
        width,
        xScale,
        yScale
      ]
    );

    const onMouseLeave = useCallback(() => {
      setPrevX(undefined);
      setPrevY(undefined);

      setValue(undefined);
      setVisible(false);

      onValueLeave();
    }, [onValueLeave]);

    useImperativeHandle(childRef, () => ({
      triggerMouseMove(e: React.MouseEvent) {
        onMouseMove(e);
      }
    }));

    const tooltipReference = useMemo(
      () => ({
        width: 4,
        height: 4,
        top: offsetY,
        left: offsetX
      }),
      [offsetX, offsetY]
    );

    const renderRadial = useCallback(() => {
      const innerRadiusNew = innerRadius || 0;
      const outerRadiusNew = outerRadius || Math.min(width, height) / 2;

      const d = arc()({
        innerRadius: innerRadiusNew,
        outerRadius: outerRadiusNew,
        startAngle: isFullCircle ? 0 : startAngle,
        endAngle: isFullCircle ? 2 * Math.PI : endAngle
      });

      // This is a dummuy full circle in the background as we need the
      // full circle to get the coordinates right from getBoundingClientRect().
      // If we don't use a full circle, then the bounding rectangle could be of any dimension and
      // the logic in getPositionForTarget() wouldn't work
      const fullCircle = arc()({
        innerRadius: innerRadiusNew,
        outerRadius: outerRadiusNew,
        startAngle: 0,
        endAngle: 2 * Math.PI
      });

      return (
        <>
          <path d={fullCircle!} opacity="0" cursor="auto" ref={fullCircleref} />
          <path
            d={d!}
            opacity="0"
            cursor="auto"
            ref={ref}
            onMouseMove={onMouseMove}
          />
        </>
      );
    }, [
      endAngle,
      height,
      innerRadius,
      isFullCircle,
      onMouseMove,
      outerRadius,
      startAngle,
      width
    ]);

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
          <g onMouseLeave={onMouseLeave} ref={childRef}>
            {isRadial && renderRadial()}
            {!isRadial && renderLinear()}
            <CloneElement<ChartTooltipProps>
              element={tooltip}
              visible={visible}
              placement={placement}
              modifiers={[offset({ mainAxis: 15 }), flip()]}
              reference={tooltipReference}
              color={color}
              value={value}
            />
            {children}
          </g>
        )}
      </Fragment>
    );
  }
);
