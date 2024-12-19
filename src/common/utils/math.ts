/**
 * Get the angle from a radian.
 */
export const getDegrees = (radians: number) => (radians / Math.PI) * 180 - 90;

export const roundDecimals = (value: number, decimals: number = 5): number =>
  parseFloat(value.toFixed(decimals));
