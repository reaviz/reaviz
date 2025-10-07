import classNames from 'classnames';
import { radialLine } from 'd3-shape';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement, ReactNode } from 'react';
import React, { Fragment, useMemo, useRef, useState } from 'react';

import { getAriaLabel, mergeDefaultProps } from '@/common';
import { schemes } from '@/common/color';
import type { ChartInternalShallowDataShape } from '@/common/data';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import type { ChartTooltipProps } from '@/common/Tooltip';
import { ChartTooltip } from '@/common/Tooltip';

import css from './RadialScatterPoint.module.css';

export interface RadialScatterPointProps {
  /**
   * Parsed data shape. Set internally by `RadialScatterPlot`.
   */
  data: ChartInternalShallowDataShape;

  /**
   * Index of the element in the series. Set internally by `RadialScatterSeries`.
   */
  index: number;

  /**
   * Whether the element is active or not. Set internally by `RadialScatterSeries`.
   */
  animated: boolean;

  /**
   * D3 scale for X Axis. Set internally by `RadialScatterPlot`.
   */
  xScale: any;

  /**
   * D3 scale for Y Axis. Set internally by `RadialScatterPlot`.
   */
  yScale: any;

  /**
   * Fill for the element.
   */
  fill: string;

  /**
   * Id set internally by `RadialScatterPlot`.
   */
  id: string;

  /**
   * Color of the circle.
   */
  color: any;

  /**
   * CSS classes to apply.
   */
  className?: any;

  /**
   * Whether the element is active or not. Set internally by `RadialScatterSeries`.
   */
  active?: boolean;

  /**
   * Whether the elment is visiblbe or not.
   */
  visible?: (value, index) => boolean;

  /**
   * Symbol element to render.
   */
  symbol: (value) => ReactNode;

  /**
   * Size of the circle element.
   */
  size?: ((d) => number) | number;

  /**
   * Tooltip element.
   */
  tooltip: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Event for when a symbol is clicked.
   */
  onClick: (event) => void;

  /**
   * Event for when the symbol has mouse enter.
   */
  onMouseEnter: (event) => void;

  /**
   * Event for when the symbol has mouse leave.
   */
  onMouseLeave: (event) => void;
}

export const RadialScatterPoint: FC<Partial<RadialScatterPointProps>> = (
  props
) => {
  const {
    size,
    data,
    color,
    index,
    symbol,
    active,
    tooltip,
    yScale,
    xScale,
    animated,
    className,
    visible,
    ...rest
  } = mergeDefaultProps(RADIAL_SCATTER_POINT_DEFAULT_PROPS, props);

  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  function onMouseEnter(event: React.MouseEvent) {
    setHovered(true);
    rest.onMouseEnter({
      value: data,
      nativeEvent: event
    });
  }

  function onMouseLeave(event: React.MouseEvent) {
    setHovered(false);
    rest.onMouseLeave({
      value: data,
      nativeEvent: event
    });
  }

  function onClick(event: React.MouseEvent) {
    rest.onClick({
      value: data,
      nativeEvent: event
    });
  }

  function getTranslate(data: ChartInternalShallowDataShape) {
    const fn = radialLine()
      .radius((d: any) => yScale(d.y))
      .angle((d: any) => xScale(d.x));

    // Parse the generated path to get point coordinates
    // Ref: https://bit.ly/2CnZcPl
    const path = fn([data] as any);

    if (path) {
      const [translateX, translateY] = path.slice(1).slice(0, -1).split(',');

      return {
        translateX: parseFloat(translateX),
        translateY: parseFloat(translateY)
      };
    }
  }

  function getTransition() {
    if (animated) {
      return {
        ...DEFAULT_TRANSITION,
        delay: index * 0.005
      };
    } else {
      return {
        type: false as const,
        delay: 0
      };
    }
  }

  const fill = typeof color === 'function' ? color(data, index) : color;
  const transform = getTranslate(data);
  const sizeVal = typeof size === 'function' ? size(data) : size;
  const transition = getTransition();

  const [yStart] = yScale.domain();
  const exitTransform = getTranslate({ ...data, y: yStart });

  const ariaLabelData = useMemo(() => getAriaLabel(data), [data]);

  const isVisible = visible ? visible?.(data, index) : active;

  return (
    <Fragment>
      <motion.g
        initial={{ ...exitTransform, opacity: 0 }}
        animate={{ ...transform, opacity: 1 }}
        exit={{ ...exitTransform, opacity: 0 }}
        transition={transition}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={classNames(className, {
          [css.inactive]: !active,
          [css.hidden]: !isVisible
        })}
        tabIndex={0}
        aria-label={ariaLabelData}
        role="graphics-document"
      >
        {symbol && symbol(data)}
        {!symbol && <circle r={sizeVal} fill={fill} />}
      </motion.g>
      {tooltip && (
        <CloneElement<ChartTooltipProps>
          element={tooltip}
          visible={hovered}
          reference={ref}
          value={data}
        />
      )}
    </Fragment>
  );
};

export const RADIAL_SCATTER_POINT_DEFAULT_PROPS = {
  size: 3,
  color: schemes.cybertron[0],
  tooltip: <ChartTooltip />,
  active: true,
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  onMouseLeave: () => undefined
};
