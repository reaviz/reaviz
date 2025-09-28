type KeyItem = { key: string; key_url?: string };

const isKeyItem = (x: unknown): x is KeyItem =>
  typeof x === 'object' &&
  x !== null &&
  'key' in x &&
  typeof (x as any).key === 'string' &&
  ((x as any).key_url === undefined || typeof (x as any).key_url === 'string');

export const hasDataArray = (v: unknown): v is { data: unknown[] } =>
  typeof v === 'object' && v !== null && Array.isArray((v as any).data);

export const hasDataArrayWithKeyUrl = (v: unknown): v is { data: KeyItem[] } =>
  hasDataArray(v) && v.data.every(isKeyItem);
