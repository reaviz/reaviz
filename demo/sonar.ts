import { generateDate, randomNumber } from './utils';

const dateOffsets = [14, 10, 5, 2];

const generateBaseDateData = (offsets = dateOffsets) =>
  offsets.map(offset => ({ offset, data: randomNumber(0, 20) }));

export const generateDateData = (baseData = generateBaseDateData()) =>
  baseData.map((item: any, index: number) => ({
    id: index.toString(),
    key: generateDate(item.offset),
    data: item.data
  }));

// generateDateData();
const binnedData90 = [
  {
    key: '12/4/2019',
    data: [
      {
        key: 'Closed',
        data: -27
      },
      {
        key: 'Opened',
        data: 32
      }
    ]
  },
  {
    key: '12/5/2019',
    data: [
      {
        key: 'Closed',
        data: -11
      },
      {
        key: 'Opened',
        data: 31
      }
    ]
  },
  {
    key: '12/6/2019',
    data: [
      {
        key: 'Closed',
        data: -16
      },
      {
        key: 'Opened',
        data: 21
      }
    ]
  },
  {
    key: '12/7/2019',
    data: [
      {
        key: 'Closed',
        data: -49
      },
      {
        key: 'Opened',
        data: 11
      }
    ]
  },
  {
    key: '12/8/2019',
    data: [
      {
        key: 'Closed',
        data: -20
      },
      {
        key: 'Opened',
        data: 34
      }
    ]
  },
  {
    key: '12/9/2019',
    data: [
      {
        key: 'Closed',
        data: -5
      },
      {
        key: 'Opened',
        data: 3
      }
    ]
  },
  {
    key: '12/10/2019',
    data: [
      {
        key: 'Closed',
        data: -39
      },
      {
        key: 'Opened',
        data: 43
      }
    ]
  },
  {
    key: '12/11/2019',
    data: [
      {
        key: 'Closed',
        data: -10
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '12/12/2019',
    data: [
      {
        key: 'Closed',
        data: -7
      },
      {
        key: 'Opened',
        data: 6
      }
    ]
  },
  {
    key: '12/13/2019',
    data: [
      {
        key: 'Closed',
        data: -4
      },
      {
        key: 'Opened',
        data: 27
      }
    ]
  },
  {
    key: '12/14/2019',
    data: [
      {
        key: 'Closed',
        data: -3
      },
      {
        key: 'Opened',
        data: 16
      }
    ]
  },
  {
    key: '12/15/2019',
    data: [
      {
        key: 'Closed',
        data: -18
      },
      {
        key: 'Opened',
        data: 10
      }
    ]
  },
  {
    key: '12/16/2019',
    data: [
      {
        key: 'Closed',
        data: -31
      },
      {
        key: 'Opened',
        data: 16
      }
    ]
  },
  {
    key: '12/17/2019',
    data: [
      {
        key: 'Closed',
        data: -46
      },
      {
        key: 'Opened',
        data: 45
      }
    ]
  },
  {
    key: '12/18/2019',
    data: [
      {
        key: 'Closed',
        data: -42
      },
      {
        key: 'Opened',
        data: 24
      }
    ]
  },
  {
    key: '12/19/2019',
    data: [
      {
        key: 'Closed',
        data: -15
      },
      {
        key: 'Opened',
        data: 26
      }
    ]
  },
  {
    key: '12/20/2019',
    data: [
      {
        key: 'Closed',
        data: -3
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '12/21/2019',
    data: [
      {
        key: 'Closed',
        data: -15
      },
      {
        key: 'Opened',
        data: 50
      }
    ]
  },
  {
    key: '12/22/2019',
    data: [
      {
        key: 'Closed',
        data: -25
      },
      {
        key: 'Opened',
        data: 1
      }
    ]
  },
  {
    key: '12/23/2019',
    data: [
      {
        key: 'Closed',
        data: -30
      },
      {
        key: 'Opened',
        data: 41
      }
    ]
  },
  {
    key: '12/24/2019',
    data: [
      {
        key: 'Closed',
        data: -34
      },
      {
        key: 'Opened',
        data: 30
      }
    ]
  },
  {
    key: '12/25/2019',
    data: [
      {
        key: 'Closed',
        data: -34
      },
      {
        key: 'Opened',
        data: 26
      }
    ]
  },
  {
    key: '12/26/2019',
    data: [
      {
        key: 'Closed',
        data: -11
      },
      {
        key: 'Opened',
        data: 48
      }
    ]
  },
  {
    key: '12/27/2019',
    data: [
      {
        key: 'Closed',
        data: -40
      },
      {
        key: 'Opened',
        data: 50
      }
    ]
  },
  {
    key: '12/28/2019',
    data: [
      {
        key: 'Closed',
        data: -12
      },
      {
        key: 'Opened',
        data: 7
      }
    ]
  },
  {
    key: '12/29/2019',
    data: [
      {
        key: 'Closed',
        data: -20
      },
      {
        key: 'Opened',
        data: 26
      }
    ]
  },
  {
    key: '12/30/2019',
    data: [
      {
        key: 'Closed',
        data: -47
      },
      {
        key: 'Opened',
        data: 27
      }
    ]
  },
  {
    key: '12/31/2019',
    data: [
      {
        key: 'Closed',
        data: -4
      },
      {
        key: 'Opened',
        data: 7
      }
    ]
  },
  {
    key: '1/1/2020',
    data: [
      {
        key: 'Closed',
        data: -45
      },
      {
        key: 'Opened',
        data: 29
      }
    ]
  },
  {
    key: '1/2/2020',
    data: [
      {
        key: 'Closed',
        data: -9
      },
      {
        key: 'Opened',
        data: 34
      }
    ]
  },
  {
    key: '1/3/2020',
    data: [
      {
        key: 'Closed',
        data: -27
      },
      {
        key: 'Opened',
        data: 11
      }
    ]
  },
  {
    key: '1/4/2020',
    data: [
      {
        key: 'Closed',
        data: -8
      },
      {
        key: 'Opened',
        data: 16
      }
    ]
  },
  {
    key: '1/5/2020',
    data: [
      {
        key: 'Closed',
        data: -50
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '1/6/2020',
    data: [
      {
        key: 'Closed',
        data: -30
      },
      {
        key: 'Opened',
        data: 30
      }
    ]
  },
  {
    key: '1/7/2020',
    data: [
      {
        key: 'Closed',
        data: -26
      },
      {
        key: 'Opened',
        data: 32
      }
    ]
  },
  {
    key: '1/8/2020',
    data: [
      {
        key: 'Closed',
        data: -41
      },
      {
        key: 'Opened',
        data: 15
      }
    ]
  },
  {
    key: '1/9/2020',
    data: [
      {
        key: 'Closed',
        data: -6
      },
      {
        key: 'Opened',
        data: 25
      }
    ]
  },
  {
    key: '1/10/2020',
    data: [
      {
        key: 'Closed',
        data: -45
      },
      {
        key: 'Opened',
        data: 15
      }
    ]
  },
  {
    key: '1/11/2020',
    data: [
      {
        key: 'Closed',
        data: -34
      },
      {
        key: 'Opened',
        data: 9
      }
    ]
  },
  {
    key: '1/12/2020',
    data: [
      {
        key: 'Closed',
        data: -38
      },
      {
        key: 'Opened',
        data: 38
      }
    ]
  },
  {
    key: '1/13/2020',
    data: [
      {
        key: 'Closed',
        data: -8
      },
      {
        key: 'Opened',
        data: 43
      }
    ]
  },
  {
    key: '1/14/2020',
    data: [
      {
        key: 'Closed',
        data: -29
      },
      {
        key: 'Opened',
        data: 17
      }
    ]
  },
  {
    key: '1/15/2020',
    data: [
      {
        key: 'Closed',
        data: -6
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '1/16/2020',
    data: [
      {
        key: 'Closed',
        data: -34
      },
      {
        key: 'Opened',
        data: 25
      }
    ]
  },
  {
    key: '1/17/2020',
    data: [
      {
        key: 'Closed',
        data: -17
      },
      {
        key: 'Opened',
        data: 9
      }
    ]
  },
  {
    key: '1/18/2020',
    data: [
      {
        key: 'Closed',
        data: -5
      },
      {
        key: 'Opened',
        data: 27
      }
    ]
  },
  {
    key: '1/19/2020',
    data: [
      {
        key: 'Closed',
        data: -27
      },
      {
        key: 'Opened',
        data: 34
      }
    ]
  },
  {
    key: '1/20/2020',
    data: [
      {
        key: 'Closed',
        data: -22
      },
      {
        key: 'Opened',
        data: 43
      }
    ]
  },
  {
    key: '1/21/2020',
    data: [
      {
        key: 'Closed',
        data: -40
      },
      {
        key: 'Opened',
        data: 24
      }
    ]
  },
  {
    key: '1/22/2020',
    data: [
      {
        key: 'Closed',
        data: -28
      },
      {
        key: 'Opened',
        data: 5
      }
    ]
  },
  {
    key: '1/23/2020',
    data: [
      {
        key: 'Closed',
        data: -17
      },
      {
        key: 'Opened',
        data: 28
      }
    ]
  },
  {
    key: '1/24/2020',
    data: [
      {
        key: 'Closed',
        data: -23
      },
      {
        key: 'Opened',
        data: 40
      }
    ]
  },
  {
    key: '1/25/2020',
    data: [
      {
        key: 'Closed',
        data: -11
      },
      {
        key: 'Opened',
        data: 41
      }
    ]
  },
  {
    key: '1/26/2020',
    data: [
      {
        key: 'Closed',
        data: -7
      },
      {
        key: 'Opened',
        data: 41
      }
    ]
  },
  {
    key: '1/27/2020',
    data: [
      {
        key: 'Closed',
        data: -31
      },
      {
        key: 'Opened',
        data: 34
      }
    ]
  },
  {
    key: '1/28/2020',
    data: [
      {
        key: 'Closed',
        data: -10
      },
      {
        key: 'Opened',
        data: 31
      }
    ]
  },
  {
    key: '1/29/2020',
    data: [
      {
        key: 'Closed',
        data: -26
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '1/30/2020',
    data: [
      {
        key: 'Closed',
        data: -40
      },
      {
        key: 'Opened',
        data: 13
      }
    ]
  },
  {
    key: '1/31/2020',
    data: [
      {
        key: 'Closed',
        data: -13
      },
      {
        key: 'Opened',
        data: 49
      }
    ]
  },
  {
    key: '2/1/2020',
    data: [
      {
        key: 'Closed',
        data: -12
      },
      {
        key: 'Opened',
        data: 44
      }
    ]
  },
  {
    key: '2/2/2020',
    data: [
      {
        key: 'Closed',
        data: -1
      },
      {
        key: 'Opened',
        data: 30
      }
    ]
  },
  {
    key: '2/3/2020',
    data: [
      {
        key: 'Closed',
        data: 0
      },
      {
        key: 'Opened',
        data: 30
      }
    ]
  },
  {
    key: '2/4/2020',
    data: [
      {
        key: 'Closed',
        data: -50
      },
      {
        key: 'Opened',
        data: 5
      }
    ]
  },
  {
    key: '2/5/2020',
    data: [
      {
        key: 'Closed',
        data: -46
      },
      {
        key: 'Opened',
        data: 43
      }
    ]
  },
  {
    key: '2/6/2020',
    data: [
      {
        key: 'Closed',
        data: -39
      },
      {
        key: 'Opened',
        data: 16
      }
    ]
  },
  {
    key: '2/7/2020',
    data: [
      {
        key: 'Closed',
        data: -38
      },
      {
        key: 'Opened',
        data: 7
      }
    ]
  },
  {
    key: '2/8/2020',
    data: [
      {
        key: 'Closed',
        data: -7
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '2/9/2020',
    data: [
      {
        key: 'Closed',
        data: -37
      },
      {
        key: 'Opened',
        data: 24
      }
    ]
  },
  {
    key: '2/10/2020',
    data: [
      {
        key: 'Closed',
        data: -15
      },
      {
        key: 'Opened',
        data: 31
      }
    ]
  },
  {
    key: '2/11/2020',
    data: [
      {
        key: 'Closed',
        data: -47
      },
      {
        key: 'Opened',
        data: 15
      }
    ]
  },
  {
    key: '2/12/2020',
    data: [
      {
        key: 'Closed',
        data: -47
      },
      {
        key: 'Opened',
        data: 9
      }
    ]
  },
  {
    key: '2/13/2020',
    data: [
      {
        key: 'Closed',
        data: -25
      },
      {
        key: 'Opened',
        data: 36
      }
    ]
  },
  {
    key: '2/14/2020',
    data: [
      {
        key: 'Closed',
        data: -47
      },
      {
        key: 'Opened',
        data: 25
      }
    ]
  },
  {
    key: '2/15/2020',
    data: [
      {
        key: 'Closed',
        data: -16
      },
      {
        key: 'Opened',
        data: 49
      }
    ]
  },
  {
    key: '2/16/2020',
    data: [
      {
        key: 'Closed',
        data: -31
      },
      {
        key: 'Opened',
        data: 9
      }
    ]
  },
  {
    key: '2/17/2020',
    data: [
      {
        key: 'Closed',
        data: -45
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '2/18/2020',
    data: [
      {
        key: 'Closed',
        data: -37
      },
      {
        key: 'Opened',
        data: 27
      }
    ]
  },
  {
    key: '2/19/2020',
    data: [
      {
        key: 'Closed',
        data: -32
      },
      {
        key: 'Opened',
        data: 27
      }
    ]
  },
  {
    key: '2/20/2020',
    data: [
      {
        key: 'Closed',
        data: -3
      },
      {
        key: 'Opened',
        data: 27
      }
    ]
  },
  {
    key: '2/21/2020',
    data: [
      {
        key: 'Closed',
        data: -25
      },
      {
        key: 'Opened',
        data: 6
      }
    ]
  },
  {
    key: '2/22/2020',
    data: [
      {
        key: 'Closed',
        data: -39
      },
      {
        key: 'Opened',
        data: 34
      }
    ]
  },
  {
    key: '2/23/2020',
    data: [
      {
        key: 'Closed',
        data: -21
      },
      {
        key: 'Opened',
        data: 41
      }
    ]
  },
  {
    key: '2/24/2020',
    data: [
      {
        key: 'Closed',
        data: -11
      },
      {
        key: 'Opened',
        data: 20
      }
    ]
  },
  {
    key: '2/25/2020',
    data: [
      {
        key: 'Closed',
        data: -37
      },
      {
        key: 'Opened',
        data: 24
      }
    ]
  },
  {
    key: '2/26/2020',
    data: [
      {
        key: 'Closed',
        data: -29
      },
      {
        key: 'Opened',
        data: 50
      }
    ]
  },
  {
    key: '2/27/2020',
    data: [
      {
        key: 'Closed',
        data: -39
      },
      {
        key: 'Opened',
        data: 18
      }
    ]
  },
  {
    key: '2/28/2020',
    data: [
      {
        key: 'Closed',
        data: -44
      },
      {
        key: 'Opened',
        data: 27
      }
    ]
  },
  {
    key: '2/29/2020',
    data: [
      {
        key: 'Closed',
        data: -4
      },
      {
        key: 'Opened',
        data: 26
      }
    ]
  },
  {
    key: '3/1/2020',
    data: [
      {
        key: 'Closed',
        data: -17
      },
      {
        key: 'Opened',
        data: 42
      }
    ]
  },
  {
    key: '3/2/2020',
    data: [
      {
        key: 'Closed',
        data: -6
      },
      {
        key: 'Opened',
        data: 13
      }
    ]
  }
];

export const sonarData = binnedData90.map(d => ({
  ...d,
  data: [d.data[0], { ...d.data[1], data: -d.data[0].data }]
}));

export const sonarDataEmpties = binnedData90.map((d, i) => ({
  ...d,
  data:
    i > 30 && i < 60
      ? [d.data[0], { ...d.data[1], data: -d.data[0].data }]
      : [
          { key: 'Closed', data: 0 },
          { key: 'Opened', data: 0 }
        ]
}));
