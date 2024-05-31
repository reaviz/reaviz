import React, { FC } from 'react';
import invert from 'invert-color';
import ellipsize from 'ellipsize';

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
}

export const SunburstArcLabel: FC<SunburstArcLabelProps> = ({
  data,
  fill = 'black',
  fontSize = 14,
  fontFamily = 'sans-serif',
  radius
}) => {
  // Get the full text and the truncated text
  // NOTE: This could use some improvement around measuring
  const fullText = data.data.key;
  const text = ellipsize(fullText, 18);

  // Make the fill inverted for better contrast
  fill = invert(fill, true);

  function labelTransform(d) {
    const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
    const y = ((d.y0 + d.y1) / 2) * radius;
    return `rotate(${x - 90}deg) translate(${y}px,0) rotate(${x < 180 ? 0 : 180}deg)`;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  if (!labelVisible(data)) {
    return null;
  }

  return (
    <g
      style={{ transform: labelTransform(data) }}
      fontFamily={fontFamily}
      fontSize={fontSize}
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
    </g>
  );
};