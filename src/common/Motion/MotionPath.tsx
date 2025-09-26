import { interpolate } from 'd3-interpolate';
import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useEffect } from 'react';

import { DEFAULT_TRANSITION } from './config';

export const MotionPath = ({ custom, transition, ...rest }: any) => {
  const d = useMotionValue(custom.exit.d);
  const spring = useSpring(0, DEFAULT_TRANSITION);

  useEffect(() => {
    const interpolator = interpolate(d.get(), custom.enter.d);
    const prevSpring = spring.get();
    spring.set(prevSpring + 1);

    return spring.on('change', (v) => d.set(interpolator(v - prevSpring)));
  }, [custom.enter.d, custom.exit.d, d, spring]);

  const { d: enterD, ...enterRest } = custom.enter;
  const { d: exitD, ...exitRest } = custom.exit;

  return (
    <motion.path
      {...rest}
      initial={{ opacity: 0, ...exitRest }}
      exit={{ opacity: 0, ...exitRest }}
      animate={{ opacity: 1, ...enterRest }}
      transition={transition}
      d={transition.type !== false ? d : enterD}
    />
  );
};
