import { hasDataArray, hasDataArrayWithKeyUrl } from './hasDataArray';

export function buildUrlMap(data: any[], isMultiSeries = false) {
  const map = new Map();

  if (!data) return map;
  if (!Array.isArray(data)) return map;

  if (isMultiSeries) {
    for (const d of data) {
      if (hasDataArrayWithKeyUrl(d)) {
        for (const { key, key_url } of d.data) {
          if (key_url) map.set(key, key_url);
        }
      }
    }
  } else {
    for (const { key, key_url } of data) {
      if (key_url) map.set(key, key_url);
    }
  }

  return map;
}
