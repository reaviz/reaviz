import { useEffect, useMemo, useRef } from 'react';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';

export const useInterpolate = ({ data, animated, arc }) => {
  const prevEnter = useRef<any | null>(null);

  const exit = useMemo(() => {
    const startAngle = data.startAngle;
    const endAngle = animated ? startAngle : data.endAngle;

    return {
      ...data,
      startAngle,
      endAngle
    };
  }, [data, animated]);

  const transition = useMemo(
    () =>
      animated
        ? { ...DEFAULT_TRANSITION }
        : {
          delay: 0
        },
    [animated]
  );

  // Cache the previous for transition use later
  const previousEnter = prevEnter.current
    ? { ...prevEnter.current }
    : undefined;
  prevEnter.current = { ...data };

  const d = useMotionValue('');
  const prevPath = useMotionValue(exit);
  const spring = useSpring(prevPath, {
    ...DEFAULT_TRANSITION,
    from: 0,
    to: 1
  });

  useEffect(() => {
    const from = previousEnter || prevPath.get();
    const interpolator = interpolate(from, data);
    const unsub = spring.onChange((v) => d.set(arc(interpolator(v))));
    prevPath.set(data);
    return unsub;
  }, [arc, data]);

  return {
    d,
    transition
  };
};
