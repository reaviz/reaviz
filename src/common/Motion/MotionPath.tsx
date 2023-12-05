import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';
import { DEFAULT_TRANSITION } from './config';

export const MotionPath = ({ custom, transition, ...rest }) => {
  const d = useMotionValue(custom.exit.d);
  const spring = useSpring(0, {
    ...DEFAULT_TRANSITION,
    from: 0,
    to: 1
  });

  useEffect(() => {
    spring.set(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(d.get());
    let interpolator = interpolate(d.get(), custom.enter.d);

    spring.set(1);

    const unsub = spring.onChange((v) => {
      console.log(v);
      d.set(interpolator(v));
    });

    return unsub;
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
