import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';
import { DEFAULT_TRANSITION } from '../../common/Motion';

export const MotionBar = ({ custom, transition, arc, ...rest }) => {
  const d = useMotionValue('');
  const currentYRef = useRef(custom.exit.y);
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
    const interpolator = interpolate(currentYRef.current, custom.enter.y);

    spring.set(1);

    const unsub = spring.onChange((v) => {
      currentYRef.current = interpolator(v);
      d.set(arc({ ...custom.enter, y: currentYRef.current }));
    });

    return unsub;
  }, [arc, custom.enter, d, spring]);

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
