/**
 * Hive layout
 * Original: https://github.com/d3/d3-plugins/tree/master/hive
 */
export function hiveLayout() {
  let source = (d) => d.source;
  let target = (d) => d.target;
  let angle: any = (d) => d.angle;
  let startRadius: any = (d) => d.radius;
  let endRadius = startRadius;
  const arcOffset = -Math.PI / 2;

  const link: any = (d, i) => {
    let s = node(source, this, d, i);
    let t = node(target, this, d, i);
    let x;

    if (t.a < s.a) {
      x = t;
      t = s;
      s = x;
    }

    if (t.a - s.a > Math.PI) {
      s.a += 2 * Math.PI;
    }

    const a1 = s.a + (t.a - s.a) / 3;
    const a2 = t.a - (t.a - s.a) / 3;

    return s.r0 - s.r1 || t.r0 - t.r1
      ? 'M' +
          Math.cos(s.a) * s.r0 +
          ',' +
          Math.sin(s.a) * s.r0 +
          'L' +
          Math.cos(s.a) * s.r1 +
          ',' +
          Math.sin(s.a) * s.r1 +
          'C' +
          Math.cos(a1) * s.r1 +
          ',' +
          Math.sin(a1) * s.r1 +
          ' ' +
          Math.cos(a2) * t.r1 +
          ',' +
          Math.sin(a2) * t.r1 +
          ' ' +
          Math.cos(t.a) * t.r1 +
          ',' +
          Math.sin(t.a) * t.r1 +
          'L' +
          Math.cos(t.a) * t.r0 +
          ',' +
          Math.sin(t.a) * t.r0 +
          'C' +
          Math.cos(a2) * t.r0 +
          ',' +
          Math.sin(a2) * t.r0 +
          ' ' +
          Math.cos(a1) * s.r0 +
          ',' +
          Math.sin(a1) * s.r0 +
          ' ' +
          Math.cos(s.a) * s.r0 +
          ',' +
          Math.sin(s.a) * s.r0
      : 'M' +
          Math.cos(s.a) * s.r0 +
          ',' +
          Math.sin(s.a) * s.r0 +
          'C' +
          Math.cos(a1) * s.r1 +
          ',' +
          Math.sin(a1) * s.r1 +
          ' ' +
          Math.cos(a2) * t.r1 +
          ',' +
          Math.sin(a2) * t.r1 +
          ' ' +
          Math.cos(t.a) * t.r1 +
          ',' +
          Math.sin(t.a) * t.r1;
  };

  const node = (method, thiz, d, i) => {
    const n = method.call(thiz, d, i);
    const a =
      +(typeof angle === 'function' ? angle.call(thiz, n, i) : angle) +
      arcOffset;
    const r0 = +(typeof startRadius === 'function'
      ? startRadius.call(thiz, n, i)
      : startRadius);
    const r1 =
      startRadius === endRadius
        ? r0
        : +(typeof endRadius === 'function'
          ? endRadius.call(thiz, n, i)
          : endRadius);
    return { r0, r1, a };
  };

  link.source = (s) => {
    if (!s) {
      return source;
    }
    source = s;
    return link;
  };

  link.target = (t) => {
    if (!t) {
      return target;
    }
    target = t;
    return link;
  };

  link.angle = (a) => {
    if (!a) {
      return angle;
    }
    angle = a;
    return link;
  };

  link.radius = (r) => {
    if (!r) {
      return startRadius;
    }
    startRadius = endRadius = r;
    return link;
  };

  link.startRadius = (r) => {
    if (!r) {
      return startRadius;
    }
    startRadius = r;
    return link;
  };

  link.endRadius = (r) => {
    if (!r) {
      return endRadius;
    }
    endRadius = r;
    return link;
  };

  return link;
}
