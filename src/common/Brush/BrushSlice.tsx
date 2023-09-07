import React, { Fragment, useState, FC, useCallback } from 'react';
import { BrushHandle } from './BrushHandle';
import { Move } from '../Gestures/Move';
import css from './BrushSlice.module.css';

export interface BrushChangeEvent {
  start?: number;
  end?: number;
}

interface BrushSliceProps {
  height: number;
  width: number;
  start: number;
  end: number;
  onBrushChange: (event: BrushChangeEvent) => void;
}

export const BrushSlice: FC<BrushSliceProps> = (props) => {
  const { height, start, end, width, onBrushChange, } = props;
  const [isDragging, setIsDragging] = useState(false);
  const sliceWidth = Math.max(end - start, 0);
  const endSliceWidth = Math.max(width - end, 0);
  const hasNoSlice = start === 0 && end === width;

  const onMoveStart = useCallback(() =>  {
    const hasNoSlice = start === 0 && end === width;

    if (!hasNoSlice) {
      setIsDragging(true);
    }
  }, [end, start, width]);

  const onMove = useCallback(({ x }) => {
    const startUpdated = start + x;
    const endUpdated = end + x;

    if (start >= 0 && end <= width) {
      onBrushChange({
        start: startUpdated,
        end: endUpdated
      });
    }
  }, [start, end, width, onBrushChange]);

  const onHandleDrag = useCallback((direction: 'start' | 'end', deltaX: number) => {
    const startUpdated = direction === 'start' ? start + deltaX : start;
    const endUpdated = direction !== 'start' ? end + deltaX : end;

    onBrushChange({
      start: startUpdated,
      end: endUpdated
    });
  }, [end, onBrushChange, start]);

  return (
    <Fragment>
      <rect className={css.unsliced} height={height} width={start} />
      <rect
        transform={`translate(${end}, 0)`}
        className={css.unsliced}
        height={height}
        width={endSliceWidth}
      />
      <g transform={`translate(${start}, 0)`}>
        <Move
          cursor="grabbing"
          onMoveStart={onMoveStart}
          onMove={onMove}
          onMoveEnd={() => setIsDragging(false)}
        >
          <rect
            className={css.slice}
            height={height}
            width={sliceWidth}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              opacity: hasNoSlice ? 0 : 0.1,
              pointerEvents: !hasNoSlice ? 'initial' : 'none'
            }}
          />
        </Move>
        <g transform={'translate(-4, 0)'}>
          <BrushHandle
            height={height}
            onHandleDrag={(deltaX) => onHandleDrag('start', deltaX)}
          />
        </g>
        <g transform={`translate(${sliceWidth - 5}, 0)`}>
          <BrushHandle
            height={height}
            onHandleDrag={(deltaX) => onHandleDrag('end', deltaX)}
          />
        </g>
      </g>
    </Fragment>
  );
};

BrushSlice.defaultProps = {};
