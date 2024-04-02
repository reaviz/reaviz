import { Glow } from './Glow';
import chroma from 'chroma-js';

export interface generateGlowStylesInput {
  glow?: Glow;
  colorSchemeColor?: string;
}

export const generateGlowStyles = ({
  glow,
  colorSchemeColor
}: generateGlowStylesInput) => {
  if (!glow) return {};

  let {
    x = 0,
    y = 0,
    blur = 5,
    color = colorSchemeColor || 'rgb(255, 255, 255, 0.25)',
    opacity = 1
  } = glow;

  color = chroma(color).alpha(opacity).css();

  return blur
    ? { filter: `drop-shadow(${x}px ${y}px ${blur}px ${color})` }
    : {};
};
