export const hasDataArray = (v: unknown): v is { data: unknown[] } =>
  typeof v === 'object' && v !== null && Array.isArray((v as any).data);
