/**
 * Given a set of arcs, return an array of points for each arc.
 */
export const getPointsForLevels = ({ count, outerRadius, ticks, arcs }) => {
  const levels: Array<Array<{ x: number; y: number }>> = [];
  const polyangle = (Math.PI * 2) / ticks;

  for (const level of arcs) {
    const hyp = (level / count) * outerRadius;

    const points: Array<{ x: number; y: number }> = [];
    for (let vertex = 0; vertex < ticks; vertex++) {
      const theta = vertex * polyangle;
      points.push({
        x: hyp * Math.sin(Math.PI - theta),
        y: hyp * Math.cos(Math.PI - theta),
      });
    }

    levels.push([...points, points[0]]);
  }

  return levels;
};
