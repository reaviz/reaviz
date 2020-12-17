import React, { PureComponent, Fragment } from 'react';
import bind from 'memoize-bind';
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

interface BrushSliceState {
  isDragging: boolean;
}

export class BrushSlice extends PureComponent<
  BrushSliceProps,
  BrushSliceState
> {
  state: BrushSliceState = {
    isDragging: false
  };

  onMoveStart() {
    const { start, end, width } = this.props;
    const hasNoSlice = start === 0 && end === width;

    if (!hasNoSlice) {
      this.setState({
        isDragging: true
      });
    }
  }

  onMove({ x }) {
    const { onBrushChange, width } = this.props;
    let { start, end } = this.props;
    start = start + x;
    end = end + x;

    if (start >= 0 && end <= width) {
      onBrushChange({
        start,
        end
      });
    }
  }

  onMoveEnd() {
    this.setState({
      isDragging: false
    });
  }

  onHandleDrag(direction: 'start' | 'end', deltaX: number) {
    const { onBrushChange } = this.props;
    let { start, end } = this.props;

    start = direction === 'start' ? start + deltaX : start;
    end = direction !== 'start' ? end + deltaX : end;

    onBrushChange({
      start,
      end
    });
  }

  render() {
    const { height, start, end, width } = this.props;
    const { isDragging } = this.state;
    const sliceWidth = Math.max(end - start, 0);
    const endSliceWidth = Math.max(width - end, 0);
    const hasNoSlice = start === 0 && end === width;

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
            onMoveStart={bind(this.onMoveStart, this)}
            onMove={bind(this.onMove, this)}
            onMoveEnd={bind(this.onMoveEnd, this)}
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
              onHandleDrag={bind(this.onHandleDrag, this, 'start')}
            />
          </g>
          <g transform={`translate(${sliceWidth - 5}, 0)`}>
            <BrushHandle
              height={height}
              onHandleDrag={bind(this.onHandleDrag, this, 'end')}
            />
          </g>
        </g>
      </Fragment>
    );
  }
}
