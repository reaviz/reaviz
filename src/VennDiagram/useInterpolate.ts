import { useEffect } from 'react';
import { DEFAULT_TRANSITION } from '../common/Motion';
import { useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';

export const useInterpolate = ({ data, animated }) => {
  const transition = animated
    ? { ...DEFAULT_TRANSITION }
    : {
        delay: 0,
        type: false
      };

  const d = useMotionValue(data.path);
  const spring = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const interpolator = interpolate(d.get(), data.path);
    const prevSpring = spring.get();
    spring.set(1 + prevSpring);

    return spring.on('change', (v) => d.set(interpolator(v - prevSpring)));
  }, [d, data.path, spring]);

  return { transition, d };
};
