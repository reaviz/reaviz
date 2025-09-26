import { LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS } from './LinearAxisTickSeries';
import { describe, it, expect } from 'vitest';

describe('LinearAxisTickSeries', () => {
  it('should have ellpsisLength default prop set to 18', () => {
    expect(LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS.ellpsisLength).toBe(18);
  });

  it('should include ellpsisLength in default props object', () => {
    expect(LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS).toHaveProperty(
      'ellpsisLength',
      18
    );
  });
});
