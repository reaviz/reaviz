
import { layout, ICircle, IPoint } from '@upsetjs/venn.js';

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

export const DEG2RAD = (1 / 180) * Math.PI;

export function pointAtCircle(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + Math.cos(angle * DEG2RAD) * radius,
    y: cy + Math.sin(angle * DEG2RAD) * radius,
  };
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

export function eulerLayout(
  sets: readonly { sets: readonly string[]; size: number }[],
  bb: IBoundingBox
) {
  const r = layout(
    sets.map((s) => ({ sets: s.sets, size: s.size })),
    {
      width: bb.width,
      height: bb.height,
      distinct: true
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
      text: pointAtCircle(c.x + bb.x, c.y + bb.y, c.radius * 1.1, angle)
    };
  });

  const asArc = (a: IVennJSArc) => ({
    x2: a.p1.x + bb.x,
    y2: a.p1.y + bb.y,
    ref: setCircles.findIndex((d) => Math.abs(d.x - a.circle.x) < 0.05 && Math.abs(d.y - a.circle.y) < 0.05),
    sweep: true,
    large: a.width > a.circle.radius,
    mode: 'i' as 'i'
  });

  return r.map((d) => {
    const arcs = d.arcs;
    const text = {
      x: d.text.x + bb.x,
      y: d.text.y + bb.y
    };

    const subSets = d.data.sets.map((d) => setNames.indexOf(d));
    if (arcs.length === 0) {
      return {
        data: d.data,
        circles: [],
        sets: subSets,
        text,
        x1: 0,
        y1: 0,
        arcs: []
      };
    }

    if (arcs.length === 1) {
      const c = d.arcs[0].circle;
      return {
        sets: subSets,
        text,
        data: d.data,
        circles: [],
        x1: d.arcs[0].p2.x + bb.x,
        y1: c.y - c.radius + bb.y,
        arcs: [
          asArc(d.arcs[0]),
          Object.assign(asArc(d.arcs[0]), { y2: c.y - c.radius + bb.y })
        ],
        path: shiftPath(
          d.distinctPath || d.path,
          (x) => x + bb.x,
          (y) => y + bb.y
        )
      };
    }

    return {
      text,
      sets: subSets,
      data: d.data,
      circles: [],
      x1: d.arcs[0].p2.x + bb.x,
      y1: d.arcs[0].p2.y + bb.y,
      arcs: d.arcs.map((e) => asArc(e)),
      path: shiftPath(
        d.distinctPath || d.path,
        (x) => x + bb.x,
        (y) => y + bb.y
      )
    };
  });
}
