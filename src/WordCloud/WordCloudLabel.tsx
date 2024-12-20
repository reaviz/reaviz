import React, { FC, useRef, useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { ChartShallowDataShape } from '../common/data';
import { ChartTooltip, ChartTooltipProps } from '../common/Tooltip';
import { CloneElement } from 'reablocks';
import { offset } from '@floating-ui/dom';
import classNames from 'classnames';
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
   * Click handler.
   */
  onClick?: (data: ChartShallowDataShape) => void;

  /**
   * Additional className to apply.
   */
  className?: string;
}

export const WordCloudLabel: FC<WordCloudLabelProps> = ({
  text,
  fontSize,
  fontFamily,
  fill,
  x,
  y,
  rotate,
  data,
  onClick,
  className
}) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const labelRef = useRef<SVGTextElement>(null);

  return (
    <Fragment>
      <g
        ref={labelRef}
        className={classNames(css.wordLabel, className, {
          [css.clickable]: !!onClick
        })}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        onClick={() => onClick?.(data)}
      >
        <motion.text
          style={{
            fontSize: `${fontSize}px`,
            fontFamily,
            fill,
            cursor: onClick ? 'pointer' : 'default'
          }}
          textAnchor="middle"
          transform={`translate(${x},${y}) rotate(${rotate})`}
          whileHover={{
            opacity: 0.7,
            transition: { duration: 0.2 }
          }}
        >
          {text}
        </motion.text>
      </g>
      <CloneElement<ChartTooltipProps>
        element={
          <ChartTooltip
            followCursor={true}
            modifiers={[offset(5)]}
            content={(d) => (
              <>
                <div>{d.key}</div>
                <div>Count: {d.data}</div>
              </>
            )}
          />
        }
        visible={tooltipVisible}
        reference={labelRef}
        value={data}
      />
    </Fragment>
  );
};
