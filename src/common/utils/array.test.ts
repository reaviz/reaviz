import { uniqueBy } from './array';

describe('Array', () => {
  it('should return shallow datas', () => {
    const arr = [{ key: 1 }, { key: 2 }];

    const uniqueArr = uniqueBy(arr, (d) => d.key);
    expect(uniqueArr.length).toEqual(2);
    expect(uniqueArr[0]).toEqual(1);
    expect(uniqueArr[1]).toEqual(2);
  });

  it('should return unique shallow datas', () => {
    const dupeArr = [{ key: 1 }, { key: 1 }, { key: 2 }];

    const uniqueArr = uniqueBy(dupeArr, (d) => d.key);
    expect(uniqueArr.length).toEqual(2);
    expect(uniqueArr[0]).toEqual(1);
    expect(uniqueArr[1]).toEqual(2);
  });
});
