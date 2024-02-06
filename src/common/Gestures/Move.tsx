import React, {
  Children,
  cloneElement,
  PropsWithChildren,
  FC,
  useEffect,
  useRef
} from 'react';
import { toggleTextSelection } from '../utils/selection';

interface MoveProps extends PropsWithChildren {
  cursor?: string;
  disabled?: boolean;
  preventRightClick: boolean;
  disableText: boolean;
  threshold: number;
  onMoveStart: (event) => void;
  onMove: (event) => void;
  onMoveCancel: (event) => void;
  onMoveEnd: (event) => void;
}

export const Move: FC<Partial<MoveProps>> = (props) => {
  let started = false;
  let deltaX = 0;
  let deltaY = 0;
  let prevXPosition = 0;
  let prevYPosition = 0;
  const rqf = useRef<number>();

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rqf.current);
      disposeHandlers();
    };
  }, []);

  const disposeHandlers = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);

    setCursor(false);
    disableText(true);
  };

  const disableText = (shouldDisable: boolean) => {
    if (props.disableText) {
      toggleTextSelection(shouldDisable);
    }
  };

  const setCursor = (set: boolean) => {
    let { cursor } = props;

    if (cursor) {
      if (!set) {
        cursor = 'inherit';
      }

      document.body.style['cursor'] = cursor;
    }
  };

  const checkThreshold = () => {
    const { threshold } = props;

    return (
      !started && (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold)
    );
  };

  const getTouchCoords = (event) => {
    const { clientX, clientY } = event.touches[0];
    return {
      clientX,
      clientY
    };
  };

  const onMouseDown = (event: React.MouseEvent) => {
    const { preventRightClick, disabled } = props;

    const shouldCancel = event.nativeEvent.which === 3 && preventRightClick;
    if (shouldCancel || disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    started = false;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { movementX, movementY } = event;
    let localDeltaX = deltaX + movementX;
    let localDeltaY = deltaY + movementY;

    if (checkThreshold()) {
      disableText(true);
      setCursor(true);

      localDeltaX = 0;
      localDeltaY = 0;
      started = true;

      props.onMoveStart({
        nativeEvent: event,
        type: 'mouse'
      });
    } else {
      rqf.current = requestAnimationFrame(() => {
        props.onMove({
          nativeEvent: event,
          type: 'mouse',
          x: localDeltaX,
          y: localDeltaY
        });
      });
    }

    deltaX = localDeltaX;
    deltaY = localDeltaY;
  };

  const onMouseUp = (event) => {
    event.preventDefault();
    event.stopPropagation();

    disposeHandlers();

    if (started) {
      props.onMoveEnd({
        nativeEvent: event,
        type: 'mouse'
      });
    } else {
      props.onMoveCancel({
        nativeEvent: event,
        type: 'mouse'
      });
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    const { disabled } = props;

    if (disabled || event.touches.length !== 1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    started = false;
    prevXPosition = event.touches[0].clientX;
    prevYPosition = event.touches[0].clientY;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  const onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Calculate delta from previous position and current
    const { clientX, clientY } = getTouchCoords(event);
    let localDeltaX = clientX - prevXPosition;
    let localDeltaY = clientY - prevYPosition;

    // Track the delta
    localDeltaX = localDeltaX + localDeltaX;
    localDeltaY = localDeltaY + localDeltaY;

    if (checkThreshold()) {
      disableText(true);
      setCursor(true);

      localDeltaX = 0;
      localDeltaY = 0;
      started = true;

      props.onMoveStart({
        // TODO: Come back and clean this up...
        nativeEvent: {
          ...event,
          clientX,
          clientY
        },
        type: 'touch'
      });
    } else {
      rqf.current = requestAnimationFrame(() => {
        props.onMove({
          // TODO: Come back and clean this up...
          nativeEvent: {
            ...event,
            clientX,
            clientY
          },
          type: 'touch',
          x: localDeltaX,
          y: localDeltaY
        });
      });
    }

    prevXPosition = clientX;
    prevYPosition = clientY;
  };

  const onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    disposeHandlers();

    if (started) {
      props.onMoveEnd({
        nativeEvent: event,
        type: 'touch'
      });
    } else {
      props.onMoveCancel({
        nativeEvent: event,
        type: 'touch'
      });
    }
  };

  return Children.map(props.children, (child: any) =>
    cloneElement(child, {
      ...child.props,
      onMouseDown: (e) => {
        onMouseDown(e);
        if (child.props.onMouseDown) {
          child.props.onMouseDown(e);
        }
      },
      onTouchStart: (e) => {
        onTouchStart(e);
        if (child.props.onTouchStart) {
          child.props.onTouchStart(e);
        }
      }
    })
  );
};

Move.defaultProps = {
  preventRightClick: true,
  disableText: true,
  threshold: 0,
  onMoveStart: () => undefined,
  onMove: () => undefined,
  onMoveEnd: () => undefined,
  onMoveCancel: () => undefined
};
