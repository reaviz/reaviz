/**
 * Gets the position between a given set of points.
 */
export const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2
});

/**
 * Gets the distance between a given set of points.
 */
export const getDistanceBetweenPoints = (pointA, pointB) =>
  Math.sqrt(
    Math.pow(pointB.y - pointA.y, 2) + Math.pow(pointB.x - pointA.x, 2)
  );

/**
 * Get touch points.
 */
export function getTouchPoints(event, node) {
  const { left, top } = node.getBoundingClientRect();

  const [pointA, pointB] = [...event.touches].map((touch) => ({
    x: touch.clientX - Math.round(left),
    y: touch.clientY - Math.round(top)
  }));

  const distance = getDistanceBetweenPoints(pointA, pointB);
  const midpoint = getMidpoint(pointA, pointB);

  return {
    pointA,
    pointB,
    distance,
    midpoint
  };
}
