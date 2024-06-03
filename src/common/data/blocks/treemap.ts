import { ChartNestedDataShape, ChartShallowDataShape } from '../types';

export const simpleTreemapData: ChartShallowDataShape[] = [
  { key: 'Twillo', data: 25 },
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 }
];

export const longTreemapData = [
  {
    key: 'Item 1',
    data: 28
  },
  {
    key: 'Item 2',
    data: 21
  },
  {
    key: 'Item 3',
    data: 26
  },
  {
    key: 'Item 4',
    data: 27
  },
  {
    key: 'Item 5',
    data: 29
  },
  {
    key: 'Item 6',
    data: 23
  },
  {
    key: 'Item 7',
    data: 47
  },
  {
    key: 'Item 8',
    data: 15
  },
  {
    key: 'Item 9',
    data: 14
  },
  {
    key: 'Item 10',
    data: 12
  },
  {
    key: 'Item 11',
    data: 41
  },
  {
    key: 'Item 12',
    data: 15
  },
  {
    key: 'Item 13',
    data: 7
  },
  {
    key: 'Item 14',
    data: 17
  },
  {
    key: 'Item 15',
    data: 39
  },
  {
    key: 'Item 16',
    data: 7
  },
  {
    key: 'Item 17',
    data: 20
  },
  {
    key: 'Item 18',
    data: 1
  },
  {
    key: 'Item 19',
    data: 20
  },
  {
    key: 'Item 20',
    data: 16
  },
  {
    key: 'Item 21',
    data: 34
  },
  {
    key: 'Item 22',
    data: 33
  },
  {
    key: 'Item 23',
    data: 41
  },
  {
    key: 'Item 24',
    data: 30
  },
  {
    key: 'Item 25',
    data: 44
  },
  {
    key: 'Item 26',
    data: 23
  },
  {
    key: 'Item 27',
    data: 16
  },
  {
    key: 'Item 28',
    data: 46
  },
  {
    key: 'Item 29',
    data: 7
  },
  {
    key: 'Item 30',
    data: 39
  },
  {
    key: 'Item 31',
    data: 26
  },
  {
    key: 'Item 32',
    data: 38
  },
  {
    key: 'Item 33',
    data: 12
  },
  {
    key: 'Item 34',
    data: 23
  },
  {
    key: 'Item 35',
    data: 15
  },
  {
    key: 'Item 36',
    data: 20
  },
  {
    key: 'Item 37',
    data: 46
  },
  {
    key: 'Item 38',
    data: 15
  },
  {
    key: 'Item 39',
    data: 40
  },
  {
    key: 'Item 40',
    data: 35
  },
  {
    key: 'Item 41',
    data: 19
  },
  {
    key: 'Item 42',
    data: 6
  },
  {
    key: 'Item 43',
    data: 18
  },
  {
    key: 'Item 44',
    data: 31
  },
  {
    key: 'Item 45',
    data: 11
  },
  {
    key: 'Item 46',
    data: 23
  },
  {
    key: 'Item 47',
    data: 43
  },
  {
    key: 'Item 48',
    data: 42
  },
  {
    key: 'Item 49',
    data: 13
  },
  {
    key: 'Item 50',
    data: 34
  }
];

export const nestedTreemapData: ChartNestedDataShape[] = [
  {
    key: 'Windows',
    data: [
      { key: 'WinXP', data: 15 },
      { key: 'Win10', data: 20 },
      { key: 'Win7', data: 50 },
      { key: 'WinVista', data: 10 },
      { key: 'Win98', data: 5 }
    ]
  },
  {
    key: 'MacOS',
    data: [
      { key: 'Sierra', data: 20 },
      { key: 'Catalina', data: 30 },
      { key: 'BigSur', data: 40 },
      { key: 'Ventura', data: 60 }
    ]
  },
  {
    key: 'Linux',
    data: [
      { key: 'Ubuntu', data: 70 },
      { key: 'Fedora', data: 60 },
      { key: 'CentOS', data: 50 }
    ]
  }
];
