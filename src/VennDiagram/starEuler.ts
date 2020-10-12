import { layout, ICircle, IPoint } from '@upsetjs/venn.js';
import venn0 from './data/venn0.json';
import venn1 from './data/venn1.json';
import venn2 from './data/venn2.json';
import venn3 from './data/venn3.json';
import venn4 from './data/venn4.json';
import venn5 from './data/venn5.json';

export interface IBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IVennJSArc {
  circle: { x: number; y: number; radius: number };
  width: number;
  p1: { x: number; y: number };
  p2: { x: number; y: number };
}

export function center(circles: readonly ICircle[]) {
  const sumX = circles.reduce((acc, a) => acc + a.x, 0);
  const sumY = circles.reduce((acc, a) => acc + a.y, 0);
  return {
    x: sumX / circles.length,
    y: sumY / circles.length,
  };
}

function shiftPath(path: string | undefined, x: (v: number) => number, y: (v: number) => number) {
  if (!path) {
    return path;
  }
  const mapX = (v: string) => x(Number.parseFloat(v)).toString();
  const mapY = (v: string) => y(Number.parseFloat(v)).toString();

  const transformedPath = path
    .split('\n')
    .map((line) => {
      const parts = line.trim().split(/[ ,]/);
      if (parts[0] === 'M') {
        return `${parts[0]} ${mapX(parts[1])} ${mapY(parts[2])}`;
      }
      if (parts[0] === 'A') {
        return `${parts.slice(0, 6).join(' ')} ${mapX(parts[6])} ${mapY(parts[7])}`;
      }
      return line;
    })
    .join('\n');
  return transformedPath;
}

function angleAtCircle(p: IPoint, c: IPoint) {
  const x = p.x - c.x;
  const y = p.y - c.y;
  return (Math.atan2(y, x) / Math.PI) * 180;
}

const DEG2RAD = (1 / 180) * Math.PI;

function pointAtCircle(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + Math.cos(angle * DEG2RAD) * radius,
    y: cy + Math.sin(angle * DEG2RAD) * radius,
  };
}

function isEllipse(d) {
  return typeof d.rx === 'number';
}

export function eulerLayout(
  sets: readonly { sets: readonly string[]; value: number }[],
  bb: IBoundingBox
) {
  const r = layout(
    sets.map((s) => ({ sets: s.sets, size: s.value })),
    {
      width: bb.width,
      height: bb.height,
      distinct: true,
    }
  );

  const singleSets = r.filter((d) => d.data.sets.length === 1);
  const setNames = singleSets.map((d) => d.data.sets[0]);
  const setCircles = singleSets.map((d) => d.circles[0]);
  const eulerCenter = center(singleSets.map((d) => d.circles[0]));

  const setData = singleSets.map((d) => {
    const c = d.circles[0];
    const angle = angleAtCircle(c, eulerCenter);
    return {
      cx: c.x + bb.x,
      cy: c.y + bb.y,
      r: c.radius,
      align: angle > 90 ? 'end' : 'start',
      verticalAlign: 'bottom',
      text: pointAtCircle(c.x + bb.x, c.y + bb.y, c.radius * 1.1, angle),
    };
  });

  const asArc = (a: IVennJSArc) => ({
    x2: a.p1.x + bb.x,
    y2: a.p1.y + bb.y,
    ref: setCircles.findIndex((d) => Math.abs(d.x - a.circle.x) < 0.05 && Math.abs(d.y - a.circle.y) < 0.05),
    sweep: true,
    large: a.width > a.circle.radius,
    mode: 'i' as 'i',
  });

  return {
    sets: setData,
    intersections: r.map((d) => {
      const arcs = d.arcs;
      const text = {
        x: d.text.x + bb.x,
        y: d.text.y + bb.y,
      };

      const subSets = d.data.sets.map((d) => setNames.indexOf(d));
      if (arcs.length === 0) {
        return {
          sets: subSets,
          text,
          x1: 0,
          y1: 0,
          arcs: [],
        };
      }

      if (arcs.length === 1) {
        const c = d.arcs[0].circle;
        return {
          sets: subSets,
          text,
          x1: d.arcs[0].p2.x + bb.x,
          y1: c.y - c.radius + bb.y,
          arcs: [asArc(d.arcs[0]), Object.assign(asArc(d.arcs[0]), { y2: c.y - c.radius + bb.y })],
          path: shiftPath(
            d.distinctPath || d.path,
            (x) => x + bb.x,
            (y) => y + bb.y
          ),
        };
      }

      return {
        text,
        sets: subSets,
        x1: d.arcs[0].p2.x + bb.x,
        y1: d.arcs[0].p2.y + bb.y,
        arcs: d.arcs.map((e) => asArc(e)),
        path: shiftPath(
          d.distinctPath || d.path,
          (x) => x + bb.x,
          (y) => y + bb.y
        ),
      };
    }),
  };
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
  const sets = data.filter(d => d.key.length === 1).length;

  const lookup = [venn0, venn1, venn2, venn3, venn4, venn5];
  const r = lookup[Math.min(lookup.length - 1, sets)];
  const f = Math.min(bb.width / r.bb.width, bb.height / r.bb.height);
  const x = f * -r.bb.x + (bb.width - f * r.bb.width) / 2 + bb.x;
  const y = f * -r.bb.y + (bb.height - f * r.bb.height) / 2 + bb.y;
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
    sets: dataSets, // c.sets,
    data: [], // data[i],
    arcs: c.arcs.map(a => ({
      ...a,
      x2: mx(a.x2),
      y2: my(a.y2)
    }))
  }));

  return {
    sets: dataSets,
    intersections: intersections.map(i => ({
      ...i,
      path: generateArcSlicePath(i, i.sets)
    }))
  };
}
