import { layout } from '@upsetjs/venn.js';

export interface IBoundingBox {
  width: number;
  height: number;
}

/**
 * Generate all combinations of a given array.
 * Reference: https://stackoverflow.com/questions/5752002/find-all-possible-subset-combos-in-an-array
 */
function combinations(array: string[]) {
  return (new Array(1 << array.length) as any)
    .fill()
    .map((_e1, i) => array.filter((_e2, j) => i & (1 << j)));
}

/**
 * Given a array set, lookup the data.
 */
function lookup(combo: string[], data: any[]) {
  const key = combo.sort().join('|');
  const found = data.find((d) => d.key === key);
  return { key, sets: combo, size: 1, value: found?.size };
}

/**
 * Generate the star euler layout.
 * Adapted from: https://github.com/upsetjs/chartjs-chart-venn
 */
export function starEulerLayout(data: any[], bb: IBoundingBox) {
  // Collect all unique sets and sort by size
  const uniqueSets = data
    .filter((d) => d.sets.length === 1)
    .sort((a, b) => b.size - a.size);

  // reshape the data key so they will match combos
  const keyedData = data.map((d) => ({
    ...d,
    key: d.sets.sort().join('|')
  }));

  // Map our unique sets and get len
  const uniqueSetKeys = uniqueSets.map((u) => u.key);

  // Build all combos and return 1+ combos
  const sets: any[] = combinations(uniqueSetKeys);
  const filteredSets = sets.slice(1, sets.length);

  // Sort the combos based on the unique set size
  const sortedSet = [];
  for (const name of uniqueSetKeys) {
    sortedSet.push(...filteredSets.filter((s) => s[0] === name));
  }

  // Sort the sorted set based on set len
  const resultSet = sortedSet.slice().sort((a, b) => a.length - b.length);

  const comboData = resultSet.map(r => lookup(r, keyedData))

  const layoutData = layout(comboData, {
    height: bb.height,
    width: bb.width,
    distinct: true
  });

  console.log('here', comboData, layoutData)

  return layoutData;
}
