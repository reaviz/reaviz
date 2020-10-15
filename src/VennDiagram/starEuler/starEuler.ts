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

function isEllipse(d) {
  return typeof d.rx === 'number';
}

export function generateArcSlicePath(
  s: any,
  refs: any[],
  p = 0
) {
  if (s.path) {
    return s.path;
  }
  return `M ${s.x1 - p},${s.y1 - p} ${s.arcs
    .map((arc) => {
      const ref = refs[arc.ref];
      const rx = isEllipse(ref) ? ref.rx : ref.r;
      const ry = isEllipse(ref) ? ref.ry : ref.r;
      const rot = isEllipse(ref) ? ref.rotation : 0;
      return `A ${rx - p} ${ry - p} ${rot} ${arc.large ? 1 : 0} ${arc.sweep ? 1 : 0} ${arc.x2 - p} ${arc.y2 - p}`;
    })
    .join(' ')}`;
}

export function starEulerLayout(data, bb: IBoundingBox) {
  const uniqueSets = data.filter(d => d.sets.length === 1);
  const setCount = uniqueSets.length;

  const lookup = [venn0, venn1, venn2, venn3, venn4, venn5];
  const r = lookup[Math.min(lookup.length - 1, setCount)];
  const f = Math.min(bb.width / r.bb.width, bb.height / r.bb.height);
  const x = f * -r.bb.x + (bb.width - f * r.bb.width) / 2 + 0;
  const y = f * -r.bb.y + (bb.height - f * r.bb.height) / 2 + 0;
  const mx = (v: number) => x + f * v;
  const my = (v: number) => y + f * v;

  const dataSets = r.sets.map(c => ({
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

  const intersections = r.intersections.map((c, i) => ({
    text: {
      x: mx(c.text.x),
      y: my(c.text.y),
    },
    x1: mx(c.x1),
    y1: my(c.y1),
    sets: dataSets,
    data: data[i] || { key: i, sets: ['NA'], size: 0 },
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
