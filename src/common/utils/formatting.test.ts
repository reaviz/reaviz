import { getAriaLabel } from "./formatting";

describe('getAriaLabel', () => {
  it("should return 'key' and 'data' values in aria label", () => {

    const datapoint = {
      key: 'JSON',
      data: 25
    };
    const result = getAriaLabel(datapoint);
    expect(result).toEqual('JSON: 25');
  });

  it("should return 'x' and 'y' values in aria label", () => {

    const datapoint = {
      x: 'Windows -> Win7',
      y: 75
    };
    const result = getAriaLabel(datapoint);
    expect(result).toEqual('Windows -> Win7: 75');
  });

  
});
