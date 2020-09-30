import { median } from 'd3-array';
import {
  ChartInternalNestedDataShape,
  ChartShallowDataShape,
  ChartNestedDataShape,
  ChartInternalShallowDataShape,
  ChartDataTypes
} from './types';
import {
  getMaxBigIntegerForNested,
  getMaxBigIntegerForShallow,
  normalizeValue,
  normalizeValueForFormatting
} from './bigInteger';
import bigInt from 'big-integer';

export type Direction = 'vertical' | 'horizontal';

/**
 * Accepts a `ChartDataShape` and transforms it to a chart readable data shape.
 *
 * Example:
 *
 *   [{
 *    key: 'Threat Intel',
 *    data: [{ key:'2011', data: 25 }]
 *   }]
 *
 * will be transformed to:
 *
 *  [{
 *    key: 'Threat Intel',
 *    data: [
 *      key: 'Threat Intel',
 *      x: '2011',
 *      y: 25
 *    ]
 *  }]
 */
export function buildNestedChartData(
  series: ChartNestedDataShape[],
  sort = false,
  direction: Direction = 'vertical'
): ChartInternalNestedDataShape[] {
  let result: ChartInternalNestedDataShape[] = [];
  const maxBigInteger = getMaxBigIntegerForNested(series);
  const isVertical = direction === 'vertical';

  for (const point of series) {
    for (const nestedPoint of point.data) {
      const key = normalizeValueForFormatting(point.key);
      let idx = result.findIndex((r) => {
        const left = r.key;
        if (left instanceof Date && key instanceof Date) {
          return left.getTime() === key.getTime();
        }
        return left === key;
      });

      if (idx === -1) {
        result.push({
          key,
          metadata: point.metadata,
          data: []
        });

        idx = result.length - 1;
      }

      const x = normalizeValue(
        isVertical ? nestedPoint.key : nestedPoint.data,
        maxBigInteger
      );

      const y = normalizeValue(
        isVertical ? nestedPoint.data : nestedPoint.key,
        maxBigInteger
      );

      result[idx].data.push({
        key,
        value: normalizeValueForFormatting(nestedPoint.data),
        metadata: nestedPoint.metadata,
        id: point.id,
        x,
        x0: isVertical ? x : 0,
        x1: x,
        y,
        y0: isVertical ? 0 : y,
        y1: y
      });
    }
  }

  // Sort the series data based on the median value
  if (sort) {
    result = result.sort((a, b) => {
      const aMax = median(a.data, (d: any) => d.y)!;
      const bMax = median(b.data, (d: any) => d.y)!;
      return aMax < bMax ? 1 : -1;
    });
  }

  return result;
}

function addToChartType(
  a: ChartDataTypes,
  b: number | bigInt.BigInteger
): ChartDataTypes {
  if (bigInt.isInstance(a) && bigInt.isInstance(b)) {
    return (a as bigInt.BigInteger).add(b as bigInt.BigInteger);
  } else if (a instanceof Date && typeof b === 'number') {
    return new Date(a.valueOf() + b);
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    throw new Error('Invalid types to addToChartTypes');
  }
}

/**
 * Accepts a shallow shape and normalizes it to a chart readable format.
 */
export function buildShallowChartData(
  series: ChartShallowDataShape[],
  direction: Direction = 'vertical',
  binSize: number | undefined = undefined
): ChartInternalShallowDataShape[] {
  const result: ChartInternalShallowDataShape[] = [];
  const maxBigInteger = getMaxBigIntegerForShallow(series);
  const isVertical = direction === 'vertical';

  for (const point of series) {
    const isTuple = Array.isArray(point.data);
    let k1 = point.key;
    if (binSize) {
      k1 = addToChartType(point.key, binSize);
    }

    const props = {
      k0: normalizeValue(point.key, maxBigInteger),
      k1: normalizeValue(k1, maxBigInteger),
      v0: normalizeValue(isTuple ? point.data[0] : 0, maxBigInteger),
      v1: normalizeValue(isTuple ? point.data[1] : point.data, maxBigInteger)
    };

    const xProp = isVertical ? 'k' : 'v';
    const yProp = isVertical ? 'v' : 'k';

    result.push({
      key: normalizeValueForFormatting(props.k0),
      value: normalizeValueForFormatting(props.v1),
      metadata: point.metadata,
      id: point.id,
      x: props[`${xProp}1`],
      x0: props[`${xProp}0`],
      x1: props[`${xProp}1`],
      y: props[`${yProp}1`],
      y0: props[`${yProp}0`],
      y1: props[`${yProp}1`]
    });
  }

  return result;
}
