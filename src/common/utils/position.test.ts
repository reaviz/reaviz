import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import {
  getClosestBandScalePoint,
  getClosestContinousScalePoint
} from './position';
import { describe, test } from 'vitest';

describe('getClosestContinousScalePoint', () => {
  const data = [{ x: 4 }, { x: 6 }];
  const scale = scaleLinear().rangeRound([0, 300]).domain([4, 6]);

  test('returns the closest point for an invertible/continous scale', ({
    expect
  }) => {
    const result = getClosestContinousScalePoint({ pos: 150, scale, data });

    expect(result).toEqual({ x: 6 });
  });

  test('returns the closest point rounded down for an invertible/continous scale', ({
    expect
  }) => {
    const result = getClosestContinousScalePoint({
      pos: 150,
      scale,
      data,
      roundDown: true
    });

    expect(result).toEqual({ x: 4 });
  });
});

describe('getClosestBandScalePoint', () => {
  const data = [{ x: 'a' }, { x: 'b' }, { x: 'c' }];
  const scale = scaleBand().rangeRound([0, 100]).domain(['a', 'b', 'c']);

  test('returns the closest point for a band scale rounded down', ({
    expect
  }) => {
    const result = getClosestBandScalePoint({ pos: 32, scale, data });

    expect(result).toEqual({ x: 'a' });
  });

  test('returns the closest point for a band scale', ({ expect }) => {
    const result = getClosestBandScalePoint({
      pos: 32,
      scale,
      data,
      roundClosest: true
    });

    expect(result).toEqual({ x: 'b' });
  });
});
