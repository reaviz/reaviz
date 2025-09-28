import { describe, it, expect } from 'vitest';
import { buildUrlMap } from './buildUrlMap';

const data = [
  { key: 'A', data: 10, key_url: 'https://a.com' },
  { key: 'B', data: 20 } // no url
];

const nestedData = [
  {
    key: '2024',
    data: [
      { key: 'A', data: 1, key_url: 'https://a.com' },
      { key: 'B', data: 2 } // no url
    ]
  },
  {
    key: '2025',
    data: [{ key: 'C', data: 3, key_url: 'https://c.com' }]
  }
];

describe('buildUrlMap', () => {
  it('maps single-series data with key_url', () => {
    const map = buildUrlMap(data, false);

    expect(map.get('A')).toBe('https://a.com');
    expect(map.get('B')).toBeUndefined();
  });
  it('maps grouped/nested series with key_url', () => {
    const map = buildUrlMap(nestedData, true);
    expect(map.get('A')).toBe('https://a.com');
    expect(map.get('B')).toBeUndefined();
    expect(map.get('C')).toBe('https://c.com');
  });
  it('returns empty map when no key_url values are present', () => {
    const data = [
      { key: 'A', data: 10 },
      { key: 'B', data: 20 }
    ];
    const map = buildUrlMap(data, false);
    expect(map.size).toBe(0);
    expect(map.get('A')).toBeUndefined();
    expect(map.get('B')).toBeUndefined();
  });
  it('handles mixed grouped data safely', () => {
    const nested = [
      { key: '2024', data: [] },
      { key: '2025' },
      {
        key: '2026',
        data: [{ key: 'X', data: 1, key_url: 'https://example.com' }]
      }
    ];
    const map = buildUrlMap(nested, true);
    expect(map.get('X')).toBe('https://example.com');
    expect(map.size).toBe(1);
  });
});
