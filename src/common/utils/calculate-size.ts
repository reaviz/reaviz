// License: https://github.com/schickling/calculate-size/blob/master/LICENSE

export interface OptionalOptions {
  font?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  width?: string;
  wordBreak?: string;
}

interface Options {
  font: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  width: string;
  wordBreak: string;
}

export interface Size {
  width: number;
  height: number;
}

function createDummyElement(text: string, options: Options): HTMLElement {
  const element = document.createElement('div');
  const textNode = document.createTextNode(text);

  element.appendChild(textNode);

  element.style.fontFamily = options.font;
  element.style.fontSize = options.fontSize;
  element.style.fontWeight = options.fontWeight;
  element.style.lineHeight = options.lineHeight;
  element.style.position = 'absolute';
  element.style.visibility = 'hidden';
  element.style.left = '-999px';
  element.style.top = '-999px';
  element.style.width = options.width;
  element.style.height = 'auto';
  element.style.wordBreak = options.wordBreak;

  document.body.appendChild(element);

  return element;
}

function destroyElement(element: HTMLElement): void {
  element.parentNode.removeChild(element);
}

const cache = {};

export default (text: string, options: OptionalOptions = {}): Size => {
  const cacheKey = JSON.stringify({ text: text, options: options });

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // prepare options
  options.font = options.font || 'Times';
  options.fontSize = options.fontSize || '16px';
  options.fontWeight = options.fontWeight || 'normal';
  options.lineHeight = options.lineHeight || 'normal';
  options.width = options.width || 'auto';
  options.wordBreak = options.wordBreak || 'normal';

  const element = createDummyElement(text, options as Options);

  const size = {
    width: element.offsetWidth,
    height: element.offsetHeight
  };

  destroyElement(element);

  cache[cacheKey] = size;

  return size;
};
