import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { interpolate } from 'd3-interpolate';
import { DEFAULT_TRANSITION } from '../../common/Motion';

export const MotionBar = ({ custom, transition, arc, ...rest }) => {
  const d = useMotionValue('');
  const prevPath = useMotionValue(custom.exit);
  const spring = useSpring(prevPath, {
    ...DEFAULT_TRANSITION,
    from: 0,
    to: 1
  });

  useEffect(() => {
    const from = custom.previousEnter
      ? custom.previousEnter.y
      : prevPath.get().y;
    const interpolator = interpolate(from, custom.enter.y);
    const unsub = spring.onChange((v) =>
      d.set(arc({ ...custom.enter, y: interpolator(v) }))
    );
    prevPath.set(custom.enter);
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
