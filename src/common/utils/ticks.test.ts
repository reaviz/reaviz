import { getDurationTicks } from './ticks';

describe('getDurationTicks', () => {
  it('should return second ticks', () => {
    const result = getDurationTicks([0, 60], 7);
    expect(result).toEqual([0, 10, 20, 30, 40, 50, 60]);
  });

  it('should return hour ticks', () => {
    const result = getDurationTicks([0, 10000], 4);
    expect(result).toEqual([0, 3600, 7200]);
  });

  it('should return multi-day ticks', () => {
    const ONE_DAY = 60 * 60 * 24;
    const result = getDurationTicks([0, ONE_DAY * 10], 6);
    expect(result).toEqual([
      0,
      ONE_DAY * 2,
      ONE_DAY * 4,
      ONE_DAY * 6,
      ONE_DAY * 8,
      ONE_DAY * 10
    ]);
  });
});
