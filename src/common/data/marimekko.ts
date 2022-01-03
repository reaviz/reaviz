import { ChartNestedDataShape, ChartInternalNestedDataShape } from './types';
import { buildBarStackData } from './barStack';

/**
 * Builds a stack dataset from the standard data format.
 */
export function buildMarimekkoData(
  data: ChartNestedDataShape[] = []
): ChartInternalNestedDataShape[] {
  const result = buildBarStackData(data, 'expand');
  const sums = {};

  // Calculate the sum for each series and the total sum
  let totalSum = 0;
  for (const series of result) {
    const sum = series.data.reduce((acc, cur) => acc + (cur.y as number), 0);

    sums[series.key as string] = sum;
    totalSum += sum;
  }

  // Calculate the x0/x1 for each series
  let prev = 0;
  for (const series of result) {
    const x0 = prev;
    const x1 = prev + sums[series.key as string] / totalSum;
    prev = x1;

    for (const point of series.data) {
      point.x0 = x0;
      point.x1 = x1;
    }
  }

  return result;
}
