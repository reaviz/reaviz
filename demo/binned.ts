import { range } from 'd3-array';
import { generateDate, randomNumber } from './utils';

const DIVERGING_DATA_KEY_POSITIVE = 'Opened';
const DIVERGING_DATA_KEY_NEGATIVE = 'Closed';

export const generateBinnedData = (
  count: number,
  minVal = 0,
  maxVal = 50,
  dataKeyToZero = ''
) =>
  range(count)
    .map(i => ({
      key: generateDate(i).toLocaleDateString(),
      data: [
        {
          key: DIVERGING_DATA_KEY_NEGATIVE,
          data:
            dataKeyToZero === DIVERGING_DATA_KEY_NEGATIVE
              ? 0
              : -randomNumber(minVal, maxVal)
        },
        {
          key: DIVERGING_DATA_KEY_POSITIVE,
          data:
            dataKeyToZero === DIVERGING_DATA_KEY_POSITIVE
              ? 0
              : randomNumber(minVal, maxVal)
        }
      ]
    }))
    .reverse();

// generateBinnedData(7);
export const binnedDateData = [
  {
    key: '2/25/2020',
    data: [
      {
        key: 'Closed',
        data: -18
      },
      {
        key: 'Opened',
        data: 31
      }
    ]
  },
  {
    key: '2/26/2020',
    data: [
      {
        key: 'Closed',
        data: -36
      },
      {
        key: 'Opened',
        data: 46
      }
    ]
  },
  {
    key: '2/27/2020',
    data: [
      {
        key: 'Closed',
        data: -29
      },
      {
        key: 'Opened',
        data: 9
      }
    ]
  },
  {
    key: '2/28/2020',
    data: [
      {
        key: 'Closed',
        data: -1
      },
      {
        key: 'Opened',
        data: 6
      }
    ]
  },
  {
    key: '2/29/2020',
    data: [
      {
        key: 'Closed',
        data: -22
      },
      {
        key: 'Opened',
        data: 29
      }
    ]
  },
  {
    key: '3/1/2020',
    data: [
      {
        key: 'Closed',
        data: -18
      },
      {
        key: 'Opened',
        data: 44
      }
    ]
  },
  {
    key: '3/2/2020',
    data: [
      {
        key: 'Closed',
        data: -29
      },
      {
        key: 'Opened',
        data: 38
      }
    ]
  }
];

// export const binnedDatePositiveOnly = generateBinnedData(
//   7,
//   0,
//   50,
//   DIVERGING_DATA_KEY_NEGATIVE
// );
export const binnedDatePositiveOnly = [
  {
    key: '2/25/2020',
    data: [
      { key: 'Closed', data: 0 },
      { key: 'Opened', data: 23 }
    ]
  },
  {
    key: '2/26/2020',
    data: [
      { key: 'Closed', data: 0 },
      { key: 'Opened', data: 15 }
    ]
  },
  {
    key: '2/27/2020',
    data: [
      { key: 'Closed', data: 0 },
      { key: 'Opened', data: 32 }
    ]
  },
  {
    key: '2/28/2020',
    data: [
      { key: 'Closed', data: 0 },
      { key: 'Opened', data: 42 }
    ]
  },
  {
    key: '2/29/2020',
    data: [
      { key: 'Closed', data: 0 },
      { key: 'Opened', data: 33 }
    ]
  },
  {
    key: '3/1/2020',
    data: [
      { key: 'Closed', data: 0 },
      { key: 'Opened', data: 20 }
    ]
  },
  {
    key: '3/2/2020',
    data: [
      { key: 'Closed', data: 0 },
      { key: 'Opened', data: 14 }
    ]
  }
];

// export const binnedDateNegativeOnly = generateBinnedData(
//   7,
//   0,
//   50,
//   DIVERGING_DATA_KEY_POSITIVE
// );
export const binnedDateNegativeOnly = [
  {
    key: '2/25/2020',
    data: [
      { key: 'Closed', data: -36 },
      { key: 'Opened', data: 0 }
    ]
  },
  {
    key: '2/26/2020',
    data: [
      { key: 'Closed', data: -26 },
      { key: 'Opened', data: 0 }
    ]
  },
  {
    key: '2/27/2020',
    data: [
      { key: 'Closed', data: -7 },
      { key: 'Opened', data: 0 }
    ]
  },
  {
    key: '2/28/2020',
    data: [
      { key: 'Closed', data: -7 },
      { key: 'Opened', data: 0 }
    ]
  },
  {
    key: '2/29/2020',
    data: [
      { key: 'Closed', data: -18 },
      { key: 'Opened', data: 0 }
    ]
  },
  {
    key: '3/1/2020',
    data: [
      { key: 'Closed', data: -37 },
      { key: 'Opened', data: 0 }
    ]
  },
  {
    key: '3/2/2020',
    data: [
      { key: 'Closed', data: -34 },
      { key: 'Opened', data: 0 }
    ]
  }
];
