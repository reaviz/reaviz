export interface TextDimensions {
  height: number;
  width: number;
}

const cache: { [key: string]: TextDimensions } = {};

export const calculateDimensions = (
  text: string,
  fontFamily: string,
  fontSize: string | number
): TextDimensions => {
  const key = `${text}_${fontFamily}_${fontSize}`;

  // Check if we have a cache hit
  if (cache[key]) {
    return cache[key];
  }

  // If we are in a Node.js environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    const dimensions = {
      height: text.length,
      width: text.length
    };

    cache[key] = dimensions;

    return dimensions;
  }

  // Create a canvas element and get the context
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Failed to get canvas context');
  }

  // Set the font settings
  context.font = `${fontSize} ${fontFamily}`;

  // Measure the text
  const metrics = context.measureText(text);

  // Calculate height using the font size
  const height = parseInt(typeof fontSize === 'string' ? fontSize : fontSize.toString(), 10);
  const dimensions = {
    height,
    width: metrics.width
  };

  // Store the result in the cache for future calls
  cache[key] = dimensions;

  return dimensions;
};
