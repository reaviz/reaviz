import React, {
  FC,
  Fragment,
  MouseEvent,
  ReactElement,
  useMemo,
  useState,
  useRef,
  ReactNode
} from 'react';
import { flip, offset } from '@floating-ui/dom';
import { ChartTooltip, ChartTooltipProps } from '@/common/Tooltip';
import { CloneElement } from 'reablocks';
import {
  constructFunctionProps,
  PropFunctionTypes
} from '@/common/utils/functions';
import chroma from 'chroma-js';
import classNames from 'classnames';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, MouseEvent, ReactElement, ReactNode } from 'react';
import React, { Fragment, useMemo, useRef, useState } from 'react';

import { getAriaLabel } from '@/common';
import type { ChartInternalShallowDataShape } from '@/common/data';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import type { ChartTooltipProps } from '@/common/Tooltip';
import { ChartTooltip } from '@/common/Tooltip';
import type { PropFunctionTypes } from '@/common/utils/functions';
import { constructFunctionProps } from '@/common/utils/functions';
import { useHoverIntent } from '@/common/utils/useHoverIntent';

import css from './HeatmapCell.module.css';

export type HeatmapCellProps = {
  /**
   * X Position set by `HeatmapSeries`.
   */
  x: number;

  /**
   * Y Position set by `HeatmapSeries`.
   */
  y: number;

  /**
   * rx SVG Attribute.
   */
  rx: number;

  /**
   * ry SVG Attribute.
   */
  ry: number;

  /**
   * Height of cell set by `HeatmapSeries`.
   */
  height: number;

  /**
   * Width of cell set by `HeatmapSeries`.
   */
  width: number;

  /**
   * Total count of cells set by `HeatmapSeries`.
   */
  cellCount: number;

  /**
   * Tooltip component.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Fill color set by `HeatmapSeries`.
   */
  fill: string;

  /**
   * Stroke color set by `HeatmapSeries`.
   */
  stroke: string;

  /**
   * Symbol element to render.
   */
  symbol?: (data: ChartInternalShallowDataShape) => ReactNode;

  /**
   * Data object set by `Heatmap`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Whether cell is animated or not set by `HeatmapSeries`.
   */
  animated: boolean;

  /**
   * Cell index set by `HeatmapSeries`.
   */
  cellIndex: number;

  /**
   * Cursor style attribute.
   */
  cursor: string;

  /**
   * Event for when the bar is clicked.
   */
  onClick: (event) => void;

  /**
   * Event for when the bar has mouse enter.
   */
  onMouseEnter: (event) => void;

  /**
   * Event for when the bar has mouse leave.
   */
  onMouseLeave: (event) => void;
} & PropFunctionTypes;

// Set padding modifier for the tooltips
const modifiers = [offset({ mainAxis: 0, crossAxis: 3 })];

export const HeatmapCell: FC<Partial<HeatmapCellProps>> = ({
  rx = 2,
  ry = 2,
  cursor = 'auto',
  tooltip = <ChartTooltip modifiers={[flip()]} />,
  onClick,
  onMouseEnter,
  onMouseLeave,
  data,
  animated,
  cellIndex,
  cellCount,
  fill,
  stroke,
  symbol,
  x,
  y,
  style,
  className,
  ...rest
}) => {
  const [active, setActive] = useState(false);
  const rect = useRef<SVGRectElement | null>(null);

  const { pointerOut, pointerOver } = useHoverIntent({
    onPointerOver: (event) => {
      setActive(true);
      onMouseEnter({
        value: data,
        nativeEvent: event
      });
    },
    onPointerOut: (event) => {
      setActive(false);
      onMouseLeave({
        value: data,
        nativeEvent: event
      });
    }
  });

  const onMouseClick = (event: MouseEvent) => {
    onClick({
      value: data,
      nativeEvent: event
    });
  };

  const tooltipData = useMemo(
    () => ({
      y: data.value,
      x: `${data.key} ∙ ${data.x}`,
      data
    }),
    [data]
  );

  const transition = useMemo(() => {
    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: (cellIndex / cellCount) * 0.005
      };
    } else {
      return {
        type: false as const,
        delay: 0
      };
    }
  }, [animated, cellIndex, cellCount]);

  const extras = constructFunctionProps({ style, className }, data);
  const isTransparent = fill === 'transparent';
  const appliedStroke =
    active && !isTransparent
      ? chroma(stroke || fill).brighten(1)
      : stroke || fill;

  const ariaLabelData = useMemo(
    () => getAriaLabel({ ...tooltipData, data: null }),
    [tooltipData]
  );

  const renderedSymbol = useMemo(
    () => (symbol ? symbol(data!) : null),
    [data, symbol]
  );

  return (
    <Fragment>
      <g ref={rect}>
        {renderedSymbol ? (
          <motion.g
            {...rest}
            fill={fill}
            stroke={appliedStroke}
            style={{ ...extras.style, cursor }}
            className={extras?.className}
            transform={`translate(${x}, ${y})`}
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={transition}
            onPointerOver={pointerOver}
            onPointerOut={pointerOut}
            onClick={onMouseClick}
            tabIndex={0}
            aria-label={ariaLabelData}
            role="graphics-document"
          >
            {renderedSymbol}
          </motion.g>
        ) : (
          <motion.rect
            {...rest}
            fill={fill}
            stroke={appliedStroke}
            x={x}
            y={y}
            rx={rx}
            ry={ry}
            style={{ ...extras.style, cursor }}
            className={classNames(css.cell, extras.className)}
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={transition}
            onPointerOver={pointerOver}
            onPointerOut={pointerOut}
            onClick={onMouseClick}
            tabIndex={0}
            aria-label={ariaLabelData}
            role="graphics-document"
          />
        )}
      </g>
      {tooltip && !(tooltip.props as any).disabled && !isTransparent && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={active}
          modifiers={(tooltip.props as any).modifiers || modifiers}
          reference={rect}
          value={tooltipData}
        />
      )}
    </Fragment>
  );
};
