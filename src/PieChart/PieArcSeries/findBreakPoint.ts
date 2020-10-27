type Coordinate = [number, number];

/**
 * Finds intermediate point between two points so that this three points
 * can be nicely connected by two lines. One of this lines must be horizontal
 */
export function findBreakPoint(
  [startX, startY]: Coordinate,
  [endX, endY]: Coordinate
): Coordinate {
  let breakPoint: Coordinate = [0, 0];

  // whether we should create breakpoint near pie or near label
  const breakPointCondition = (endY - startY) * Math.sign(startY) >= 0;

  if (breakPointCondition) {
    // extend the line starting from startY till the endY
    let scale = Math.abs(endY / startY) || 1;
    const minScale = 1;
    const maxScale = Math.abs(endX / startX) || 1;

    scale = Math.max(Math.min(maxScale, scale), minScale);

    breakPoint = [startX * scale, endY];
  } else {
    // some arbitrary scale to ensure that break point will be placed
    // at some horizontal distance from the end point
    let scale = 0.85;
    const minScale = Math.abs(startX / endX) || 1;
    const maxScale = 1;

    scale = Math.max(Math.min(maxScale, scale), minScale);

    breakPoint = [endX * scale, startY];
  }

  return breakPoint;
}
