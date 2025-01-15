import React, { FC, useMemo } from 'react';
import invert from 'invert-color';
import ellipsize from 'ellipsize';
import { motion } from 'motion/react';
import { DEFAULT_TRANSITION } from '@/common/Motion';

export interface SunburstArcLabelProps {
  /**
   * Id set by the parent.
   */
  id: string;

  /**
   * The internal data object built by d3
   */
  data: any;

  /**
   * Fill color for the arc.
   */
  fill: string;

  /**
   * Radius of the chart. Set internally by `SunburstChart`.
   */
  radius: number;

  /**
   * Font size of the text.
   */
  fontSize?: number;

  /**
   * Font family of the text.
   */
  fontFamily?: string;

  /**
   * Whether the chart is animated or not.
   */
  animated?: boolean;
}

export const SunburstArcLabel: FC<Partial<SunburstArcLabelProps>> = ({
  data,
  animated,
  fill = 'black',
  fontSize = 14,
  fontFamily = 'sans-serif',
  radius
}) => {
  // Get the full text and the truncated text
  // NOTE: This could use some improvement around measuring
  const fullText = data.data.key;
  const text = ellipsize(fullText, 10);

  // Make the fill inverted for better contrast
  fill = invert(fill, true);

  function labelTransform(d) {
    const x = (((data.x0 + data.x1) / 2) * 180) / Math.PI;
    const y = (data.y0 + data.y1) / 2;
    return `rotate(${x - 90}deg) translate(${y}px,0) rotate(${x < 180 ? 0 : 180}deg)`;
  }

  function labelVisible(d) {
    return (d.y1 - d.y0) * (d.x1 - d.x0) > 0.05;
  }

  const transition = useMemo(() => {
    if (animated) {
      return {
        ...DEFAULT_TRANSITION
      };
    } else {
      return {
        type: false,
        delay: 0
      };
    }
  }, [animated]);

  if (!labelVisible(data)) {
    return null;
  }

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ transform: labelTransform(data) }}
      fontFamily={fontFamily}
      fontSize={fontSize}
      transition={transition}
    >
      <title>{fullText}</title>
      <text
        style={{
          pointerEvents: 'none',
          userSelect: 'none'
        }}
        fill={fill}
        dy="0.35em"
        textAnchor="middle"
      >
        {text}
      </text>
    </motion.g>
  );
};
