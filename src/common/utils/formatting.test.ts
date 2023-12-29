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

  it("check for dates and long formatted numbers", () => {

    const currDate = new Date();

    const datapoint = {
      x: currDate,
      y: 1000000
    };
    const result = getAriaLabel(datapoint);
    expect(result).toEqual(`${currDate.toString()}: 1,000,000`);
  });

  it("check for dates and long decimal numbers", () => {

    const currDate = new Date();

    const datapoint = {
      key: currDate,
      y: 9945.45235
    };
    const result = getAriaLabel(datapoint);
    // Only till the 3rd decimal place
    expect(result).toEqual(`${currDate.toString()}: 9,945.452`);
  });

  it("check for array data - should return comma separated values", () => {

    const datapoint = [
      {
        key: 'Visited',
        y: 100
      },
      {
        x: 'Clicked',
        data: 50
      },
      {
        x: 'Purchased',
        y: 5
      }
    ]
    const result = getAriaLabel(datapoint);
    // Only till the 3rd decimal place
    expect(result).toEqual('Visited: 100, Clicked: 50, Purchased: 5');
  });

  
});
