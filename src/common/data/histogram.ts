import { histogram } from 'd3-array';
import { ChartInternalShallowDataShape, ChartInternalDataTypes } from './types';

/**
 * Build a histogram given data set.
 */
export function buildBins(
  xScale,
  thresholds,
  data: any[]
): ChartInternalShallowDataShape[] {
  const layout = histogram()
    .value((d: any) => d.x)
    .domain(xScale.domain())
    .thresholds(xScale.ticks(thresholds));

  const bins = layout(data as any);

  return bins.map((bin) => ({
    x0: bin.x0 as ChartInternalDataTypes,
    x1: bin.x1 as ChartInternalDataTypes,
    y: bin.length,
    y0: 0,
    y1: bin.length
  }));
}
