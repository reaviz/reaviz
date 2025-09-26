export interface TextDimensions {
  height: number;
  width: number;
}

const cache: { [key: string]: TextDimensions } = {};

export const calculateDimensions = (
  text: string,
  fontFamily: string,
  fontSize: string | number,
): TextDimensions => {
  const key = `${text}_${fontFamily}_${fontSize}`;

  // Check if we have a cache hit
  if (cache[key]) {
    return cache[key];
  }

  // If we are in a Node.js environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    const height = parseInt(
      typeof fontSize === 'string' ? fontSize : fontSize.toString(),
      10,
    );
    const dimensions = {
      height,
      // 8 is an approximation of the width of a character
      width: text.length * 8,
    };

    cache[key] = dimensions;

    return dimensions;
  }

  // Create a temporary div element
  const element = document.createElement('div');

  // Set up the style so the size can be measured
  element.style.fontFamily = fontFamily;
  element.style.fontSize =
    typeof fontSize === 'string' ? fontSize : `${fontSize}px`;
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.whiteSpace = 'nowrap';
  element.style.height = 'auto';
  element.style.fontWeight = 'normal';
  element.style.lineHeight = 'normal';
  element.style.width = 'auto';
  element.style.wordBreak = 'normal';

  // Add the text to the div
  element.textContent = text;

  // Add the div to the body
  document.body.appendChild(element);

  // Measure the div
  const dimensions = {
    height: element.offsetHeight,
    width: element.offsetWidth,
  };

  // Remove the div from the body
  document.body.removeChild(element);

  // Store the result in the cache for future calls
  cache[key] = dimensions;

  return dimensions;
};
