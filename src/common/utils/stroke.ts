import { ChartInternalShallowDataShape } from '../data';

/**
 * Calculates whether the stroke should be shown.
 */
export function calculateShowStroke(
  current: ChartInternalShallowDataShape,
  data: ChartInternalShallowDataShape[]
) {
  const i = data.indexOf(current);
  let showLine = false;

  const prev = data[i - 1];
  if (i > 0 && prev.y) {
    showLine = true;
  }

  const cur = data[i];
  if (cur.y) {
    showLine = true;
  }

  const next = data[i + 1];
  if (i < data.length - 1 && next.y) {
    showLine = true;
  }

  return showLine;
}
