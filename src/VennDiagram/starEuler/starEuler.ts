import venn0 from './venn0.json';
import venn1 from './venn1.json';
import venn2 from './venn2.json';
import venn3 from './venn3.json';
import venn4 from './venn4.json';
import venn5 from './venn5.json';

export interface IBoundingBox {
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
  return (new Array(1 << array.length) as any).fill().map(
    (_e1, i) => array.filter((e2, j) => i & 1 << j));
}

/**
 * Given a array set, lookup the data.
 */
function lookup(combo: string[], data: any[]) {
  const key = combo.join('|')
  const found = data.find(d => d.key === key);
  return found || { key, sets: ['NA'], size: 0 }
}

/**
 * Generate the arc slice path.
 * Reference: https://github.com/upsetjs/chartjs-chart-venn/blob/master/src/model/generate.ts#L4
 */
export function generateArcSlicePath(
  s: any,
  refs: any[],
  p = 0
) {
  if (s.path) {
    return s.path;
  }

  return `M ${s.x1 - p},${s.y1 - p} ${s.arcs
    .map(arc => {
      const ref = refs[arc.ref];
      const rx = isEllipse(ref) ? ref.rx : ref.r;
      const ry = isEllipse(ref) ? ref.ry : ref.r;
      const rot = isEllipse(ref) ? ref.rotation : 0;
      return `A ${rx - p} ${ry - p} ${rot} ${arc.large ? 1 : 0} ${arc.sweep ? 1 : 0} ${arc.x2 - p} ${arc.y2 - p}`;
    })
    .join(' ')}`;
}

/**
 * Generate the star euler layout.
 * Adapted from: https://github.com/upsetjs/chartjs-chart-venn
 */
export function starEulerLayout(data: any[], bb: IBoundingBox) {
  const uniqueSets = data.filter(d => d.sets.length === 1);
  const setCount = uniqueSets.length;

  const shape = shapes[Math.min(shapes.length - 1, setCount)];
  const f = Math.min(bb.width / shape.bb.width, bb.height / shape.bb.height);
  const x = f * -shape.bb.x + (bb.width - f * shape.bb.width) / 2 + 0;
  const y = f * -shape.bb.y + (bb.height - f * shape.bb.height) / 2 + 0;
  const mx = (v: number) => x + f * v;
  const my = (v: number) => y + f * v;

  const sets = combinations(uniqueSets.map(u => u.key))
    .sort((a, b) => uniqueSets.indexOf(a[0]) - uniqueSets.indexOf(b[0]))
    .sort((a, b) => a.length - b.length);

  const setCombos = sets.splice(1, sets.length);

  const dataSets = shape.sets.map(c => ({
    ...c,
    ...{
      cx: mx(c.cx),
      cy: my(c.cy),
      text: {
        x: mx(c.text.x),
        y: my(c.text.y),
      },
    },
    ...(isEllipse(c)
      ? {
          rx: c.rx * f,
          ry: c.ry * f,
        }
      : {
          r: c.r * f,
        }
    )
  }));

  const intersections = shape.intersections.map((c, i) => ({
    text: {
      x: mx(c.text.x),
      y: my(c.text.y),
    },
    x1: mx(c.x1),
    y1: my(c.y1),
    sets: dataSets,
    data: lookup(setCombos[i], data),
    arcs: c.arcs.map(a => ({
      ...a,
      x2: mx(a.x2),
      y2: my(a.y2)
    }))
  }));

  return intersections.map(i => ({
    ...i,
    path: generateArcSlicePath(i, i.sets)
  }));
}
