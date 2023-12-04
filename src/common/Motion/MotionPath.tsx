import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [done, setDone] = useState<boolean>(false);
  const prevRef = useRef(custom.enter.d);

  useEffect(() => {
    if (done) {
      prevPath.set(prevRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interpolator = interpolate(prevPath.get(), custom.enter.d);
    setDone(false);

    const unsub = spring.onChange(v => {
      d.set(interpolator(v));

      // NOTE: This is tricky logic ( Also refer to MotionBar.tsx ) ...
      //  - Must animate in only once ( renders )
      //  - Must not animate when other props change ( tooltip hover )
      //  - Must animate from prev to new position on updates ( live updates )
      if (v === 1) {
        prevRef.current = custom.enter.d;
        setDone(true);
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
