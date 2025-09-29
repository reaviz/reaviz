export const DEFAULT_TRANSITION = {
  type: 'spring' as const,
  velocity: 5,
  damping: 20,
  // https://github.com/framer/motion/issues/1513#issuecomment-1121133717
  restDelta: 0.01,
  restSpeed: 0.01
};
