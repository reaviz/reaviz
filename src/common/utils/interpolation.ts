import { curveLinear, curveMonotoneX, curveStep } from 'd3-shape';

export type InterpolationTypes = 'linear' | 'smooth' | 'step';
export type RadialInterpolationTypes = 'linear' | 'smooth';

/**
 * Helper function for interpolation.
 */
export function interpolate(
  type: InterpolationTypes | RadialInterpolationTypes
) {
  if (type === 'smooth') {
    return curveMonotoneX;
  } else if (type === 'step') {
    return curveStep;
  } else {
    return curveLinear;
  }
}
