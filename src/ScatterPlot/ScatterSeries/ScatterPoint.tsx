import React, {
  Fragment,
  ReactNode,
  ReactElement,
  useState,
  FC,
  useRef,
  useMemo
} from 'react';
import { ChartInternalShallowDataShape } from '../../common/data';
import { ChartTooltip, ChartTooltipProps } from '../../common/Tooltip';
import classNames from 'classnames';
import { CloneElement } from 'rdk';
import {
  constructFunctionProps,
  PropFunctionTypes
} from '../../common/utils/functions';
import { motion } from 'framer-motion';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { schemes, getColor, ColorSchemeType } from '../../common/color';
import { identifier } from 'safe-identifier';
import css from './ScatterPoint.module.css';
import { Glow } from '../../common/Glow';
import { generateGlowStyles } from '../../common/Glow/utils';

export type ScatterPointProps = {
  /**
   * Whether the element is active or not. Set internally by `ScatterSeries`.
   */
  active?: boolean;

  /**
   * Size of the circle element.
   */
  size?: ((data: ChartInternalShallowDataShape) => number) | number;

  /**
   * Color of the circle.
   */
  color?: ColorSchemeType;

  /**
   * Cursor for the element.
   */
  cursor?: string;

  /**
   * D3 scale for X Axis. Set internally by `ScatterPlot`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `ScatterPlot`.
   */
  yScale: any;

  /**
   * Height of the chart. Set internally by `ScatterPlot`.
   */
  height: number;

  /**
   * Whether to animate the enter/update/exit. Set internally by `ScatterSeries`.
   */
  animated?: boolean;

  /**
   * Index of the element in the series. Set internally by `ScatterSeries`.
   */
  index: number;

  /**
   * Tooltip element.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Parsed data shape. Set internally by `ScatterPlot`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Id set internally by `ScatterPlot`.
   */
  id: string;

  /**
   * Glow styling for the point.
   */
  glow?: Glow;

  /**
   * Symbol element to render.
   */
  symbol?: (data: ChartInternalShallowDataShape) => ReactNode;

  /**
   * Whether the elment is visiblbe or not.
   */
  visible?: (data: ChartInternalShallowDataShape, index: number) => boolean;

  /**
   * Event for when a symbol is clicked.
   */
  onClick?: (data: ChartInternalShallowDataShape) => void;

  /**
   * Event for when the symbol has mouse enter.
   */
  onMouseEnter?: (data: ChartInternalShallowDataShape) => void;

  /**
   * Event for when the symbol has mouse leave.
   */
  onMouseLeave?: (data: ChartInternalShallowDataShape) => void;
} & PropFunctionTypes;

export const ScatterPoint: FC<Partial<ScatterPointProps>> = ({
  symbol,
  index,
  id,
  data,
  xScale,
  yScale,
  active,
  tooltip,
  cursor,
  size,
  glow,
  color,
  animated,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const rectRef = useRef<any | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const extras = useMemo(
    () => constructFunctionProps(rest, data),
    [rest, data]
  );
  const r = useMemo(
    () => (typeof size === 'function' ? size(data!) : size),
    [size, data]
  );
  const renderedSymbol = useMemo(
    () => (symbol ? symbol(data!) : null),
    [data, symbol]
  );

  const transitionProps = useMemo(
    () =>
      animated
        ? {
            ...DEFAULT_TRANSITION,
            delay: index! * 0.005
          }
        : {
            type: false,
            delay: 0
          },
    [index, animated]
  );

  const enterProps = useMemo(() => {
    let cy = yScale(data!.y1);
    if (yScale.bandwidth) {
      const width = yScale.bandwidth();
      cy = cy + width / 2;
    }

    return {
      x: xScale(data!.x),
      y: cy
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, yScale]);

  const exitProps = useMemo(() => {
    const [yStartDomain] = yScale.domain();
    return {
      y: yScale(yStartDomain),
      x: xScale(data!.x)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, yScale]);

  const fill = useMemo(
    () =>
      getColor({
        colorScheme: color,
        index,
        point: data
      }),
    [data, color, index]
  );

  const key = `symbol-${id}-${identifier(`${data!.id}`)}`;

  return (
    <Fragment>
      <g
        ref={rectRef}
        className={classNames({
          [css.inactive]: !active
        })}
        onMouseEnter={() => {
          setTooltipVisible(true);
          onMouseEnter(data!);
        }}
        onMouseLeave={() => {
          setTooltipVisible(false);
          onMouseLeave(data!);
        }}
        onClick={() => onClick(data!)}
      >
        {symbol ? (
          <motion.g
            key={key}
            {...extras}
            initial={{
              translateX: exitProps.x,
              translateY: exitProps.y,
              opacity: 0
            }}
            animate={{
              translateX: enterProps.x,
              translateY: enterProps.y,
              opacity: 1
            }}
            exit={{
              translateX: exitProps.x,
              translateY: exitProps.y,
              opacity: 0
            }}
            transition={transitionProps}
          >
            {renderedSymbol}
          </motion.g>
        ) : (
          <motion.circle
            key={key}
            className={extras.className}
            style={{
              ...extras.style,
              ...generateGlowStyles({ glow }),
              cursor
            }}
            fill={fill}
            initial={{
              cx: exitProps.x,
              cy: exitProps.y,
              r,
              opacity: 0
            }}
            animate={{
              cx: enterProps.x,
              cy: enterProps.y,
              opacity: 1,
              r
            }}
            exit={{
              cx: exitProps.x,
              cy: exitProps.y,
              r,
              opacity: 0
            }}
            transition={transitionProps}
          />
        )}
      </g>
      {tooltip && !tooltip.props.disabled && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={tooltipVisible}
          reference={rectRef}
          value={data}
        />
      )}
    </Fragment>
  );
};

ScatterPoint.defaultProps = {
  active: true,
  tooltip: <ChartTooltip />,
  cursor: 'pointer',
  size: 4,
  color: schemes.cybertron[0],
  animated: true,
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined
};
