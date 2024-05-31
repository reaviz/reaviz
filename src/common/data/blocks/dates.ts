import bigInt from 'big-integer';
import { range } from 'd3-array';
import { generateDate, randomNumber } from 'reaviz-data-utils';

export const generateData = (count: number, minVal = 1, maxVal = 50) =>
  range(count)
    .map((i: number) => ({
      id: (i + 1).toString(),
      key: generateDate(i),
      data: randomNumber(minVal, maxVal)
    }))
    .reverse();

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

export const singleDateData = [
  { id: '0', key: new Date('2020-02-17T08:00:00.000Z'), data: 18 },
  { id: '1', key: new Date('2020-02-21T08:00:00.000Z'), data: 3 },
  { id: '2', key: new Date('2020-02-26T08:00:00.000Z'), data: 14 },
  { id: '3', key: new Date('2020-02-29T08:00:00.000Z'), data: 18 }
];

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

export const longMultiDateData = [
  {
    key: 'Series-25',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 2
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 2
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 32
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 26
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 37
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 44
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 15
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 20
      }
    ]
  },
  {
    key: 'Series-24',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 45
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 26
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 38
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 26
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 35
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 45
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 7
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 22
      }
    ]
  },
  {
    key: 'Series-23',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 35
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 48
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 1
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 49
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 32
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 42
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 4
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 45
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 31
      }
    ]
  },
  {
    key: 'Series-22',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 22
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 27
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 25
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 45
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 47
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 7
      }
    ]
  },
  {
    key: 'Series-21',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 4
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 27
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 39
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 42
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 38
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 45
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 40
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 40
      }
    ]
  },
  {
    key: 'Series-20',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 22
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 17
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 4
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 22
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 21
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 2
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 6
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 18
      }
    ]
  },
  {
    key: 'Series-19',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 40
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 25
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 35
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 16
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 44
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 48
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 37
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 17
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 32
      }
    ]
  },
  {
    key: 'Series-18',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 21
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 39
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 49
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 20
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 32
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 27
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 10
      }
    ]
  },
  {
    key: 'Series-17',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 15
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 7
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 39
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 32
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 10
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 37
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 11
      }
    ]
  },
  {
    key: 'Series-16',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 44
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 48
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 16
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 48
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 4
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 25
      }
    ]
  },
  {
    key: 'Series-15',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 16
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 43
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 34
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 25
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 10
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 1
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 10
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 9
      }
    ]
  },
  {
    key: 'Series-14',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 50
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 6
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 43
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 30
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 34
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 6
      }
    ]
  },
  {
    key: 'Series-13',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 10
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 30
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 44
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 42
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 16
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 32
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 26
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 27
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 30
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 10
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 13
      }
    ]
  },
  {
    key: 'Series-12',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 42
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 6
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 44
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 32
      }
    ]
  },
  {
    key: 'Series-11',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 47
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 22
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 16
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 40
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 20
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 44
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 4
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 47
      }
    ]
  },
  {
    key: 'Series-10',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 22
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 1
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 43
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 26
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 40
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 45
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 37
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 4
      }
    ]
  },
  {
    key: 'Series-9',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 7
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 40
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 1
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 30
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 21
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 20
      }
    ]
  },
  {
    key: 'Series-8',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 10
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 4
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 2
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 15
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 43
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 42
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 49
      }
    ]
  },
  {
    key: 'Series-7',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 42
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 15
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 2
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 6
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 48
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 37
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 22
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 32
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 49
      }
    ]
  },
  {
    key: 'Series-6',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 15
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 30
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 27
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 24
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 29
      }
    ]
  },
  {
    key: 'Series-5',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 20
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 21
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 37
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 43
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 7
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 49
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 39
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 38
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 43
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 40
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 17
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 27
      }
    ]
  },
  {
    key: 'Series-4',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 34
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 21
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 16
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 29
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 20
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 38
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 39
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 26
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 17
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 30
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 35
      }
    ]
  },
  {
    key: 'Series-3',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 33
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 23
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 35
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 21
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 46
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 21
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 26
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 41
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 7
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 8
      }
    ]
  },
  {
    key: 'Series-2',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 5
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 3
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 18
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 31
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 44
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 36
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 28
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 30
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 31
      }
    ]
  },
  {
    key: 'Series-1',
    data: [
      {
        key: new Date('2020-02-17T08:00:00.000Z'),
        data: 19
      },
      {
        key: new Date('2020-02-18T08:00:00.000Z'),
        data: 12
      },
      {
        key: new Date('2020-02-19T08:00:00.000Z'),
        data: 8
      },
      {
        key: new Date('2020-02-20T08:00:00.000Z'),
        data: 13
      },
      {
        key: new Date('2020-02-21T08:00:00.000Z'),
        data: 14
      },
      {
        key: new Date('2020-02-22T08:00:00.000Z'),
        data: 32
      },
      {
        key: new Date('2020-02-23T08:00:00.000Z'),
        data: 49
      },
      {
        key: new Date('2020-02-24T08:00:00.000Z'),
        data: 43
      },
      {
        key: new Date('2020-02-25T08:00:00.000Z'),
        data: 40
      },
      {
        key: new Date('2020-02-26T08:00:00.000Z'),
        data: 11
      },
      {
        key: new Date('2020-02-27T08:00:00.000Z'),
        data: 2
      },
      {
        key: new Date('2020-02-28T08:00:00.000Z'),
        data: 4
      },
      {
        key: new Date('2020-02-29T08:00:00.000Z'),
        data: 9
      },
      {
        key: new Date('2020-03-01T08:00:00.000Z'),
        data: 17
      },
      {
        key: new Date('2020-03-02T08:00:00.000Z'),
        data: 37
      }
    ]
  }
];

export const mediumMultiDateData = longMultiDateData.slice(0, 8);
