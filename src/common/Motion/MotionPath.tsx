import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';
import { DEFAULT_TRANSITION } from './config';

export const MotionPath = ({
  custom,
  transition,
  onAnimationFinished,
  ...rest
}) => {
  const d = useMotionValue(custom.exit.d);
  const prevPathRef = useRef(custom.exit.d);
  const spring = useSpring(useMotionValue(prevPathRef.current), {
    ...DEFAULT_TRANSITION,
    from: 0,
    to: 1
  });

  useEffect(() => {
    const interpolator = interpolate(prevPathRef.current, custom.enter.d);

    const unsub = spring.onChange((v) => {
      d.set(interpolator(v));

      // NOTE: This is tricky logic ( Also refer to MotionBar.tsx ) ...
      //  - Must animate in only once ( renders )
      //  - Must not animate when other props change ( tooltip hover )
      //  - Must animate from prev to new position on updates ( live updates )
      if (v === 1) {
        prevPathRef.current = custom.enter.d;
        onAnimationFinished();
      }
    });

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
