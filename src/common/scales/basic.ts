import { scaleLinear, scaleTime, scaleBand } from 'd3-scale';
import { getXDomain, getYDomain } from '../utils/domains';
import {
  ChartInternalShallowDataShape,
  ChartInternalNestedDataShape
} from '../data';
import { uniqueBy } from '../utils/array';

interface ScaleConfig {
  type: 'category' | 'value' | 'time' | 'duration';
  roundDomains?: boolean;
  data: any[];
  domain?: any[];
  padding?: number;
  scaled?: boolean;
  width?: number;
  height?: number;
  isMultiSeries?: boolean;
  isDiverging?: boolean;
}

/**
 * Gets the X Scale function.
 */
export function getXScale({
  type,
  roundDomains,
  data,
  width,
  domain,
  padding,
  scaled,
  isMultiSeries = false,
  isDiverging = false
}: ScaleConfig) {
  let scale;

  if (type === 'time' || type === 'duration' || type === 'value') {
    scale = type === 'time' ? scaleTime().rangeRound([0, width!]) : scaleLinear().rangeRound([0, width!]);

    scale = scale.domain(domain || getXDomain({ data, scaled, isDiverging }));
  } else {
    if (!domain) {
      domain = isMultiSeries ? uniqueBy<ChartInternalShallowDataShape>(data, (d) => d.key) : uniqueBy<ChartInternalShallowDataShape>(data, (d) => d.x);
    }

    scale = scaleBand()
      .rangeRound([0, width!])
      .padding(padding || 0)
      .domain(domain as ReadonlyArray<any>);
  }

  return roundDomains ? scale.nice() : scale;
}

/**
 * Gets the Y Scale function.
 */
export function getYScale({
  type,
  height,
  data,
  domain,
  roundDomains = false,
  scaled = false,
  padding = 0,
  isMultiSeries = false,
  isDiverging = false
}: ScaleConfig) {
  let scale;

  if (type === 'time' || type === 'value' || type === 'duration') {
    scale = scaleLinear()
      .range([height!, 0])
      .domain(domain || getYDomain({ data, scaled, isDiverging }));
  } else {
    if (!domain) {
      domain = isMultiSeries ? uniqueBy<ChartInternalNestedDataShape>(
          data as [],
          (d) => d.key
        ) : uniqueBy<ChartInternalShallowDataShape>(data, (d) => d.y);
    }

    scale = scaleBand()
      .rangeRound([height!, 0])
      .padding(padding)
      .domain(domain as ReadonlyArray<any>);
  }

  return roundDomains ? scale.nice() : scale;
}
