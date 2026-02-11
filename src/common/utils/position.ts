import { bisector } from 'd3-array';
import { applyToPoint, applyToPoints, inverse } from 'transformation-matrix';

type PointObjectNotation = { x: number; y: number };

/**
 * Add ability to calculate scale band position.
 * Reference: https://stackoverflow.com/questions/38633082/d3-getting-invert-value-of-band-scales
 */
const scaleBandInvert = (scale, round = false) => {
  const domain = scale.domain();
  const paddingOuter = scale(domain[0]);
  const eachBand = scale.step();
  const [, end] = scale.range();

  return (offset) => {
    // Keep the band from going outside the domain length
    let band = Math.min(
      (offset - paddingOuter) / eachBand,
      domain.length - 0.01
    );

    // Catch negative band values from horizontal charts exceeding domain length
    if (band < 0 && Math.abs(band) > domain.length - 1) {
      band = Math.floor(Math.abs(band)) * -1;
    }

    // Round to the closest index OR take the floor value
    let index = round
      ? Math.round(band) % domain.length
      : Math.floor(band) % domain.length;

    // Handle horizontal charts...
    if (end === 0) {
      index = index * -1;
    }

    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
};

/**
 * Get the data point closest to a given position on a continuous scale.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.pos - The position to find the closest point to.
 * @param {Object} params.scale - The scale object.
 * @param {Array} params.data - The data array.
 * @param {string} [params.attr='x'] - The attribute to use for comparison.
 * @param {boolean} [params.roundDown=false] - Whether to round down to the nearest point.
 *
 * @returns {Object} The closest point to the specified position.
 */
export const getClosestContinousScalePoint = ({
  pos,
  scale,
  data,
  attr = 'x',
  roundDown = false
}: {
  pos: number;
  scale: any;
  data: any[];
  attr?: string;
  roundDown?: boolean;
}) => {
  const domain = scale.invert(pos);

  // Select the index
  const bisect = bisector((d: any) => {
    // add 1 to an index so it's the upper limit of a domain
    return attr === 'i' ? d[attr] + 1 : d[attr];
  }).right;
  const index = bisect(data, domain);

  // Determine min index
  const minIndex = Math.max(0, index - 1);
  const before = data[minIndex];

  if (roundDown) {
    return before;
  }

  // Determine max index
  const maxIndex = Math.min(data.length - 1, index);
  const after = data[maxIndex];

  // Determine which is closest to the point
  let beforeVal = before[attr];
  let afterVal = after[attr];
  beforeVal = domain - beforeVal;
  afterVal = afterVal - domain;

  return beforeVal < afterVal ? before : after;
};

/**
 * Get the data point closest to a given position on a band scale. This rounds down by default.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.pos - The position to find the closest point to.
 * @param {Object} params.scale - The scale object.
 * @param {Array} params.data - The data array.
 * @param {boolean} [params.roundClosest=false] - Whether to round to the closest point instead of down.
 *
 * @returns {Object} The closest point to the specified position.
 */
export const getClosestBandScalePoint = ({
  pos,
  scale,
  data,
  roundClosest = false
}: {
  pos: number;
  scale: any;
  data: any[];
  roundClosest?: boolean;
}) => {
  const domain = scale.domain();
  let prop;

  // Of course the Marimekko is a pain...
  if (scale.mariemkoInvert) {
    prop = scale.mariemkoInvert(pos);
  } else {
    prop = scaleBandInvert(scale, roundClosest)(pos);
  }

  const idx = domain.indexOf(prop);
  return data[idx];
};

/**
 * Given an event, get the parent svg element;
 */
export const getParentSVG = (event) => {
  // set node to targets owner svg
  let node = event.target.ownerSVGElement;

  // find the outermost svg
  if (node) {
    while (node.ownerSVGElement) {
      node = node.ownerSVGElement;
    }
  }

  return node;
};

/**
 * Given an event, get the relative X/Y position for a target.
 */
export const getPositionForTarget = ({ target, clientX, clientY }) => {
  const rect = target.getBoundingClientRect();
  return {
    x: clientX - (rect?.left || 0) - target.clientLeft,
    y: clientY - (rect?.top || 0) - target.clientTop
  };
};

/**
 * Gets the point from q given matrix.
 */
export const getPointFromMatrix = (event, matrix): PointObjectNotation | null => {
  const parent = getParentSVG(event);

  if (!parent) {
    return null;
  }

  // Determines client coordinates relative to the editor component
  const { top, left } = parent.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;

  // Transforms the coordinate to world coordinate (in the SVG/DIV world)
  return applyToPoint(inverse(matrix), { x, y });
};

/**
 * Get the start/end matrix.
 */
export const getLimitMatrix = (
  height: number,
  width: number,
  matrix
): PointObjectNotation[] =>
  applyToPoints(matrix, [
    { x: 0, y: 0 },
    { x: width, y: height }
  ]);

/**
 * Constrain the matrix.
 */
export const constrainMatrix = (height: number, width: number, matrix) => {
  const [min, max] = getLimitMatrix(height, width, matrix) as {
    x: number;
    y: number;
  }[];

  if (max.x < width || max.y < height) {
    return true;
  }

  if (min.x > 0 || min.y > 0) {
    return true;
  }

  return false;
};

/**
 * Determine if scale factor is less than allowed.
 */
const lessThanScaleFactorMin = (value, scaleFactor: number) =>
  value.scaleFactorMin && value.d * scaleFactor <= value.scaleFactorMin;

/**
 * Determine if scale factor is larger than allowed.
 */
const moreThanScaleFactorMax = (value, scaleFactor: number) =>
  value.scaleFactorMax && value.d * scaleFactor >= value.scaleFactorMax;

/**
 * Determine if both min and max scale fctors are going out of bounds.
 */
export const isZoomLevelGoingOutOfBounds = (value, scaleFactor: number) => {
  const a = lessThanScaleFactorMin(value, scaleFactor) && scaleFactor < 1;
  const b = moreThanScaleFactorMax(value, scaleFactor) && scaleFactor > 1;
  return a || b;
};
