import { ChartShallowDataShape } from './types';
import { Direction, buildShallowChartData } from './builder';

export const buildWaterfall = (
  series: ChartShallowDataShape[],
  direction: Direction = 'vertical',
  binSize: number | undefined = undefined
) => {
  const data = buildShallowChartData(series, direction, binSize);
  const isVertical = direction === 'vertical';
  const v = isVertical ? 'y' : 'x';

  let cumulative = 0;
  for (const point of data) {
    point[`${v}0`] = cumulative;
    cumulative += point[v] as number;
    point[`${v}1`] = cumulative;
    point[v] = cumulative;
  }

  return data;
};
