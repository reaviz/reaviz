import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';
import { DEFAULT_TRANSITION } from './config';

export const MotionPath = ({ custom, transition, ...rest }) => {
  const d = useMotionValue(custom.exit.d);
  const prevPath = useMotionValue(custom.exit.d);
  const spring = useSpring(prevPath, {
    ...DEFAULT_TRANSITION,
    from: 0,
    to: 1
  });

  useEffect(() => {
    const interpolator = interpolate(prevPath.get(), custom.enter.d);
    const unsub = spring.onChange((v) => d.set(interpolator(v)));
    prevPath.set(custom.enter.d);
    return unsub;
  });

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
