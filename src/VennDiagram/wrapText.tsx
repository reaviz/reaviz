import React from 'react';
import { calculateDimensions } from '../common/utils';

export function wrapText({ key, data, fontFamily, fontSize }) {
  const size = calculateDimensions(key, fontFamily, fontSize);

  const width = data?.circles?.[0]?.radius;

  if (size.width > width) {
    const words = key.split(/\s+/);
    const rows = [];
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
        rows.push(curText)
      }
    }

    return rows.map((r, i) => (
      <tspan
        key={i}
        dominantBaseline="alphabetic"
        style={{ baselineShift: '0%' }}
        dy={i * size.height}
        x={data.text.x}
      >
        {r}
      </tspan>
    ));
  }

  return key;
}
