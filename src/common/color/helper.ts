import { scaleOrdinal } from 'd3-scale';
import { maxIndex } from 'd3-array';
import { schemes } from './schemes';

export type ColorSchemeType =
  | ((data, index: number, active?: any[]) => string)
  | string[]
  | string;

type ColorHelperProps = {
  colorScheme: ColorSchemeType;
  point: any;
  data: any[];
  index: number;
  active: any[];
  scale?: any;
  domain?: any[];
  key?: any;
  attribute?: string;
  isMultiSeries?: boolean;
};

/**
 * Given a point, get the key attributes for it.
 */
const rangeHelper = (point: any, attribute: string) =>
  point.map((r, i) => {
    if (r) {
      if (r[attribute] !== undefined) {
        return r[attribute];
      } else if (r.data && r.data[attribute] !== undefined) {
        return r.data[attribute];
      }
    }

    return i;
  });

/**
 * Get a color given a range.
 */
export const getColor = (props: Partial<ColorHelperProps>) => {
  let {
    point,
    colorScheme,
    attribute,
    index,
    data,
    active,
    isMultiSeries,
    domain,
    key,
    scale
  } = {
    attribute: 'key',
    isMultiSeries: false,
    scale: scaleOrdinal,
    ...props
  };

  if (typeof colorScheme === 'string' && schemes[colorScheme]) {
    colorScheme = schemes[colorScheme];
  }

  if (Array.isArray(colorScheme)) {
    if (!domain) {
      if (isMultiSeries && Array.isArray(data)) {
        const maxIdx = maxIndex(data, (d) => d.data.length);
        const maxVal = data[maxIdx];
        data = maxVal.data;
      }

      domain = rangeHelper(data, attribute);
    }

    key = key !== undefined ? key : point[attribute];

    return scale(colorScheme).domain(domain)(key);
  } else if (typeof colorScheme === 'function') {
    return colorScheme(point, index!, active);
  } else {
    return colorScheme;
  }
};
