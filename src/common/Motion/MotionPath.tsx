import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { interpolate } from 'd3-interpolate';
import { DEFAULT_TRANSITION } from './config';

export const MotionPath = ({ custom, transition, ...rest }) => {
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
      initial={exitRest}
      exit={exitRest}
      animate={enterRest}
      transition={transition}
      d={transition.type !== false ? d : enterD}
    />
  );
};
