import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import {
  getClosestBandScalePoint,
  getClosestContinousScalePoint
} from './position';
import { describe, test } from 'vitest';

describe('getClosestContinousScalePoint', () => {
  test('returns the closest point for an invertible/continous scale', ({
    expect
  }) => {
    const data = [{ x: 4 }, { x: 6 }];

    let scale = scaleLinear().rangeRound([0, 300]);
    scale = scale.domain([4, 6]);

    const result = getClosestContinousScalePoint(150, scale, data);

    expect(result).toEqual({ x: 6 });
  });

  test('returns the closest point rounded down for an invertible/continous scale', ({
    expect
  }) => {
    const data = [{ x: 4 }, { x: 6 }];

    let scale = scaleLinear().rangeRound([0, 300]);
    scale = scale.domain([4, 6]);

    const result = getClosestContinousScalePoint(150, scale, data, {
      roundDown: true
    });

    expect(result).toEqual({ x: 4 });
  });
});

describe('getClosestBandScalePoint', () => {
  test('returns the closest point for a band scale rounded down', ({
    expect
  }) => {
    const scale = scaleBand().rangeRound([0, 100]).domain(['a', 'b', 'c']);

    const data = [{ x: 'a' }, { x: 'b' }, { x: 'c' }];

    const result = getClosestBandScalePoint(32, scale, data);

    expect(result).toEqual({ x: 'a' });
  });

  test('returns the closest point for a band scale', ({ expect }) => {
    const scale = scaleBand().rangeRound([0, 100]).domain(['a', 'b', 'c']);

    const data = [{ x: 'a' }, { x: 'b' }, { x: 'c' }];

    const result = getClosestBandScalePoint(32, scale, data, {
      roundClosest: true
    });

    expect(result).toEqual({ x: 'b' });
  });
});
