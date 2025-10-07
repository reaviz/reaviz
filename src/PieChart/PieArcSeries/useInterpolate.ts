import { interpolate } from 'd3-interpolate';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';

import { DEFAULT_TRANSITION } from '@/common/Motion';

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
  const d = useMotionValue('');
  const spring = useSpring(0, DEFAULT_TRANSITION);

  useEffect(() => {
    const interpolator = interpolate(prevData.current, data);
    const prevSpring = spring.get();

    spring.set(prevSpring + 1);

    return spring.on('change', (v) => {
      const newData = interpolator(v - prevSpring);
      prevData.current = newData;

      d.set(arc(newData));
    });
  }, [arc, d, data, exit, spring]);

  return d;
};
