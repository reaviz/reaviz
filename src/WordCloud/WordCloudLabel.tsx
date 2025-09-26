import classNames from 'classnames';
import { motion } from 'motion/react';
import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React, { useRef, useState } from 'react';

import { useHoverIntent } from '@/common/utils/useHoverIntent';

import type { ChartShallowDataShape } from '../common/data';
import type { ChartTooltipProps } from '../common/Tooltip';
import { ChartTooltip } from '../common/Tooltip';
import css from './WordCloudLabel.module.css';

export interface WordCloudLabelProps {
  /**
   * Text to display.
   */
  text: string;

  /**
   * Font size in pixels.
   */
  fontSize: number;

  /**
   * Font family to use.
   */
  fontFamily: string;

  /**
   * Fill color for the text.
   */
  fill: string;

  /**
   * X position of the text.
   */
  x: number;

  /**
   * Y position of the text.
   */
  y: number;

  /**
   * Rotation angle in degrees.
   */
  rotate: number;

  /**
   * Original data point.
   */
  data: ChartShallowDataShape;

  /**
   * Additional className to apply.
   */
  className?: string;

  /**
   * Tooltip element.
   */
  tooltip?: ReactElement<ChartTooltipProps, typeof ChartTooltip> | null;

  /**
   * Click handler.
   */
  onClick?: (event: React.MouseEvent, data: ChartShallowDataShape) => void;

  /**
   * Mouse enter handler.
   */
  onMouseEnter?: (
    event: React.PointerEvent,
    data: ChartShallowDataShape,
  ) => void;

  /**
   * Mouse leave handler.
   */
  onMouseLeave?: (
    event: React.PointerEvent,
    data: ChartShallowDataShape,
  ) => void;
}

export const WordCloudLabel: FC<Partial<WordCloudLabelProps>> = ({
  text,
  fontSize,
  fontFamily,
  fill,
  x,
  y,
  rotate,
  data,
  onClick,
  className,
  onMouseEnter,
  onMouseLeave,
  tooltip = <ChartTooltip />,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const labelRef = useRef<SVGTextElement>(null);

  const { pointerOut, pointerOver } = useHoverIntent({
    onPointerOver: (event) => {
      setTooltipVisible(true);
      onMouseEnter?.(event, data);
    },
    onPointerOut: (event) => {
      setTooltipVisible(false);
      onMouseLeave?.(event, data);
    },
  });

  return (
    <>
      <g
        ref={labelRef}
        className={classNames(css.wordLabel, className, {
          [css.clickable]: !!onClick,
        })}
        onPointerOut={pointerOut}
        onPointerOver={pointerOver}
        onClick={(event) => onClick?.(event, data)}
      >
        <motion.text
          style={{
            fontSize: `${fontSize}px`,
            fontFamily,
            fill,
            cursor: onClick ? 'pointer' : 'default',
          }}
          textAnchor="middle"
          initial={{
            opacity: 0,
            x,
            y,
            rotate,
          }}
          animate={{
            opacity: 1,
            x,
            y,
            rotate,
          }}
          exit={{
            opacity: 0,
            x,
            y,
            rotate,
          }}
          whileHover={{
            opacity: 0.7,
            transition: { duration: 0.2 },
          }}
        >
          {text}
        </motion.text>
      </g>
      <CloneElement<ChartTooltipProps>
        element={tooltip}
        visible={tooltipVisible}
        reference={labelRef}
        value={{
          x: text,
          value: data.data,
        }}
      />
    </>
  );
};
