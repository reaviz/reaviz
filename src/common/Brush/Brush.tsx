import React, {
  useState,
  useEffect,
  useRef,
  FC,
  PropsWithChildren,
  useCallback
} from 'react';
import { getPositionForTarget } from '@/common/utils/position';
import { BrushSlice, BrushChangeEvent } from './BrushSlice';
import { ChartDataTypes } from '@/common/data';
import { Move } from '@/common/Gestures/Move';

export interface BrushConfiguration {
  disabled?: boolean;
  fill?: string;
  domain?: [ChartDataTypes, ChartDataTypes];
  onBrushChange?: (e) => void;
}

interface BrushProps extends PropsWithChildren {
  height: number;
  width: number;
  disabled?: boolean;
  start?: number;
  end?: number;
  onBrushChange?: (e: BrushChangeEvent) => void;
}

interface BrushState {
  start?: number;
  end?: number;
}

export const Brush: FC<Partial<BrushProps>> = (props) => {
  const {
    children,
    disabled,
    height,
    width,
    start: startProp,
    end: endProp,
    onBrushChange
  } = props;
  const [isSlicing, setIsSlicing] = useState(false);
  const [initial, setInitial] = useState<number>();
  const [range, setRange] = useState<BrushState>({
    start: props.start || 0,
    end: props.end || props.width
  });
  const { start, end } = range;

  const ref = useRef<any>();

  const ensurePositionInBounds = useCallback(
    (newStart?: number, newEnd?: number) => {
      let startUpdated = newStart;
      let endUpdated = newEnd;

      if (startUpdated === undefined || startUpdated <= 0) {
        startUpdated = 0;
      }

      if (end === undefined) {
        endUpdated = width;
      }

      if (startUpdated > endUpdated) {
        startUpdated = start;
      }

      if (endUpdated < startUpdated) {
        endUpdated = end;
      }

      if (endUpdated >= width) {
        endUpdated = width;
      }

      return { start: startUpdated, end: endUpdated };
    },
    [end, start, width]
  );

  const getPositionsForPanEvent = useCallback((event: any) => {
    const eventObj = {
      target: ref.current,
      clientX: event.clientX,
      clientY: event.clientY
    };

    return getPositionForTarget(eventObj);
  }, []);

  const getStartEnd = useCallback(
    (event: any) => {
      const { x } = getPositionsForPanEvent(event);

      if (x < initial) {
        return ensurePositionInBounds(x, initial);
      } else {
        return ensurePositionInBounds(initial, x);
      }
    },
    [ensurePositionInBounds, getPositionsForPanEvent, initial]
  );

  const onMoveStart = useCallback(
    (event: any) => {
      if (!disabled) {
        const positions = getPositionsForPanEvent(event.nativeEvent);

        setIsSlicing(true);
        setInitial(positions.x);
      }
    },
    [disabled, getPositionsForPanEvent]
  );

  const onMove = useCallback(
    (event: any) => {
      if (!disabled) {
        const { start, end } = getStartEnd(event.nativeEvent);

        if (onBrushChange) {
          onBrushChange({
            start,
            end
          });
        }

        setRange({ start, end });
      }
    },
    [disabled, getStartEnd, onBrushChange]
  );

  const onMoveEnd = useCallback(() => {
    setIsSlicing(false);
  }, []);

  const onMoveCancel = useCallback(() => {
    const val = {
      start: 0,
      end: width
    };

    setRange(val);

    if (onBrushChange) {
      onBrushChange(val);
    }
  }, [onBrushChange, width]);

  const onSliceChange = useCallback(
    (event: BrushChangeEvent) => {
      const val = ensurePositionInBounds(event.start, event.end);

      setRange((state) => ({ ...state, ...val }));

      if (onBrushChange) {
        onBrushChange(val);
      }
    },
    [ensurePositionInBounds, onBrushChange]
  );

  useEffect(() => {
    if (end === width) {
      setRange((prev) => ({
        ...prev,
        end: width
      }));
    }
  }, [end, width]);

  useEffect(() => {
    // Don't update if we are doing the slicing
    if (!isSlicing) {
      const startUpdated = startProp !== start;
      const endUpdated = endProp !== end;

      if (startUpdated || endUpdated) {
        setRange(ensurePositionInBounds(start, end));
      }
    }
  }, [end, endProp, ensurePositionInBounds, isSlicing, start, startProp]);

  return (
    <Move
      cursor="crosshair"
      onMoveStart={onMoveStart}
      onMove={onMove}
      onMoveEnd={onMoveEnd}
      onMoveCancel={onMoveCancel}
    >
      <g
        style={{
          pointerEvents: isSlicing ? 'none' : 'auto',
          cursor: disabled ? '' : 'crosshair'
        }}
      >
        {children}
        {!disabled && (
          <>
            <rect ref={ref} height={height} width={width} opacity={0} />
            {start !== undefined && end !== undefined && (
              <BrushSlice
                start={start}
                end={end}
                height={height}
                width={width}
                onBrushChange={onSliceChange}
              />
            )}
          </>
        )}
      </g>
    </Move>
  );
};
