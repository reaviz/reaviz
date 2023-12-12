import { Glow } from './Glow';

export const generateGlowStyles = (glow: Glow) => {
  if (!glow) return {};

  const { x = 0, y = 0, blur = 5, color = 'rgb(93, 37, 238, 0.5)' } = glow;

  return blur
    ? { filter: `drop-shadow(${x}px ${y}px ${blur}px ${color})` }
    : {};
};
