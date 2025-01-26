import React, {
  FC,
  Fragment,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo
} from 'react';
import {
  LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearAxisTickLabel,
  LinearAxisTickLabelProps
} from './LinearAxisTickLabel';
import {
  LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisTickLine,
  LinearAxisTickLineProps
} from './LinearAxisTickLine';
import { formatValue } from '@/common/utils/formatting';
import { getTicks, getMaxTicks } from '@/common/utils/ticks';
import { TimeInterval } from 'd3-time';
import { CloneElement } from 'reablocks';
import { LinearAxisProps } from './LinearAxis';
import ellipsize from 'ellipsize';
import { max } from 'd3-array';
import { calculateDimensions } from '@/common/utils/size';
import { getChildComponent, mergeDefaultProps } from '@/common/utils';
import { useDefaultProps } from '@/common/utils';

export interface LinearAxisTickSeriesProps extends PropsWithChildren {
  height: number;
  width: number;
  scale: any;
  interval?: number | TimeInterval;
  tickSize: number;
  tickValues: any[];
  orientation: 'horizontal' | 'vertical';
  label: ReactElement<
    LinearAxisTickLabelProps,
    typeof LinearAxisTickLabel
  > | null;
  line: ReactElement<LinearAxisTickLineProps, typeof LinearAxisTickLine> | null;
  axis: LinearAxisProps;
}

interface ProcessedTick {
  text: string;
  fullText: string;
  x: number;
  y: number;
  height: number;
  width: number;
  half: 'start' | 'end' | 'center';
}

export const LinearAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => {
  const {
    children,
    scale,
    orientation,
    height,
    width,
    tickSize,
    tickValues,
    interval,
    axis
  } = mergeDefaultProps(LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS, props);

  const label = getChildComponent(children, LinearAxisTickLabel.name);
  const line = getChildComponent(children, LinearAxisTickLine.name);
  const lineProps = useDefaultProps<LinearAxisTickLineProps>(
    line?.type?.name,
    line?.props
  );

  const labelProps = useMemo(
    () => ({
      ...LINEAR_AXIS_TICK_LABEL_DEFAULT_PROPS,
      ...(label?.props ?? {})
    }),
    [label?.props]
  );

  /**
   * Gets the adjusted scale given offsets.
   */
  const getAdjustedScale = useCallback(() => {
    if (scale.bandwidth) {
      let offset = scale.bandwidth() / 2;
      if (scale.round()) {
        offset = Math.round(offset);
      }

      return (d) => +scale(d) + offset;
    } else {
      return (d) => +scale(d);
    }
  }, [scale]);

  /**
   * Gets the x/y position for a given tick.
   */
  const getPosition = useCallback(
    (scaledTick: number) => {
      if (orientation === 'horizontal') {
        return { x: scaledTick, y: 0 };
      } else {
        return { x: 0, y: scaledTick };
      }
    },
    [orientation]
  );

  /**
   * Gets the dimension (height/width) this axis is calculating on.
   */
  const getDimension = useCallback(() => {
    return orientation === 'vertical' ? height : width;
  }, [height, orientation, width]);

  /**
   * Gets the formatted label of the tick.
   */
  const labelFormatFn = useMemo((): any => {
    if (labelProps.format) {
      return labelProps.format;
    } else if (scale.tickFormat) {
      return scale.tickFormat.apply(scale, [5]);
    } else {
      return (v) => formatValue(v);
    }
  }, [labelProps.format, scale]);

  /**
   * Gets the ticks given the dimensions and scales and returns
   * the text and position.
   */
  const ticks = useMemo((): ProcessedTick[] => {
    const dimension = getDimension();
    const maxTicks = getMaxTicks(tickSize, dimension);
    const ticks = getTicks(scale, tickValues, axis.type, maxTicks, interval);
    const adjustedScale = getAdjustedScale();
    const format = labelFormatFn;
    const midpoint = dimension / 2;

    return ticks.map((tick) => {
      const fullText = format(tick);
      const scaledTick = adjustedScale(tick);
      const position = getPosition(scaledTick);
      const text = ellipsize(fullText, 18);
      const size = label
        ? calculateDimensions(
          text,
          labelProps.fontFamily,
          labelProps.fontSize?.toString()
        )
        : {};

      return {
        ...position,
        ...size,
        text,
        fullText,
        half:
          scaledTick === midpoint
            ? 'center'
            : scaledTick < midpoint
              ? 'start'
              : 'end'
      };
    });
  }, [
    axis.type,
    getAdjustedScale,
    getDimension,
    getPosition,
    interval,
    label,
    labelProps,
    labelFormatFn,
    scale,
    tickSize,
    tickValues
  ]);

  /**
   * Calculates the rotation angle that the ticks need to be shifted to.
   * This equation will measure the length of the text in a external canvas
   * object and determine what the longest label is and rotate until they fit.
   */
  const angle = useMemo((): number => {
    if (!label) {
      return 0;
    }

    const dimension = getDimension();
    const maxTicksLength = max(ticks, (tick) => tick.width);
    let angle = 0;

    if (labelProps.rotation) {
      if (labelProps.rotation === true) {
        let baseWidth = maxTicksLength;
        const maxBaseWidth = Math.floor(dimension / ticks.length);

        while (baseWidth > maxBaseWidth && angle > -90) {
          angle -= 30;
          baseWidth = Math.cos(angle * (Math.PI / 180)) * maxTicksLength;
        }
      } else {
        angle = labelProps.rotation;
      }
    }

    return angle;
  }, [getDimension, label, labelProps, ticks]);

  return (
    <Fragment>
      {ticks.map((tick, i) => (
        <g key={i} transform={`translate(${tick.x}, ${tick.y})`}>
          {line && (
            <CloneElement<LinearAxisTickLineProps>
              element={line}
              {...lineProps}
              height={height}
              width={width}
              orientation={orientation}
            />
          )}
          {label && (
            <CloneElement<LinearAxisTickLabelProps>
              element={label}
              text={tick.text}
              fullText={tick.fullText}
              half={tick.half}
              angle={angle}
              orientation={orientation}
              lineSize={lineProps?.size}
              linePosition={lineProps?.position}
            >
              {label.props.children}
            </CloneElement>
          )}
        </g>
      ))}
    </Fragment>
  );
};

export const LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS = {
  // line: (
  //   <LinearAxisTickLine
  //     {...LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS}
  //     height={10}
  //     width={10}
  //     orientation="horizontal"
  //     position="center"
  //   />
  // ),
  // label: (
  //   <LinearAxisTickLabel
  //     line={
  //       <LinearAxisTickLine
  //         {...LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS}
  //         orientation="horizontal"
  //         position="center"
  //         height={5}
  //         width={5}
  //       />
  //     }
  //     lineSize={LINEAR_AXIS_TICK_LINE_DEFAULT_PROPS.size}
  //     linePosition='center'
  //     text=""
  //     fullText=""
  //     angle={0}
  //     orientation="horizontal"
  //     half="start"
  //     position="center"
  //   />
  // ),
  tickSize: 30
};
