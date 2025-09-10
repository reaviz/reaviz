import { useEffect } from 'react';
import { DEFAULT_TRANSITION } from '@/common/Motion';
import { useMotionValue, useSpring } from 'motion/react';
import { interpolate } from 'd3-interpolate';

export const useInterpolate = ({ animated, initial, path }) => {
  const transition = animated
    ? { ...DEFAULT_TRANSITION }
    : {
      delay: 0,
      type: false as const
    };

  const d = useMotionValue(initial);
  const spring = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const interpolator = interpolate(d.get(), path);
    const prevSpring = spring.get();
    spring.set(1 + prevSpring);

    return spring.on('change', (v) => d.set(interpolator(v - prevSpring)));
  }, [d, path, spring]);

  return { transition, d: animated ? d : path };
};
