import { ChartDataTypes } from '../../types';

export const areaSingleSeriesSimpleData = [
  { id: '0', key: new Date('2020-02-01T00:00:00.000Z'), data: 12 },
  { id: '1', key: new Date('2020-02-02T00:00:00.000Z'), data: 10 },
  { id: '2', key: new Date('2020-02-03T00:00:00.000Z'), data: 10.5 },
  { id: '3', key: new Date('2020-02-04T00:00:00.000Z'), data: 8.5 },
  { id: '4', key: new Date('2020-02-05T00:00:00.000Z'), data: 2 },
  { id: '5', key: new Date('2020-02-06T00:00:00.000Z'), data: 5 },
  { id: '6', key: new Date('2020-02-07T00:00:00.000Z'), data: 5 },
  { id: '7', key: new Date('2020-02-08T00:00:00.000Z'), data: 8 },
  { id: '8', key: new Date('2020-02-09T00:00:00.000Z'), data: 6 },
  { id: '9', key: new Date('2020-02-10T00:00:00.000Z'), data: 7 },
  { id: '10', key: new Date('2020-02-11T00:00:00.000Z'), data: 10 },
  { id: '11', key: new Date('2020-02-12T00:00:00.000Z'), data: 10 },
  { id: '12', key: new Date('2020-02-13T00:00:00.000Z'), data: 12 }
];

export const areaSingleSeriesNonZeroData = [
  {
    key: new Date('2020-02-17T08:00:00.000Z'),
    data: [5, 10] as [ChartDataTypes, ChartDataTypes]
  },
  {
    key: new Date('2020-02-21T08:00:00.000Z'),
    data: [8, 14] as [ChartDataTypes, ChartDataTypes]
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: [5, 6] as [ChartDataTypes, ChartDataTypes]
  },
  {
    key: new Date('2020-02-29T08:00:00.000Z'),
    data: [10, 18] as [ChartDataTypes, ChartDataTypes]
  }
];

export const areaCircleSeriesV1Data = [
  { id: '0', key: new Date('2020-02-01T00:00:00.000Z'), data: 8 },
  { id: '1', key: new Date('2020-02-02T00:00:00.000Z'), data: 9 },
  { id: '2', key: new Date('2020-02-03T00:00:00.000Z'), data: 6.3 },
  { id: '3', key: new Date('2020-02-04T00:00:00.000Z'), data: 6.5 },
  { id: '4', key: new Date('2020-02-05T00:00:00.000Z'), data: 5.7 },
  { id: '5', key: new Date('2020-02-06T00:00:00.000Z'), data: 8 },
  { id: '6', key: new Date('2020-02-07T00:00:00.000Z'), data: 8.3 },
  { id: '7', key: new Date('2020-02-08T00:00:00.000Z'), data: 11 },
  { id: '8', key: new Date('2020-02-09T00:00:00.000Z'), data: 10.3 },
  { id: '9', key: new Date('2020-02-11T00:00:00.000Z'), data: 14 },
  { id: '10', key: new Date('2020-02-12T00:00:00.000Z'), data: 13.8 },
  { id: '11', key: new Date('2020-02-13T00:00:00.000Z'), data: 16 }
];

export const areaCircleSeriesV2Data = [
  { id: '0', key: new Date('2020-02-01T00:00:00.000Z'), data: 12.3 },
  { id: '1', key: new Date('2020-02-02T00:00:00.000Z'), data: 9.8 },
  { id: '2', key: new Date('2020-02-03T00:00:00.000Z'), data: 10.5 },
  { id: '3', key: new Date('2020-02-04T00:00:00.000Z'), data: 9 },
  { id: '4', key: new Date('2020-02-06T00:00:00.000Z'), data: 9.8 },
  { id: '5', key: new Date('2020-02-08T00:00:00.000Z'), data: 7.8 },
  { id: '6', key: new Date('2020-02-09T12:00:00.000Z'), data: 9 },
  { id: '7', key: new Date('2020-02-11T04:00:00.000Z'), data: 8 },
  { id: '8', key: new Date('2020-02-12T08:00:00.000Z'), data: 9.8 },
  { id: '9', key: new Date('2020-02-13T08:00:00.000Z'), data: 14 },
  { id: '10', key: new Date('2020-02-14T08:00:00.000Z'), data: 14.4 }
];

export const areaCircleSeriesV3Data = [
  { id: '0', key: new Date('2020-02-01T00:00:00.000Z'), data: 16.4 },
  { id: '1', key: new Date('2020-02-02T00:00:00.000Z'), data: 15.2 },
  { id: '2', key: new Date('2020-02-03T00:00:00.000Z'), data: 15.2 },
  { id: '3', key: new Date('2020-02-04T00:00:00.000Z'), data: 14 },
  { id: '4', key: new Date('2020-02-05T00:00:00.000Z'), data: 14 },
  { id: '5', key: new Date('2020-02-06T00:00:00.000Z'), data: 11.5 },
  { id: '6', key: new Date('2020-02-07T00:00:00.000Z'), data: 11.8 },
  { id: '7', key: new Date('2020-02-08T00:00:00.000Z'), data: 10 },
  { id: '8', key: new Date('2020-02-09T00:00:00.000Z'), data: 9.8 },
  { id: '9', key: new Date('2020-02-10T00:00:00.000Z'), data: 8.3 },
  { id: '10', key: new Date('2020-02-11T00:00:00.000Z'), data: 8.3 },
  { id: '11', key: new Date('2020-02-12T00:00:00.000Z'), data: 7 },
  { id: '12', key: new Date('2020-02-13T00:00:00.000Z'), data: 6.5 }
];

export const areaSingleSeriesInterpolationSmoothData = [
  { id: '0', key: new Date('2020-02-01T00:00:00.000Z'), data: 13 },
  { id: '1', key: new Date('2020-02-03T00:00:00.000Z'), data: 6 },
  { id: '2', key: new Date('2020-02-05T12:00:00.000Z'), data: 11 },
  { id: '3', key: new Date('2020-02-08T00:00:00.000Z'), data: 8 },
  { id: '4', key: new Date('2020-02-10T00:00:00.000Z'), data: 14 },
  { id: '5', key: new Date('2020-02-12T00:00:00.000Z'), data: 10 },
  { id: '6', key: new Date('2020-02-14T00:00:00.000Z'), data: 14 },
  { id: '7', key: new Date('2020-02-14T12:00:00.000Z'), data: 13.8 },
  { id: '8', key: new Date('2020-02-15T00:00:00.000Z'), data: 16 }
];

export const areaSingleSeriesInterpolationStepData = [
  { id: '0', key: new Date('2020-02-01T00:00:00.000Z'), data: 15.5 },
  { id: '1', key: new Date('2020-02-03T00:00:00.000Z'), data: 10 },
  { id: '2', key: new Date('2020-02-05T00:00:00.000Z'), data: 6 },
  { id: '3', key: new Date('2020-02-07T00:00:00.000Z'), data: 11.5 },
  { id: '4', key: new Date('2020-02-10T00:00:00.000Z'), data: 14.7 },
  { id: '5', key: new Date('2020-02-12T00:00:00.000Z'), data: 10 },
  { id: '6', key: new Date('2020-02-14T00:00:00.000Z'), data: 13.2 },
  { id: '7', key: new Date('2020-02-14T12:00:00.000Z'), data: 10.8 }
];

export const areaGridlineAllData = [
  { id: '0', key: new Date('2020-02-01T00:00:00.000Z'), data: 6.5 },
  { id: '1', key: new Date('2020-02-02T00:00:00.000Z'), data: 8 },
  { id: '2', key: new Date('2020-02-03T00:00:00.000Z'), data: 5 },
  { id: '3', key: new Date('2020-02-04T00:00:00.000Z'), data: 5.3 },
  { id: '4', key: new Date('2020-02-05T00:00:00.000Z'), data: 3.7 },
  { id: '5', key: new Date('2020-02-06T00:00:00.000Z'), data: 7 },
  { id: '6', key: new Date('2020-02-07T00:00:00.000Z'), data: 7.3 },
  { id: '7', key: new Date('2020-02-08T00:00:00.000Z'), data: 10.3 },
  { id: '8', key: new Date('2020-02-09T00:00:00.000Z'), data: 9.7 },
  { id: '9', key: new Date('2020-02-10T00:00:00.000Z'), data: 13.8 },
  { id: '10', key: new Date('2020-02-11T00:00:00.000Z'), data: 13 },
  { id: '11', key: new Date('2020-02-12T00:00:00.000Z'), data: 16 }
];

export const areaGridlineXData = areaGridlineAllData;

export const areaGridlineYData = areaGridlineAllData;

export const areaCircleSeriesShapesData = areaCircleSeriesV1Data;

export const areaLeftRightAxisData = areaSingleSeriesSimpleData;

export const areaTopBottomAxisData = areaSingleSeriesSimpleData;
