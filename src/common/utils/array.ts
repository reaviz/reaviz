type AccessorCallback = (data: any) => any;

/**
 * Given a dataset and a list of accessors, returns a unique collection.
 */
export function uniqueBy<T = any>(data: T[], ...accessors: AccessorCallback[]) {
  const result: any[] = [];

  const ittr = (arr: T[], depth: number) => {
    for (const a of arr) {
      const acc = accessors[depth];
      if (acc === undefined) {
        throw new Error(`Accessor not found for depth: ${depth}`);
      }

      const val = acc(a);
      if (Array.isArray(val)) {
        ittr(val, depth + 1);
      } else if (!result.includes(val)) {
        result.push(val);
      }
    }
  };

  ittr(data, 0);

  return result;
}
