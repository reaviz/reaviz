import React, { PureComponent } from 'react';
import bind from 'memoize-bind';
import classNames from 'classnames';
import { range } from 'd3-array';
import { Move } from '../Gestures/Move';
import css from './BrushHandle.module.css';

export interface BrushHandleProps {
  height: number;
  onHandleDrag: (deltaX: number) => void;
}

interface BrushHandleState {
  isDragging: boolean;
}

export class BrushHandle extends PureComponent<
  BrushHandleProps,
  BrushHandleState
> {
  state: BrushHandleState = {
    isDragging: false
  };

  onMoveStart() {
    this.setState({
      isDragging: true
    });
  }

  onMove(event) {
    this.props.onHandleDrag(event.x);
  }

  onMoveEnd() {
    this.setState({
      isDragging: false
    });
  }

  render() {
    const { height } = this.props;
    const { isDragging } = this.state;

    return (
      <Move
        cursor="ew-resize"
        onMoveStart={bind(this.onMoveStart, this)}
        onMove={bind(this.onMove, this)}
        onMoveEnd={bind(this.onMoveEnd, this)}
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
  }
}
