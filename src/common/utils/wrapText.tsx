import React from 'react';
import { calculateDimensions } from './size';

export interface WrapTextInputs {
  key: string;
  x?: any;
  y?: number;
  paddingY?: number;
  paddingX?: number;
  width: number;
  height?: number;
  fontFamily: string;
  fontSize: number;
}

export function wrapText({ key, x = 0, y = 0, paddingY, paddingX, width, height, fontFamily, fontSize }: WrapTextInputs) {
  const size = calculateDimensions(key, fontFamily, fontSize);
  const words = key.toString().split(/\s+/);

  if (words.length > 1 && size.width > width) {
    let rows = [];
    let sumWidth = 0;
    let sumHeight = 0;
    let curText = '';
    let lineNum = 0;

    for (const word of words) {
      const wordSize = calculateDimensions(word, fontFamily, fontSize);
      const wordWidth = wordSize.width;

      lineNum++;
      if (sumWidth + wordWidth < width) {
        sumWidth += wordWidth;
        sumHeight += wordSize.height;
        curText = `${curText} ${word}`;
      } else {
        rows.push(curText);
        sumWidth += wordSize.width;
        sumHeight += wordSize.height;
        curText = word;
      }

      if (words.length === lineNum) {
        rows.push(curText);
      }
    }

    if (height && (sumHeight + paddingY) >= height) {
      return null;
    }

    if (width && (sumWidth + paddingX) >= width) {
      return null;
    }

    return rows.map((r, i) => (
      <tspan
        key={i}
        dominantBaseline="alphabetic"
        style={{ baselineShift: '0%' }}
        dy={i > 0 ? size.height : -size.height / 2}
        x={x}
      >
        {r}
      </tspan>
    ));
  }

  if (height && (size.height + paddingY) >= height) {
    return null;
  }

  if (width && (size.width + paddingX) >= width) {
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
