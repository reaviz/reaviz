import { findBreakPoint } from './findBreakPoint';

describe('Top Left Section', () => {
  it('should find correct point, when |startY| < |endY| (flow: 1)', () => {
    const result = findBreakPoint([-8, -80], [-92, -134]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        -13.4,
        -134,
      ]
    `);
  });
});

describe('Bottom Left Section', () => {
  it('should find correct point, when startY < endY (flow: 1)', () => {
    const result = findBreakPoint([-8, 80], [-92, 92]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        -9.2,
        92,
      ]
    `);
  });

  it('should find correct point, when startY > endY (flow: 2)', () => {
    const result = findBreakPoint([-52, 62], [-92, 46]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        -78.2,
        62,
      ]
    `);
  });
});

describe('Top Right Section', () => {
  it('should find correct point, when |startY| < |endY| (flow: 1)', () => {
    const result = findBreakPoint([8, -80], [92, -92]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        9.2,
        -92,
      ]
    `);
  });

  it('should find correct point, when |startY| > |endY| (flow: 2)', () => {
    const result = findBreakPoint([51, -62], [92, -46]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        78.2,
        -62,
      ]
    `);
  });

  it('should find correct point, when startY and endY have different signs (flow: 2)', () => {
    const result = findBreakPoint([60, -8], [92, 14]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        78.2,
        -8,
      ]
    `);
  });
});

describe('Bottom Right Section', () => {
  it('should find correct point, when startY < endY (flow: 1)', () => {
    const result = findBreakPoint([60, 52], [92, 73]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        84.23076923076923,
        73,
      ]
    `);
  });
});

describe('Constraints', () => {
  it('should set breakPoint = startPoint if not enough free space', () => {
    const result = findBreakPoint([23, -77], [92, -77]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        23,
        -77,
      ]
    `);
  });

  it('should set breakPoint = endPoint if not enough free space', () => {
    const result = findBreakPoint([80, 8], [92, 28]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        92,
        28,
      ]
    `);
  });
});
