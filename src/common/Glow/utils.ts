import { Glow } from './Glow';

export interface generateGlowStylesInput {
  glow?: Glow;
  colorSchemeColor?: string;
}

/**
 * Convert a color to RGBA format.
 * @param color - The color to convert in HEX, RGB, or RGBA format.
 * @param opacity - The opacity to apply to the color.
 * @returns The color in RGBA format.
 */
export const convertColorToRGBA = (color: string, opacity: number) => {
  if (color.startsWith('#')) {
    let r = parseInt(color.slice(1, 3), 16),
      g = parseInt(color.slice(3, 5), 16),
      b = parseInt(color.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else if (color.startsWith('rgba')) {
    let rgbaComponents = color.split(',');
    rgbaComponents[3] = ` ${opacity})`;
    return rgbaComponents.join(',');
  } else if (color.startsWith('rgb')) {
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
  }

  return color;
};

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

  color = convertColorToRGBA(color, opacity);

  return blur
    ? { filter: `drop-shadow(${x}px ${y}px ${blur}px ${color})` }
    : {};
};
