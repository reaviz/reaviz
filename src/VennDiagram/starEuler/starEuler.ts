import venn0 from './venn0.json';
import venn1 from './venn1.json';
import venn2 from './venn2.json';
import venn3 from './venn3.json';
import venn4 from './venn4.json';
import venn5 from './venn5.json';

export interface BoundingBox {
  width: number;
  height: number;
}

const shapes = [venn0, venn1, venn2, venn3, venn4, venn5];

function isEllipse(d) {
  return typeof d.rx === 'number';
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
  const size = found?.size || 0;
  return { key, sets: combo, size: size, value: size };
}

/**
 * Build the data combinations for the layout.
 */
function buildData(data: any[]) {
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

  // Get the unique sets count
  const setCount = uniqueSets.length;

  return {
    uniqueCount: setCount,
    data: resultSet.map(r => lookup(r, keyedData))
  };
}

/**
 * Generate the arc slice path.
 * Reference: https://github.com/upsetjs/chartjs-chart-venn/blob/master/src/model/generate.ts#L4
 */
export function generateArcSlicePath(s: any, refs: any[]) {
  return `M ${s.x1},${s.y1} ${s.arcs
    .map((arc) => {
      const ref = refs[arc.ref];
      const rx = isEllipse(ref) ? ref.rx : ref.r;
      const ry = isEllipse(ref) ? ref.ry : ref.r;
      const rot = isEllipse(ref) ? ref.rotation : 0;
      return `A ${rx} ${ry} ${rot} ${arc.large ? 1 : 0} ${
        arc.sweep ? 1 : 0
      } ${arc.x2} ${arc.y2}`;
    })
    .join(' ')}`;
}

/**
 * Build the layout for the given chart.
 * Reference: https://github.com/upsetjs/chartjs-chart-venn/blob/master/src/model/generate.ts#L4
 */
function buildLayout({ data, uniqueCount }, box: BoundingBox) {
  const shape = shapes[Math.min(shapes.length - 1, uniqueCount)];
  const f = Math.min(box.width / shape.bb.width, box.height / shape.bb.height);
  const x = f * -shape.bb.x + (box.width - f * shape.bb.width) / 2 + 0;
  const y = f * -shape.bb.y + (box.height - f * shape.bb.height) / 2 + 0;
  const mx = (v: number) => x + f * v;
  const my = (v: number) => y + f * v;

  const shapeSets = shape.sets.map((c) => ({
    ...c,
    ...{
      cx: mx(c.cx),
      cy: my(c.cy),
      text: {
        x: mx(c.text.x),
        y: my(c.text.y)
      }
    },
    ...(isEllipse(c)
      ? {
          rx: c.rx * f,
          ry: c.ry * f
        }
      : {
          r: c.r * f
        })
  }));

  const intersections = shape.intersections.map((c, i) => ({
    text: {
      x: mx(c.text.x),
      y: my(c.text.y)
    },
    x1: mx(c.x1),
    y1: my(c.y1),
    data: data[i],
    arcs: c.arcs.map((a) => ({
      ...a,
      x2: mx(a.x2),
      y2: my(a.y2)
    }))
  }));

  return intersections.map((i) => ({
    ...i,
    path: generateArcSlicePath(i, shapeSets)
  }));
}

/**
 * Generate the star euler layout.
 * Adapted from: https://github.com/upsetjs/chartjs-chart-venn
 */
export function starEulerLayout(data: any[], bb: BoundingBox) {
  return buildLayout(buildData(data), bb);
}
