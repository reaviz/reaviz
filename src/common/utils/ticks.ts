import { TimeInterval } from 'd3-time';

const ONE_DAY = 60 * 60 * 24;
const DURATION_TICK_STEPS = [
  0.001, // 1 ms
  0.005, // 5 ms
  0.01, // 10 ms
  0.05, // 50 ms
  0.1, // 100 ms
  0.5, // 500 ms
  1, // 1 s
  5, // 5 s
  10, // 10 s
  15, // 15 s
  60, // 1 m
  60 * 15, // 15 m
  60 * 30, // 30 m
  60 * 60, // 1 h
  60 * 60 * 2, // 2 h
  60 * 60 * 4, // 4 h
  60 * 60 * 6, // 6 h
  60 * 60 * 8, // 8 h
  60 * 60 * 12, // 12 h
  ONE_DAY // 24 h
];

/**
 * Reduce the ticks to the max number of ticks.
 */
export function reduceTicks<T>(ticks: T[], maxTicks: number) {
  if (ticks.length > maxTicks) {
    const reduced: T[] = [];
    const modulus = Math.floor(ticks.length / maxTicks);

    for (let i = 0; i < ticks.length; i++) {
      if (i % modulus === 0) {
        reduced.push(ticks[i]);
      }
    }
    ticks = reduced;
  }

  return ticks;
}

/**
 * Determine the max ticks for the available width.
 */
export function getMaxTicks(size: number, dimension: number) {
  const tickWidth = Math.max(size, 0);
  return Math.floor(dimension / tickWidth);
}

/**
 * Formats the ticks in a duration format.
 */
export function getDurationTicks(domain, maxTicks) {
  const domainWidth = domain[1] - domain[0];
  let tickStep: number | null = null;
  for (const s of DURATION_TICK_STEPS) {
    if (domainWidth / s < maxTicks) {
      tickStep = s;
      break;
    }
  }

  if (tickStep === null) {
    const numDayTicks = domainWidth / ONE_DAY;
    const dayStep = Math.ceil(numDayTicks / maxTicks);
    tickStep = ONE_DAY * dayStep;
  }

  const ticks = [domain[0]];
  while (ticks[ticks.length - 1] + tickStep <= domain[1]) {
    ticks.push(ticks[ticks.length - 1] + tickStep);
  }

  return ticks;
}

/**
 * Get the tick values from the scale.
 */
export function getTicks(
  scale: any,
  tickValues: any[],
  type: 'value' | 'category' | 'time' | 'duration',
  maxTicks = 100,
  interval?: number | TimeInterval
) {
  let result;

  if (tickValues) {
    result = tickValues;
  } else {
    if (scale.ticks) {
      if (type === 'duration') {
        result = getDurationTicks(scale.domain(), maxTicks);
      } else if (interval) {
        result = scale.ticks(interval);
      } else {
        if (type === 'time') {
          // If its time, we need to handle the time count
          // manually because d3 does this odd rounding
          result = scale.ticks();
          result = reduceTicks(result, maxTicks);
        } else {
          result = scale.ticks(maxTicks);
        }
      }
    } else {
      tickValues = scale.domain();
      result = reduceTicks(tickValues, maxTicks);
    }
  }

  return result;
}
