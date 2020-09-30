import chroma from 'chroma-js';

/**
 * Color Schemes
 * Credits: https://gka.github.io/chroma.js/#chroma-brewer
 */
export const schemes = {
  cybertron: chroma.scale(['#2d60e8', '#26efb5']).correctLightness().colors(8),
  ...chroma.brewer
};
