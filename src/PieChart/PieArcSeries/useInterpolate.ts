import { useEffect, useMemo } from 'react';
import { DEFAULT_TRANSITION } from '../../common/Motion';
import { useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';

export const useInterpolate = ({ data, animated, arc }) => {
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
        ? {
          ...DEFAULT_TRANSITION
        }
        : {
          delay: 0
        },
    [animated]
  );

  const d = useMotionValue(exit);
  const spring = useSpring(0, {
    ...DEFAULT_TRANSITION,
    // Small timeout for initial animation
    delay: 100,
    from: 0,
    to: 1
  });

  useEffect(() => {
    spring.set(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interpolator = interpolate(d.get(), data);
    spring.set(1);
    return spring.onChange(v => d.set(arc(interpolator(v))));
  }, [arc, d, data, spring]);

  return {
    d,
    transition
  };
};
