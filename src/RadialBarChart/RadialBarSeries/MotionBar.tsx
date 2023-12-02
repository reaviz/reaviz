import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';
import { DEFAULT_TRANSITION } from '../../common/Motion';

export const MotionBar = ({
  custom,
  transition,
  arc,
  setIsAnimating,
  ...rest
}) => {
  const d = useMotionValue('');
  const prevPathRef = useRef(custom.exit);
  const spring = useSpring(useMotionValue(prevPathRef.current), {
    ...DEFAULT_TRANSITION,
    from: 0,
    to: 1
  });

  useEffect(() => {
    const from = prevPathRef.current;
    const interpolator = interpolate(from?.y, custom.enter.y);

    const unsub = spring.onChange((v) => {
      d.set(arc({ ...custom.enter, y: interpolator(v) }));

      // NOTE: This is tricky logic ( Also refer to MotionPath.tsx ) ...
      //  - Must animate in only once ( renders )
      //  - Must not animate when other props change ( tooltip hover )
      //  - Must animate from prev to new position on updates ( live updates )
      if (v === 1) {
        prevPathRef.current = custom.enter;
        setIsAnimating(false);
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
