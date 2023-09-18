import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { range } from 'd3-array';
import { Move } from '../Gestures/Move';
import css from './BrushHandle.module.css';

export interface BrushHandleProps {
  height: number;
  onHandleDrag: (deltaX: number) => void;
}

export const BrushHandle: FC<BrushHandleProps> = (props) => {
  const { height, onHandleDrag } = props;
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Move
      cursor="ew-resize"
      onMoveStart={() => setIsDragging(true)}
      onMove={({x}) =>  onHandleDrag(x)}
      onMoveEnd={() =>  setIsDragging(false)}
    >
      <g>
        <line className={css.line} y1="0" y2={height} x1="5" x2="5" />
        <rect
          className={classNames(css.handle, { [css.dragging]: isDragging })}
          height={height - 10}
          style={{ cursor: 'ew-resize' }}
          width={8}
          y="5"
          y1={height - 5}
        />
        <g
          transform={`translate(-1, ${height / 2 - 10})`}
          style={{ pointerEvents: 'none' }}
        >
          {range(5).map((i) => (
            <circle cy={i * 5} cx="5" r=".5" key={i} className={css.dot} />
          ))}
        </g>
      </g>
    </Move>
  );
};

BrushHandle.defaultProps = {};

