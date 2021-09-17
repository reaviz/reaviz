import React from 'react';
import { calculateDimensions } from './size';

export function wrapText({ key, x = 0, width, fontFamily, fontSize }) {
  const size = calculateDimensions(key, fontFamily, fontSize);
  const words = key.toString().split(/\s+/);

  if (words.length > 1 && size.width > width) {
    let rows = [];
    let sum = 0;
    let curText = '';
    let lineNum = 0;

    for (const word of words) {
      const wordSize = calculateDimensions(word, fontFamily, fontSize);
      const wordWidth = wordSize.width;

      lineNum++;
      if (sum + wordWidth < width) {
        sum += wordWidth;
        curText = `${curText} ${word}`;
      } else {
        rows.push(curText);
        sum = 0;
        curText = word;
      }

      if (words.length === lineNum) {
        rows.push(curText);
      }
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
