export const hasDataArray = (v: unknown): v is { data: unknown[] } =>
  typeof v === 'object' && v !== null && Array.isArray((v as any).data);

export const hasDataArrayWithKeyUrl = (
  v: unknown
): v is { data: { key_url?: string }[] } =>
  hasDataArray(v) &&
  v.data.some((item: unknown) => typeof item === 'object' && item !== null);
