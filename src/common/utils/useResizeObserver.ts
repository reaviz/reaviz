import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type Size = {
  width: number | undefined;
  height: number | undefined;
};

export const useResizeObserver = <T extends HTMLElement>(): [
  RefObject<T>,
  Size
] => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0) return;
      const entry = entries[0];
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, []);

  return [ref, size];
};
