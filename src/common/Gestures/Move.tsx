import React, {
  Children,
  cloneElement,
  PropsWithChildren,
  FC,
  useEffect,
  useRef
} from 'react';
import { toggleTextSelection } from '@/common/utils/selection';

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

export const Move: FC<Partial<MoveProps>> = ({
  cursor,
  disabled = false,
  preventRightClick = true,
  disableText = true,
  threshold = 0,
  onMoveStart = () => undefined,
  onMove = () => undefined,
  onMoveCancel = () => undefined,
  onMoveEnd = () => undefined,
  children
}) => {
  const started = useRef(false);
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const prevXPosition = useRef(0);
  const prevYPosition = useRef(0);
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
    disableTextSelection(true);
  };

  const disableTextSelection = (shouldDisable: boolean) => {
    if (disableText) {
      toggleTextSelection(shouldDisable);
    }
  };

  const setCursor = (set: boolean) => {
    if (cursor) {
      document.body.style.cursor = set ? cursor : 'inherit';
    }
  };

  const checkThreshold = () => {
    return (
      !started.current && (Math.abs(deltaX.current) > threshold || Math.abs(deltaY.current) > threshold)
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
    const shouldCancel = event.nativeEvent.which === 3 && preventRightClick;
    if (shouldCancel || disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    started.current = false;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { movementX, movementY } = event;
    let localDeltaX = deltaX.current + movementX;
    let localDeltaY = deltaY.current + movementY;

    if (checkThreshold()) {
      disableTextSelection(true);
      setCursor(true);

      localDeltaX = 0;
      localDeltaY = 0;
      started.current = true;

      onMoveStart({
        nativeEvent: event,
        type: 'mouse'
      });
    } else {
      rqf.current = requestAnimationFrame(() => {
        onMove({
          nativeEvent: event,
          type: 'mouse',
          x: localDeltaX,
          y: localDeltaY
        });
      });
    }

    deltaX.current = localDeltaX;
    deltaY.current = localDeltaY;
  };

  const onMouseUp = (event) => {
    event.preventDefault();
    event.stopPropagation();

    disposeHandlers();

    if (started.current) {
      onMoveEnd({
        nativeEvent: event,
        type: 'mouse'
      });
    } else {
      onMoveCancel({
        nativeEvent: event,
        type: 'mouse'
      });
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    if (disabled || event.touches.length !== 1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    started.current = false;
    prevXPosition.current = event.touches[0].clientX;
    prevYPosition.current = event.touches[0].clientY;

    // Always bind event so we cancel movement even if no action was taken
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  const onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Calculate delta from previous position and current
    const { clientX, clientY } = getTouchCoords(event);
    let localDeltaX = clientX - prevXPosition.current;
    let localDeltaY = clientY - prevYPosition.current;

    // Track the delta
    localDeltaX = localDeltaX + localDeltaX;
    localDeltaY = localDeltaY + localDeltaY;

    if (checkThreshold()) {
      disableTextSelection(true);
      setCursor(true);

      localDeltaX = 0;
      localDeltaY = 0;
      started.current = true;

      onMoveStart({
        nativeEvent: { ...event, clientX, clientY },
        type: 'touch'
      });
    } else {
      rqf.current = requestAnimationFrame(() => {
        onMove({
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

    prevXPosition.current = clientX;
    prevYPosition.current = clientY;
  };

  const onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    disposeHandlers();

    if (started.current) {
      onMoveEnd({
        nativeEvent: event,
        type: 'touch'
      });
    } else {
      onMoveCancel({
        nativeEvent: event,
        type: 'touch'
      });
    }
  };

  return Children.map(children, (child: any) =>
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
