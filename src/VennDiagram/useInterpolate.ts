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
  const prevPath = useMotionValue(data.path);
  const spring = useSpring(prevPath, {
    from: 0,
    to: 1
  });

  useEffect(() => {
    const interpolator = interpolate(prevPath.get(), data.path);
    spring.onChange((v) => d.set(interpolator(v)));
    prevPath.set(data.path);
  });

  return { transition, d };
};
