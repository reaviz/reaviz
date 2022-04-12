import { stack, stackOffsetExpand, stackOffsetDiverging } from 'd3-shape';
import { ChartNestedDataShape, ChartInternalNestedDataShape } from './types';
import {
  getMaxBigIntegerForNested,
  normalizeValue,
  normalizeValueForFormatting
} from './bigInteger';
import { uniqueBy } from '../../common/utils/array';

export type StackTypes = 'default' | 'expand' | 'diverging';

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
 *    { x: 'Theat Intel', '2011': 25 }
 *  ]
 */
function transformDataToStack(data: ChartNestedDataShape[]) {
  const result: any[] = [];
  const maxBigInteger = getMaxBigIntegerForNested(data);

  for (const category of data) {
    for (const value of category.data) {
      let idx = result.findIndex((r) => {
        if (r.x instanceof Date && category.key instanceof Date) {
          return r.x.getTime() === category.key.getTime();
        }
        return r.x === category.key;
      });

      if (idx === -1) {
        result.push({
          metadata: category.metadata,
          x: category.key,
          formattedValues: {}
        });

        idx = result.length - 1;
      }

      result[idx].metadata = value.metadata;

      result[idx][value.key as string] = normalizeValue(
        value.data,
        maxBigInteger
      );

      result[idx].formattedValues[value.key as string] =
        normalizeValueForFormatting(value.data);
    }
  }

  return result;
}

/**
 * Translates the stack data to a chart standard dataset.
 */
function transformStackToData(
  stackData,
  direction = 'vertical'
): ChartInternalNestedDataShape[] {
  const result: ChartInternalNestedDataShape[] = [];
  const isVertical = direction === 'vertical';

  // Transform the data from the d3 stack format to our internal format
  for (const category of stackData) {
    for (const point of category) {
      const key = point.data.x;

      let idx = result.findIndex((r) => {
        if (r.key instanceof Date && key instanceof Date) {
          return r.key.getTime() === key.getTime();
        }
        return r.key === key;
      });

      if (idx === -1) {
        result.push({
          key,
          data: []
        });

        idx = result.length - 1;
      }

      const categoryKey = category.key;
      const y = point.data[categoryKey];
      const [y0, y1] = point;

      result[idx].data.push({
        metadata: point.data.metadata,
        key,
        x: isVertical ? categoryKey : y1,
        x0: isVertical ? categoryKey : y0,
        x1: isVertical ? categoryKey : y1,
        y: isVertical ? y : categoryKey,
        y0: isVertical ? y0 : categoryKey,
        y1: isVertical ? y1 : categoryKey,
        value: point.data.formattedValues[categoryKey]
      });
    }
  }

  return result;
}

/**
 * Builds a stack dataset from the standard data format.
 */
export function buildBarStackData(
  data: ChartNestedDataShape[] = [],
  offset: StackTypes = 'default',
  direction = 'vertical'
) {
  const keys = uniqueBy<ChartNestedDataShape>(
    data,
    (d) => d.data,
    (d) => d.key
  );
  const stackData = transformDataToStack(data);

  let stackFn = stack();
  if (offset === 'expand') {
    stackFn = stackFn.offset(stackOffsetExpand);
  } else if (offset === 'diverging') {
    stackFn = stackFn.offset(stackOffsetDiverging);
  }

  const result = stackFn.keys(keys)(stackData);

  return transformStackToData(result, direction);
}
