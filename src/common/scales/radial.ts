import { scaleLinear } from 'd3-scale';

/**
 * Get the Y Scale for a given set of radiuses.
 * Reference: https://github.com/d3/d3-scale/issues/90
 */
export const getRadialYScale = (
  innerRadius: number,
  outerRadius: number,
  domain: any[]
) => {
  if (domain[0] === 0 && domain[1] === 0) {
    // If all values are 0, set the domain to [0, 1], so the zero values are
    // all at the bottom of the chart, not the middle.
    domain = [0, 1];
  }
  const y = scaleLinear()
    .range([innerRadius * innerRadius, outerRadius * outerRadius])
    .domain(domain);

  const yScale = Object.assign((d) => Math.sqrt(y(d)), y);

  return yScale;
};
