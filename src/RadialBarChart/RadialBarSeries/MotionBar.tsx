import { interpolate } from 'd3-interpolate';
import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useEffect, useRef } from 'react';

import { DEFAULT_TRANSITION } from '@/common/Motion';

export const MotionBar = ({ custom, transition, arc, ...rest }: any) => {
  const d = useMotionValue('');
  const currentYRef = useRef(custom.exit.y);
  const spring = useSpring(0, DEFAULT_TRANSITION);

  useEffect(() => {
    const interpolator = interpolate(currentYRef.current, custom.enter.y);
    const prevSpring = spring.get();
    let timeoutId;

    if (transition?.delay) {
      timeoutId = setTimeout(() => {
        spring.set(prevSpring + 1);
      }, transition.delay * 1000);
    } else {
      spring.set(prevSpring + 1);
    }

    const unsubscribe = spring.onChange((v) => {
      currentYRef.current = interpolator(v - prevSpring);
      d.set(arc({ ...custom.enter, y: currentYRef.current }));
    });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      unsubscribe();
    };
  }, [arc, custom.enter, d, spring, transition.delay]);

  const { d: enterD, ...enterRest } = custom.enter;
  const { d: exitD, ...exitRest } = custom.exit;

  return (
    <motion.path
      {...rest}
      initial={exitRest}
      exit={exitRest}
      animate={enterRest}
      transition={transition}
      d={transition.type !== false ? d : enterD}
      tabIndex={0}
    />
  );
};
