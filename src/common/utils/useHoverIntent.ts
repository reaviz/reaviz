import { PointerEvent, useCallback, useEffect, useRef } from 'react';

export interface HoverIntentOptions {
  interval?: number;
  sensitivity?: number;
  timeout?: number;
  disabled?: boolean;
  onPointerOver: (event: PointerEvent<SVGElement>) => void;
  onPointerOut: (event: PointerEvent<SVGElement>) => void;
}

export interface HoverIntentResult {
  pointerOut: (event: PointerEvent<SVGElement>) => void;
  pointerOver: (event: PointerEvent<SVGElement>) => void;
}

/**
 * Hover intent identifies if the user actually is
 * intending to over by measuring the position of the mouse
 * once a pointer enters and determining if in a duration if
 * the mouse moved inside a certain threshold and fires the events.
 */
export const useHoverIntent = ({
  sensitivity = 7,
  interval = 50,
  timeout = 10,
  disabled,
  onPointerOver,
  onPointerOut
}: HoverIntentOptions | undefined): HoverIntentResult => {
  const mouseOver = useRef<boolean>(false);
  const timer = useRef<any | null>(null);
  const state = useRef<number>(0);
  const coords = useRef({
    x: null,
    y: null,
    px: null,
    py: null
  });

  const onMouseMove = useCallback((event: MouseEvent) => {
    coords.current.x = event.clientX;
    coords.current.y = event.clientY;
  }, []);

  const comparePosition = useCallback(
    (event: PointerEvent<SVGElement>) => {
      timer.current = clearTimeout(timer.current);
      const { px, x, py, y } = coords.current;

      if (Math.abs(px - x) + Math.abs(py - y) < sensitivity) {
        state.current = 1;
        onPointerOver(event);
      } else {
        coords.current.px = x;
        coords.current.py = y;
        timer.current = setTimeout(() => comparePosition(event), interval);
      }
    },
    [interval, onPointerOver, sensitivity]
  );

  const cleanup = useCallback(() => {
    clearTimeout(timer.current);
    document.removeEventListener('mousemove', onMouseMove, false);
  }, [onMouseMove]);

  const pointerOver = useCallback(
    (event: PointerEvent<SVGElement>) => {
      if (!disabled) {
        mouseOver.current = true;
        cleanup();

        if (state.current !== 1) {
          coords.current.px = event.nativeEvent.x;
          coords.current.py = event.nativeEvent.y;
          document.addEventListener('mousemove', onMouseMove, false);
          timer.current = setTimeout(() => comparePosition(event), timeout);
        }
      }
    },
    [cleanup, comparePosition, disabled, onMouseMove, timeout]
  );

  const delay = useCallback(
    (event: PointerEvent<SVGElement>) => {
      timer.current = clearTimeout(timer.current);
      state.current = 0;
      onPointerOut(event);
    },
    [onPointerOut]
  );

  const pointerOut = useCallback(
    (event: PointerEvent<SVGElement>) => {
      mouseOver.current = false;
      cleanup();

      if (state.current === 1) {
        timer.current = setTimeout(() => delay(event), timeout);
      }
    },
    [cleanup, delay, timeout]
  );

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    pointerOver,
    pointerOut
  };
};
