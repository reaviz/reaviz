import bigInt from 'big-integer';
import { bigIntegerToLocaleString } from '../../common/utils/bigint';
import {
  ChartDataTypes,
  ChartInternalDataTypes,
  ChartNestedDataShape,
  ChartShallowDataShape
} from './types';

export function normalizeValue(
  value: ChartDataTypes,
  maxBigInt: bigInt.BigInteger
): ChartInternalDataTypes {
  if (bigInt.isInstance(value)) {
    if (maxBigInt.greater(1000000)) {
      const divideBy = maxBigInt.divide(1000000);
      return (value as bigInt.BigInteger).divide(divideBy).toJSNumber();
    } else {
      return (value as bigInt.BigInteger).toJSNumber();
    }
  } else {
    return value as ChartInternalDataTypes;
  }
}

export function normalizeValueForFormatting(
  value: ChartDataTypes
): ChartInternalDataTypes {
  if (bigInt.isInstance(value)) {
    return bigIntegerToLocaleString(value as bigInt.BigInteger);
  }
  return value as ChartInternalDataTypes;
}

export function getMaxBigIntegerForNested(series: ChartNestedDataShape[]) {
  let maxBigInteger = bigInt.one;
  for (const group of series) {
    const maxBigIntegerForGroup = getMaxBigIntegerForShallow(group.data);
    if (maxBigIntegerForGroup.greater(maxBigInteger)) {
      maxBigInteger = maxBigIntegerForGroup;
    }
  }
  return maxBigInteger;
}

export function getMaxBigIntegerForShallow(series: ChartShallowDataShape[]) {
  let maxBigInteger = bigInt.one;
  for (const point of series) {
    if (bigInt.isInstance(point.data)) {
      const bigInteger = point.data as bigInt.BigInteger;
      if (bigInteger.greater(maxBigInteger)) {
        maxBigInteger = bigInteger;
      }
    }
  }
  return maxBigInteger;
}
