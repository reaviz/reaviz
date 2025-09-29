import classNames from 'classnames';
import type { Transition } from 'motion/react';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement, ReactNode } from 'react';
import React, { Fragment, useMemo, useRef, useState } from 'react';
import { identifier } from 'safe-identifier';

import { getAriaLabel, mergeDefaultProps } from '@/common';
import type { ColorSchemeType } from '@/common/color';
import { getColor, schemes } from '@/common/color';
import type { ChartInternalShallowDataShape } from '@/common/data';
import type { Glow } from '@/common/Glow';
import { generateGlowStyles } from '@/common/Glow/utils';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import type { ChartTooltipProps } from '@/common/Tooltip';
import { ChartTooltip } from '@/common/Tooltip';
import type { PropFunctionTypes } from '@/common/utils/functions';
import { constructFunctionProps } from '@/common/utils/functions';

import css from './ScatterPoint.module.css';

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

export const ScatterPoint: FC<Partial<ScatterPointProps>> = (props) => {
  const {
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
    visible,
    ...rest
  } = mergeDefaultProps(SCATTER_POINT_DEFAULT_PROPS, props);

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
            type: false as const,
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
  const ariaLabelData = useMemo(() => getAriaLabel(data), [data]);

  const isVisible = visible ? visible?.(data, index) : active;

  return (
    <Fragment>
      <g
        ref={rectRef}
        className={classNames({
          [css.inactive]: !active,
          [css.hidden]: !isVisible
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
        tabIndex={0}
        aria-label={ariaLabelData}
        role="graphics-document"
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
            transition={transitionProps as Transition}
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
            transition={transitionProps as Transition}
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

export const SCATTER_POINT_DEFAULT_PROPS = {
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
