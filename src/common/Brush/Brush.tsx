import React, { PureComponent, Fragment } from 'react';
import bind from 'memoize-bind';
import { getPositionForTarget } from '../utils/position';
import { BrushSlice, BrushChangeEvent } from './BrushSlice';
import { ChartDataTypes } from '../data';
import { Move } from '../Gestures/Move';

export interface BrushConfiguration {
  disabled?: boolean;
  fill?: string;
  domain?: [ChartDataTypes, ChartDataTypes];
  onBrushChange?: (e) => void;
}

export interface BrushProps {
  height: number;
  width: number;
  disabled?: boolean;
  start?: number;
  end?: number;
  onBrushChange?: (e: BrushChangeEvent) => void;
}

interface BrushState {
  isSlicing: boolean;
  isPanning: boolean;
  start?: number;
  end?: number;
  initial?: number;
}

export class Brush extends PureComponent<BrushProps, BrushState> {
  static defaultProps: Partial<BrushProps> = {
    disabled: false,
    height: 0,
    width: 0,
    onBrushChange: () => undefined
  };

  ref: any;

  constructor(props: BrushProps) {
    super(props);

    this.state = {
      isSlicing: false,
      isPanning: false,
      start: props.start || 0,
      end: props.end || props.width
    };
  }

  componentDidUpdate(prevProps: BrushProps) {
    // If no brush is defined and width updates, update the offset of the end handle.
    if (
      prevProps.width !== this.props.width &&
      this.state.end === prevProps.width
    ) {
      this.setState({ end: this.props.width });
    }

    // Don't update if we are doing the slicing
    if (!this.state.isSlicing && !this.state.isPanning) {
      const { start, end } = this.props;
      const startUpdated =
        start !== prevProps.start && start !== this.state.start;
      const endUpdated = end !== prevProps.end && end !== this.state.end;

      if (startUpdated || endUpdated) {
        this.setState({
          ...this.ensurePositionInBounds(start, end)
        });
      }
    }
  }

  getStartEnd(event, state: BrushState = this.state) {
    const { x } = this.getPositionsForPanEvent(event);

    let start;
    let end;
    if (x < state.initial!) {
      start = x;
      end = state.initial;
    } else {
      start = state.initial;
      end = x;
    }

    return this.ensurePositionInBounds(start, end, state);
  }

  getPositionsForPanEvent(event) {
    const eventObj = {
      target: this.ref,
      clientX: event.clientX,
      clientY: event.clientY
    };

    return getPositionForTarget(eventObj);
  }

  ensurePositionInBounds(
    newStart?: number,
    newEnd?: number,
    state: BrushState = this.state
  ) {
    const { width } = this.props;
    let start = newStart;
    let end = newEnd;

    if (start === undefined || start <= 0) {
      start = 0;
    }

    if (end === undefined) {
      end = width;
    }

    if (start > end) {
      start = state.start!;
    }

    if (end < start) {
      end = state.end!;
    }

    if (end >= width) {
      end = width;
    }

    return { start, end };
  }

  onMoveStart(event) {
    const positions = this.getPositionsForPanEvent(event.nativeEvent);

    this.setState({
      isSlicing: true,
      initial: positions.x
    });
  }

  onMove(event) {
    this.setState((prev) => {
      const { onBrushChange } = this.props;

      // Use setState callback so we can get the true previous value
      // rather than the bulk updated value react will trigger
      const { start, end } = this.getStartEnd(event.nativeEvent, prev);

      if (onBrushChange) {
        onBrushChange({
          start,
          end
        });
      }

      return {
        start,
        end
      };
    });
  }

  onMoveEnd() {
    this.setState({
      isSlicing: false
    });
  }

  onMoveCancel() {
    const val = {
      start: 0,
      end: this.props.width
    };

    this.setState(val);

    if (this.props.onBrushChange) {
      this.props.onBrushChange(val);
    }
  }

  onSliceChange(event: BrushChangeEvent) {
    const val = this.ensurePositionInBounds(event.start, event.end);

    this.setState(val);

    if (this.props.onBrushChange) {
      this.props.onBrushChange(val);
    }
  }

  render() {
    const { children, disabled, height, width } = this.props;
    const { isSlicing, start, end } = this.state;

    return (
      <Move
        cursor="crosshair"
        onMoveStart={bind(this.onMoveStart, this)}
        onMove={bind(this.onMove, this)}
        onMoveEnd={bind(this.onMoveEnd, this)}
        onMoveCancel={bind(this.onMoveCancel, this)}
      >
        <g
          style={{
            pointerEvents: isSlicing ? 'none' : 'auto',
            cursor: disabled ? '' : 'crosshair'
          }}
        >
          {children}
          {!disabled && (
            <Fragment>
              <rect
                ref={(ref) => (this.ref = ref)}
                height={height}
                width={width}
                opacity={0}
              />
              {start !== undefined && end !== undefined && (
                <BrushSlice
                  start={start}
                  end={end}
                  height={height}
                  width={width}
                  onBrushChange={bind(this.onSliceChange, this)}
                />
              )}
            </Fragment>
          )}
        </g>
      </Move>
    );
  }
}
