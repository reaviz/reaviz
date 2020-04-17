import bigInt from 'big-integer';
import { range } from 'd3-array';
import { generateDate, randomNumber } from './utils';

export const generateData = (count, minVal = 1, maxVal = 50) =>
  range(count)
    .map(i => ({
      id: (i + 1).toString(),
      key: generateDate(i),
      data: randomNumber(minVal, maxVal)
    }))
    .reverse();

// generateData(100);
export const largeDateData = [
  {
    id: '100',
    key: new Date('2019-11-24T08:00:00.000Z'),
    data: 39
  },
  {
    id: '99',
    key: new Date('2019-11-25T08:00:00.000Z'),
    data: 5
  },
  {
    id: '98',
    key: new Date('2019-11-26T08:00:00.000Z'),
    data: 12
  },
  {
    id: '97',
    key: new Date('2019-11-27T08:00:00.000Z'),
    data: 39
  },
  {
    id: '96',
    key: new Date('2019-11-28T08:00:00.000Z'),
    data: 17
  },
  {
    id: '95',
    key: new Date('2019-11-29T08:00:00.000Z'),
    data: 22
  },
  {
    id: '94',
    key: new Date('2019-11-30T08:00:00.000Z'),
    data: 12
  },
  {
    id: '93',
    key: new Date('2019-12-01T08:00:00.000Z'),
    data: 43
  },
  {
    id: '92',
    key: new Date('2019-12-02T08:00:00.000Z'),
    data: 40
  },
  {
    id: '91',
    key: new Date('2019-12-03T08:00:00.000Z'),
    data: 47
  },
  {
    id: '90',
    key: new Date('2019-12-04T08:00:00.000Z'),
    data: 15
  },
  {
    id: '89',
    key: new Date('2019-12-05T08:00:00.000Z'),
    data: 31
  },
  {
    id: '88',
    key: new Date('2019-12-06T08:00:00.000Z'),
    data: 42
  },
  {
    id: '87',
    key: new Date('2019-12-07T08:00:00.000Z'),
    data: 37
  },
  {
    id: '86',
    key: new Date('2019-12-08T08:00:00.000Z'),
    data: 4
  },
  {
    id: '85',
    key: new Date('2019-12-09T08:00:00.000Z'),
    data: 38
  },
  {
    id: '84',
    key: new Date('2019-12-10T08:00:00.000Z'),
    data: 32
  },
  {
    id: '83',
    key: new Date('2019-12-11T08:00:00.000Z'),
    data: 27
  },
  {
    id: '82',
    key: new Date('2019-12-12T08:00:00.000Z'),
    data: 22
  },
  {
    id: '81',
    key: new Date('2019-12-13T08:00:00.000Z'),
    data: 45
  },
  {
    id: '80',
    key: new Date('2019-12-14T08:00:00.000Z'),
    data: 42
  },
  {
    id: '79',
    key: new Date('2019-12-15T08:00:00.000Z'),
    data: 36
  },
  {
    id: '78',
    key: new Date('2019-12-16T08:00:00.000Z'),
    data: 20
  },
  {
    id: '77',
    key: new Date('2019-12-17T08:00:00.000Z'),
    data: 34
  },
  {
    id: '76',
    key: new Date('2019-12-18T08:00:00.000Z'),
    data: 24
  },
  {
    id: '75',
    key: new Date('2019-12-19T08:00:00.000Z'),
    data: 42
  },
  {
    id: '74',
    key: new Date('2019-12-20T08:00:00.000Z'),
    data: 23
  },
  {
    id: '73',
    key: new Date('2019-12-21T08:00:00.000Z'),
    data: 49
  },
  {
    id: '72',
    key: new Date('2019-12-22T08:00:00.000Z'),
    data: 12
  },
  {
    id: '71',
    key: new Date('2019-12-23T08:00:00.000Z'),
    data: 29
  },
  {
    id: '70',
    key: new Date('2019-12-24T08:00:00.000Z'),
    data: 1
  },
  {
    id: '69',
    key: new Date('2019-12-25T08:00:00.000Z'),
    data: 42
  },
  {
    id: '68',
    key: new Date('2019-12-26T08:00:00.000Z'),
    data: 24
  },
  {
    id: '67',
    key: new Date('2019-12-27T08:00:00.000Z'),
    data: 40
  },
  {
    id: '66',
    key: new Date('2019-12-28T08:00:00.000Z'),
    data: 41
  },
  {
    id: '65',
    key: new Date('2019-12-29T08:00:00.000Z'),
    data: 39
  },
  {
    id: '64',
    key: new Date('2019-12-30T08:00:00.000Z'),
    data: 2
  },
  {
    id: '63',
    key: new Date('2019-12-31T08:00:00.000Z'),
    data: 3
  },
  {
    id: '62',
    key: new Date('2020-01-01T08:00:00.000Z'),
    data: 23
  },
  {
    id: '61',
    key: new Date('2020-01-02T08:00:00.000Z'),
    data: 31
  },
  {
    id: '60',
    key: new Date('2020-01-03T08:00:00.000Z'),
    data: 46
  },
  {
    id: '59',
    key: new Date('2020-01-04T08:00:00.000Z'),
    data: 16
  },
  {
    id: '58',
    key: new Date('2020-01-05T08:00:00.000Z'),
    data: 30
  },
  {
    id: '57',
    key: new Date('2020-01-06T08:00:00.000Z'),
    data: 23
  },
  {
    id: '56',
    key: new Date('2020-01-07T08:00:00.000Z'),
    data: 18
  },
  {
    id: '55',
    key: new Date('2020-01-08T08:00:00.000Z'),
    data: 14
  },
  {
    id: '54',
    key: new Date('2020-01-09T08:00:00.000Z'),
    data: 43
  },
  {
    id: '53',
    key: new Date('2020-01-10T08:00:00.000Z'),
    data: 4
  },
  {
    id: '52',
    key: new Date('2020-01-11T08:00:00.000Z'),
    data: 20
  },
  {
    id: '51',
    key: new Date('2020-01-12T08:00:00.000Z'),
    data: 23
  },
  {
    id: '50',
    key: new Date('2020-01-13T08:00:00.000Z'),
    data: 25
  },
  {
    id: '49',
    key: new Date('2020-01-14T08:00:00.000Z'),
    data: 24
  },
  {
    id: '48',
    key: new Date('2020-01-15T08:00:00.000Z'),
    data: 6
  },
  {
    id: '47',
    key: new Date('2020-01-16T08:00:00.000Z'),
    data: 41
  },
  {
    id: '46',
    key: new Date('2020-01-17T08:00:00.000Z'),
    data: 10
  },
  {
    id: '45',
    key: new Date('2020-01-18T08:00:00.000Z'),
    data: 39
  },
  {
    id: '44',
    key: new Date('2020-01-19T08:00:00.000Z'),
    data: 48
  },
  {
    id: '43',
    key: new Date('2020-01-20T08:00:00.000Z'),
    data: 45
  },
  {
    id: '42',
    key: new Date('2020-01-21T08:00:00.000Z'),
    data: 29
  },
  {
    id: '41',
    key: new Date('2020-01-22T08:00:00.000Z'),
    data: 18
  },
  {
    id: '40',
    key: new Date('2020-01-23T08:00:00.000Z'),
    data: 18
  },
  {
    id: '39',
    key: new Date('2020-01-24T08:00:00.000Z'),
    data: 23
  },
  {
    id: '38',
    key: new Date('2020-01-25T08:00:00.000Z'),
    data: 46
  },
  {
    id: '37',
    key: new Date('2020-01-26T08:00:00.000Z'),
    data: 36
  },
  {
    id: '36',
    key: new Date('2020-01-27T08:00:00.000Z'),
    data: 1
  },
  {
    id: '35',
    key: new Date('2020-01-28T08:00:00.000Z'),
    data: 7
  },
  {
    id: '34',
    key: new Date('2020-01-29T08:00:00.000Z'),
    data: 5
  },
  {
    id: '33',
    key: new Date('2020-01-30T08:00:00.000Z'),
    data: 41
  },
  {
    id: '32',
    key: new Date('2020-01-31T08:00:00.000Z'),
    data: 29
  },
  {
    id: '31',
    key: new Date('2020-02-01T08:00:00.000Z'),
    data: 41
  },
  {
    id: '30',
    key: new Date('2020-02-02T08:00:00.000Z'),
    data: 11
  },
  {
    id: '29',
    key: new Date('2020-02-03T08:00:00.000Z'),
    data: 33
  },
  {
    id: '28',
    key: new Date('2020-02-04T08:00:00.000Z'),
    data: 35
  },
  {
    id: '27',
    key: new Date('2020-02-05T08:00:00.000Z'),
    data: 38
  },
  {
    id: '26',
    key: new Date('2020-02-06T08:00:00.000Z'),
    data: 49
  },
  {
    id: '25',
    key: new Date('2020-02-07T08:00:00.000Z'),
    data: 22
  },
  {
    id: '24',
    key: new Date('2020-02-08T08:00:00.000Z'),
    data: 38
  },
  {
    id: '23',
    key: new Date('2020-02-09T08:00:00.000Z'),
    data: 6
  },
  {
    id: '22',
    key: new Date('2020-02-10T08:00:00.000Z'),
    data: 15
  },
  {
    id: '21',
    key: new Date('2020-02-11T08:00:00.000Z'),
    data: 37
  },
  {
    id: '20',
    key: new Date('2020-02-12T08:00:00.000Z'),
    data: 18
  },
  {
    id: '19',
    key: new Date('2020-02-13T08:00:00.000Z'),
    data: 20
  },
  {
    id: '18',
    key: new Date('2020-02-14T08:00:00.000Z'),
    data: 38
  },
  {
    id: '17',
    key: new Date('2020-02-15T08:00:00.000Z'),
    data: 48
  },
  {
    id: '16',
    key: new Date('2020-02-16T08:00:00.000Z'),
    data: 31
  },
  {
    id: '15',
    key: new Date('2020-02-17T08:00:00.000Z'),
    data: 20
  },
  {
    id: '14',
    key: new Date('2020-02-18T08:00:00.000Z'),
    data: 7
  },
  {
    id: '13',
    key: new Date('2020-02-19T08:00:00.000Z'),
    data: 48
  },
  {
    id: '12',
    key: new Date('2020-02-20T08:00:00.000Z'),
    data: 35
  },
  {
    id: '11',
    key: new Date('2020-02-21T08:00:00.000Z'),
    data: 9
  },
  {
    id: '10',
    key: new Date('2020-02-22T08:00:00.000Z'),
    data: 3
  },
  {
    id: '9',
    key: new Date('2020-02-23T08:00:00.000Z'),
    data: 10
  },
  {
    id: '8',
    key: new Date('2020-02-24T08:00:00.000Z'),
    data: 25
  },
  {
    id: '7',
    key: new Date('2020-02-25T08:00:00.000Z'),
    data: 31
  },
  {
    id: '6',
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 39
  },
  {
    id: '5',
    key: new Date('2020-02-27T08:00:00.000Z'),
    data: 19
  },
  {
    id: '4',
    key: new Date('2020-02-28T08:00:00.000Z'),
    data: 17
  },
  {
    id: '3',
    key: new Date('2020-02-29T08:00:00.000Z'),
    data: 25
  },
  {
    id: '2',
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 45
  },
  {
    id: '1',
    key: new Date('2020-03-02T08:00:00.000Z'),
    data: 25
  }
];

// generateData(50);
export const medDateData = [
  {
    id: '50',
    key: new Date('2020-01-13T08:00:00.000Z'),
    data: 16
  },
  {
    id: '49',
    key: new Date('2020-01-14T08:00:00.000Z'),
    data: 44
  },
  {
    id: '48',
    key: new Date('2020-01-15T08:00:00.000Z'),
    data: 12
  },
  {
    id: '47',
    key: new Date('2020-01-16T08:00:00.000Z'),
    data: 26
  },
  {
    id: '46',
    key: new Date('2020-01-17T08:00:00.000Z'),
    data: 41
  },
  {
    id: '45',
    key: new Date('2020-01-18T08:00:00.000Z'),
    data: 25
  },
  {
    id: '44',
    key: new Date('2020-01-19T08:00:00.000Z'),
    data: 24
  },
  {
    id: '43',
    key: new Date('2020-01-20T08:00:00.000Z'),
    data: 23
  },
  {
    id: '42',
    key: new Date('2020-01-21T08:00:00.000Z'),
    data: 26
  },
  {
    id: '41',
    key: new Date('2020-01-22T08:00:00.000Z'),
    data: 21
  },
  {
    id: '40',
    key: new Date('2020-01-23T08:00:00.000Z'),
    data: 32
  },
  {
    id: '39',
    key: new Date('2020-01-24T08:00:00.000Z'),
    data: 11
  },
  {
    id: '38',
    key: new Date('2020-01-25T08:00:00.000Z'),
    data: 33
  },
  {
    id: '37',
    key: new Date('2020-01-26T08:00:00.000Z'),
    data: 3
  },
  {
    id: '36',
    key: new Date('2020-01-27T08:00:00.000Z'),
    data: 7
  },
  {
    id: '35',
    key: new Date('2020-01-28T08:00:00.000Z'),
    data: 8
  },
  {
    id: '34',
    key: new Date('2020-01-29T08:00:00.000Z'),
    data: 9
  },
  {
    id: '33',
    key: new Date('2020-01-30T08:00:00.000Z'),
    data: 7
  },
  {
    id: '32',
    key: new Date('2020-01-31T08:00:00.000Z'),
    data: 9
  },
  {
    id: '31',
    key: new Date('2020-02-01T08:00:00.000Z'),
    data: 50
  },
  {
    id: '30',
    key: new Date('2020-02-02T08:00:00.000Z'),
    data: 19
  },
  {
    id: '29',
    key: new Date('2020-02-03T08:00:00.000Z'),
    data: 48
  },
  {
    id: '28',
    key: new Date('2020-02-04T08:00:00.000Z'),
    data: 15
  },
  {
    id: '27',
    key: new Date('2020-02-05T08:00:00.000Z'),
    data: 42
  },
  {
    id: '26',
    key: new Date('2020-02-06T08:00:00.000Z'),
    data: 29
  },
  {
    id: '25',
    key: new Date('2020-02-07T08:00:00.000Z'),
    data: 40
  },
  {
    id: '24',
    key: new Date('2020-02-08T08:00:00.000Z'),
    data: 34
  },
  {
    id: '23',
    key: new Date('2020-02-09T08:00:00.000Z'),
    data: 4
  },
  {
    id: '22',
    key: new Date('2020-02-10T08:00:00.000Z'),
    data: 24
  },
  {
    id: '21',
    key: new Date('2020-02-11T08:00:00.000Z'),
    data: 1
  },
  {
    id: '20',
    key: new Date('2020-02-12T08:00:00.000Z'),
    data: 35
  },
  {
    id: '19',
    key: new Date('2020-02-13T08:00:00.000Z'),
    data: 26
  },
  {
    id: '18',
    key: new Date('2020-02-14T08:00:00.000Z'),
    data: 8
  },
  {
    id: '17',
    key: new Date('2020-02-15T08:00:00.000Z'),
    data: 30
  },
  {
    id: '16',
    key: new Date('2020-02-16T08:00:00.000Z'),
    data: 5
  },
  {
    id: '15',
    key: new Date('2020-02-17T08:00:00.000Z'),
    data: 8
  },
  {
    id: '14',
    key: new Date('2020-02-18T08:00:00.000Z'),
    data: 1
  },
  {
    id: '13',
    key: new Date('2020-02-19T08:00:00.000Z'),
    data: 36
  },
  {
    id: '12',
    key: new Date('2020-02-20T08:00:00.000Z'),
    data: 25
  },
  {
    id: '11',
    key: new Date('2020-02-21T08:00:00.000Z'),
    data: 34
  },
  {
    id: '10',
    key: new Date('2020-02-22T08:00:00.000Z'),
    data: 42
  },
  {
    id: '9',
    key: new Date('2020-02-23T08:00:00.000Z'),
    data: 38
  },
  {
    id: '8',
    key: new Date('2020-02-24T08:00:00.000Z'),
    data: 23
  },
  {
    id: '7',
    key: new Date('2020-02-25T08:00:00.000Z'),
    data: 10
  },
  {
    id: '6',
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: 16
  },
  {
    id: '5',
    key: new Date('2020-02-27T08:00:00.000Z'),
    data: 26
  },
  {
    id: '4',
    key: new Date('2020-02-28T08:00:00.000Z'),
    data: 45
  },
  {
    id: '3',
    key: new Date('2020-02-29T08:00:00.000Z'),
    data: 39
  },
  {
    id: '2',
    key: new Date('2020-03-01T08:00:00.000Z'),
    data: 38
  },
  {
    id: '1',
    key: new Date('2020-03-02T08:00:00.000Z'),
    data: 17
  }
];

// generateData(15);
export const smallDateData = [
  { id: '15', key: new Date('2020-02-17T08:00:00.000Z'), data: 4 },
  { id: '14', key: new Date('2020-02-18T08:00:00.000Z'), data: 16 },
  { id: '13', key: new Date('2020-02-19T08:00:00.000Z'), data: 39 },
  { id: '12', key: new Date('2020-02-20T08:00:00.000Z'), data: 10 },
  { id: '11', key: new Date('2020-02-21T08:00:00.000Z'), data: 37 },
  { id: '10', key: new Date('2020-02-22T08:00:00.000Z'), data: 41 },
  { id: '9', key: new Date('2020-02-23T08:00:00.000Z'), data: 31 },
  { id: '8', key: new Date('2020-02-24T08:00:00.000Z'), data: 47 },
  { id: '7', key: new Date('2020-02-25T08:00:00.000Z'), data: 47 },
  { id: '6', key: new Date('2020-02-26T08:00:00.000Z'), data: 8 },
  { id: '5', key: new Date('2020-02-27T08:00:00.000Z'), data: 35 },
  { id: '4', key: new Date('2020-02-28T08:00:00.000Z'), data: 32 },
  { id: '3', key: new Date('2020-02-29T08:00:00.000Z'), data: 17 },
  { id: '2', key: new Date('2020-03-01T08:00:00.000Z'), data: 15 },
  { id: '1', key: new Date('2020-03-02T08:00:00.000Z'), data: 50 }
];

// generateDateData() from sonar.ts
export const singleDateData = [
  { id: '0', key: new Date('2020-02-17T08:00:00.000Z'), data: 10 },
  { id: '1', key: new Date('2020-02-21T08:00:00.000Z'), data: 18 },
  { id: '2', key: new Date('2020-02-26T08:00:00.000Z'), data: 2 },
  { id: '3', key: new Date('2020-02-29T08:00:00.000Z'), data: 10 }
];

// export const multiDateData = [
//   {
//     key: 'Threat Intel',
//     data: generateDateData()
//   },
//   {
//     key: 'DLP',
//     data: generateDateData()
//   },
//   {
//     key: 'Syslog',
//     data: generateDateData()
//   }
// ];
export const multiDateData = [
  {
    key: 'Threat Intel',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        id: '0',
        data: 18
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        id: '1',
        data: 3
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        id: '2',
        data: 14
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        id: '3',
        data: 18
      }
    ]
  },
  {
    key: 'DLP',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        id: '0',
        data: 12
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        id: '1',
        data: 8
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        id: '2',
        data: 7
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        id: '3',
        data: 16
      }
    ]
  },
  {
    key: 'Syslog',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        id: '0',
        data: 12
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        id: '1',
        data: 9
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        id: '2',
        data: 4
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        id: '3',
        data: 1
      }
    ]
  }
];

// export const nonZeroDateData = [
//   {
//     key: generateDate(14),
//     data: [5, 10]
//   },
//   {
//     key: generateDate(10),
//     data: [8, 14]
//   },
//   {
//     key: generateDate(5),
//     data: [5, 6]
//   },
//   {
//     key: generateDate(2),
//     data: [10, 18]
//   }
// ];
export const nonZeroDateData = [
  { key: new Date('2020-02-17T08:00:00.000Z'), data: [5, 10] },
  { key: new Date('2020-02-21T08:00:00.000Z'), data: [8, 14] },
  { key: new Date('2020-02-26T08:00:00.000Z'), data: [5, 6] },
  { key: new Date('2020-02-29T08:00:00.000Z'), data: [10, 18] }
];

// export const singleDateBigIntData = [
//   {
//     key: generateDate(14),
//     data: bigInt(98476124342)
//   },
//   {
//     key: generateDate(10),
//     data: bigInt(76129235932)
//   },
//   {
//     key: generateDate(5),
//     data: bigInt(60812341342)
//   },
//   {
//     key: generateDate(2),
//     data: bigInt(76129235932)
//   }
// ];
export const singleDateBigIntData = [
  {
    key: new Date('2020-02-17T08:00:00.000Z'),
    data: bigInt(98476124342)
  },
  {
    key: new Date('2020-02-21T08:00:00.000Z'),
    data: bigInt(76129235932)
  },
  {
    key: new Date('2020-02-26T08:00:00.000Z'),
    data: bigInt(60812341342)
  },
  {
    key: new Date('2020-02-29T08:00:00.000Z'),
    data: bigInt(76129235932)
  }
];
