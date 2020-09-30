import { stack, stackOffsetExpand } from 'd3-shape';
import {
  ChartNestedDataShape,
  ChartInternalDataShape,
  ChartInternalNestedDataShape,
  ChartInternalShallowDataShape
} from './types';
import {
  getMaxBigIntegerForNested,
  normalizeValue,
  normalizeValueForFormatting
} from './bigInteger';
import { uniqueBy } from '../../common/utils/array';

/**
 * Given a dataset like:
 *
 *   [{
 *    key: 'Threat Intel',
 *    data: [{ key:'2011', data: 25 }]
 *   }]
 *
 * it will transform it to:
 *
 *  [
 *    { x: '2011', 'Theat Intel': 25 }
 *  ]
 */
function transformDataToStack(data) {
  const result: any[] = [];
  const maxBigInteger = getMaxBigIntegerForNested(data);

  for (const category of data) {
    for (const value of category.data) {
      let idx = result.findIndex((r) => {
        if (r.x instanceof Date && value.key instanceof Date) {
          return r.x.getTime() === value.key.getTime();
        }
        return r.x === value.key;
      });

      if (idx === -1) {
        result.push({
          x: value.key,
          formattedValues: {}
        });

        idx = result.length - 1;
      }

      result[idx][category.key as string] = normalizeValue(
        value.data,
        maxBigInteger
      );
      result[idx].formattedValues[
        category.key as string
      ] = normalizeValueForFormatting(value.data);
    }
  }

  return result;
}

/**
 * Translates the stack data to a chart standard dataset.
 */
function transformStackToData(stackData): ChartInternalNestedDataShape[] {
  const result: ChartInternalNestedDataShape[] = [];

  for (const category of stackData) {
    const series: ChartInternalShallowDataShape[] = [];

    for (const point of category) {
      const [y0, y1] = point;
      const x = point.data.x;
      series.push({
        key: category.key,
        x,
        x0: x,
        x1: x,
        y: y1 - y0,
        y0,
        y1,
        value: point.data.formattedValues[category.key]
      });
    }

    result.push({
      key: category.key,
      data: series
    });
  }

  return result;
}

/**
 * Builds a stack dataset from the standard data format.
 */
export function buildStackData(
  data: ChartNestedDataShape[],
  normalized = false
): ChartInternalDataShape[] {
  const keys = uniqueBy<ChartNestedDataShape>(data, (d) => d.key);
  const stackData = transformDataToStack(data);
  const stackFn = !normalized ? stack() : stack().offset(stackOffsetExpand);

  const result = stackFn.keys(keys)(stackData);

  return transformStackToData(result);
}
