import React, { FC } from 'react';

type AlignmentBaseline =
  | 'auto'
  | 'baseline'
  | 'before-edge'
  | 'text-before-edge'
  | 'middle'
  | 'central'
  | 'after-edge'
  | 'text-after-edge'
  | 'ideographic'
  | 'alphabetic'
  | 'hanging'
  | 'mathematical'
  | 'inherit';

export interface MarkLineYProps {
  width: number;
  height: number;
  pointY?: number;
  strokeColor: string;
  strokeWidth: number;
  color: string;
  position: AlignmentBaseline;
  text: string;
}

export const MarkLineY: FC<Partial<MarkLineYProps>> = ({
  pointY,
  width,
  strokeWidth = 1,
  strokeColor = '#eee',
  position = 'middle',
  text
}) => (
  <>
    <line
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      y1={pointY}
      vectorEffect="non-scaling-stroke"
      y2={pointY}
      x1="0"
      x2={width}
    />
    <g>
      <text
        x={width - 70}
        y={pointY}
        fill={strokeColor}
        alignmentBaseline={position}
      >
        {text}
      </text>
    </g>
  </>
);
