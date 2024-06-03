import chroma from 'chroma-js';

/**
 * Color Schemes
 * Credits: https://gka.github.io/chroma.js/#chroma-brewer
 */
export const schemes = {
  cybertron: chroma.scale(['#2d60e8', '#26efb5']).correctLightness().colors(8),
  unifyviz: [
    '#4C86FF',
    '#40D3F4',
    '#40E5D1',
    '#9152EE',
    '#A840E8',
    '#80CE5B',
    '#AADC40',
    '#D740BE',
    '#EE4094',
    '#E84045',
    '#F8A340',
    '#FFD440'
  ],
  unifyvizwarm: ['#FFD440', '#F8A340', '#E84045'],
  unify8Colors: chroma
    .scale(['#4C86FF', '#26efb5'])
    .correctLightness()
    .colors(8),
  ...chroma.brewer
};
