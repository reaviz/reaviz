import React, { FC, Fragment } from 'react';

export interface GlowProps {
  /**
   * The color of the glow.
   */
  color?: string;

  /**
   * The x offset of the glow.
   */
  x?: number;

  /**
   * The y offset of the glow.
   */
  y?: number;

  /**
   * The blur radius of the glow.
   */
  blur?: number;
}

export const Glow: FC<GlowProps> = () => (
  <Fragment />
);

Glow.defaultProps = {
  x: 1,
  y: 1,
  blur: 5,
  color: 'rgb(93, 37, 238, 0.5)'
};
