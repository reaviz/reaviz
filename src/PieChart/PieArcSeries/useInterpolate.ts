import { useEffect, useMemo, useRef } from 'react';
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

  const prevData = useRef(exit);
  const d = useMotionValue(exit);
  const spring = useSpring(0, DEFAULT_TRANSITION);

  // delay the initial animation by 100ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      spring.set(1);
    }, 100);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interpolator = interpolate(prevData.current, data);
    const prevSpring = spring.get();

    // only increment spring here if it's for an update, not the initial render
    if (spring.get() >= 1) {
      spring.set(prevSpring + 1);
    }

    return spring.onChange((v) => {
      const newData = interpolator(v - prevSpring);
      prevData.current = newData;

      d.set(arc(newData));
    });
  }, [arc, d, data, exit, spring]);

  return d;
};
