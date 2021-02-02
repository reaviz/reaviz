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

// Static shapes for rendering
const shapes = [venn0, venn1, venn2, venn3, venn4, venn5];

/**
 * Sort helper.
 * Reference: https://stackoverflow.com/a/64449554/1288340
 */
const upto = (limit) => Array.from({ length: limit }, (_, i) => i);

/**
 * Detect ellipse.
 * Reference: https://github.com/upsetjs/chartjs-chart-venn/blob/master/src/model/generate.ts#L4
 */
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
  const key = combo.join('|');
  const found = data.find((d) => d.key === key);

  return {
    key,
    sets: combo,
    size: found?.size || 0
  };
}

/**
 * Build the data combinations for the layout.
 */
function buildData(data: any[]) {
  // Collect all unique sets and sort by size
  const uniqueSets = data
    .filter((d) => d.sets.length === 1)
    .sort((a, b) => b.size - a.size);

  // Map our unique sets
  const uniqueSetKeys = uniqueSets.map((u) => u.key);

  // Build all combos and return 1+ combos
  const sets: any[] = combinations(uniqueSetKeys);
  const filteredSets = sets.slice(1, sets.length);

  // Sort the child sets based on the parent
  const result = filteredSets.map((d) =>
    [...d].sort((a, b) => uniqueSetKeys.indexOf(a) - uniqueSetKeys.indexOf(b))
  );

  // Sort the data based on index of keys and length
  // Reference: https://stackoverflow.com/a/64449554/1288340
  result.sort(
    (a, b) =>
      a.length - b.length ||
      upto(a.length).reduce(
        (diff, i) =>
          diff || uniqueSetKeys.indexOf(a[i]) - uniqueSetKeys.indexOf(b[i]),
        0
      )
  );

  // reshape the data key so they will match combos
  const keyedData = data.map((d) => {
    const sets = [...d.sets].sort(
      (a, b) => uniqueSetKeys.indexOf(a) - uniqueSetKeys.indexOf(b)
    );
    const key = sets.join('|');

    return {
      size: d.size,
      sets,
      key
    };
  });

  return {
    uniqueCount: uniqueSets.length,
    data: result.map((r) => lookup(r, keyedData))
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
      return `A ${rx} ${ry} ${rot} ${arc.large ? 1 : 0} ${arc.sweep ? 1 : 0} ${
        arc.x2
      } ${arc.y2}`;
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

  const shapeSets = shape.sets.map((c, i) => ({
    ...c,
    ...{
      data: data[i],
      cx: mx(c.cx),
      cy: my(c.cy),
      text: {
        x: mx(c.text.x),
        y: my(c.text.y)
      },
      ...(c.icon
        ? {
          icon: {
            x: mx(c.icon.x),
            y: my(c.icon.y)
          }
        }
        : {})
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
    set: shapeSets[i],
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
