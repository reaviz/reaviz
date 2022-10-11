import calculateSize from 'calculate-size';

export const calculateDimensions = (
  text: string,
  fontFamily: string,
  fontSize: string | number
) => {
  // SSR Rendering doesn't support canvas measurements
  // we have to make a guess in this case...
  if (typeof document === 'undefined') {
    return {
      width: text.length * 8,
      height: 25
    };
  }

  return calculateSize(text, {
    font: fontFamily,
    fontSize: `${fontSize}px`
  });
};
