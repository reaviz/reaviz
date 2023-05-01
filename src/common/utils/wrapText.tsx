import React from 'react';
import { calculateDimensions } from './size';

export interface WrapTextInputs {
  key: string;
  x?: any;
  paddingY?: number;
  paddingX?: number;
  width: number;
  height?: number;
  fontFamily: string;
  fontSize: number;
  size?: {
    width: number;
    height: number;
  };
}

export function wrapText({
  key,
  x = 0,
  size,
  paddingY,
  paddingX,
  width,
  height,
  fontFamily,
  fontSize
}: WrapTextInputs) {
  size = size || calculateDimensions(key, fontFamily, fontSize);
  const words = key.toString().split(/\s+/);

  if (words.length > 1 && size.width > width) {
    let rows = [];
    let maxWidth = 0;
    let maxHeight = 0;
    let curText = '';
    let currWidth = 0;
    let nextText = '';
    let nextWidth = 0;

    for (const word of words) {
      nextText = curText === '' ? word : `${curText} ${word}`;
      nextWidth = calculateDimensions(nextText, fontFamily, fontSize).width;

      if (nextWidth <= width - (paddingX ? 2 * paddingX : 0)) {
        curText = nextText;
        currWidth = nextWidth;
      } else {
        rows.push(curText);
        maxWidth = Math.max(maxWidth, currWidth);
        curText = word;
        currWidth = calculateDimensions(curText, fontFamily, fontSize).width;
      }
    }
    rows.push(curText);
    maxHeight = rows.length * size.height;

    if (height && maxHeight >= height - (paddingY ? 2 * paddingY : 0)) {
      return null;
    }

    if (width && maxWidth >= width - (paddingX ? 2 * paddingX : 0)) {
      return null;
    }

    return rows.map((r, i) => (
      <tspan
        key={i}
        dominantBaseline="alphabetic"
        style={{ baselineShift: '0%' }}
        dy={
          i > 0
            ? size.height
            : height
              ? size.height / 2 - 5
              : -maxHeight / 2 + size.height
        }
        x={x}
      >
        {r}
      </tspan>
    ));
  }

  if (height && size.height + paddingY >= height) {
    return null;
  }

  if (width && size.width + paddingX >= width) {
    return null;
  }

  // NOTE: 5px seems to magic number for making it center
  return (
    <tspan
      dominantBaseline="alphabetic"
      style={{ baselineShift: '0%' }}
      dy={size.height / 2 - 5}
      x={x}
    >
      {key}
    </tspan>
  );
}
