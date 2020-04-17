import { range } from 'd3-array';
import { randomNumber } from './utils';

export const generateCategoryData = count =>
  range(count).map(i => ({
    key: categoryData[randomNumber(0, categoryData.length - 1)].key + '' + i,
    data: randomNumber(0, 50)
  }));

export const categoryData = [
  {
    key: 'Phishing Attack',
    data: 10
  },
  {
    key: 'IDS',
    data: 14
  },
  {
    key: 'Malware',
    data: 5
  },
  {
    key: 'DLP',
    data: 18
  }
];

export const durationCategoryData = [
  {
    key: 'Phishing Attack',
    data: 3263
  },
  {
    key: 'IDS',
    data: 14123
  },
  {
    key: 'Malware',
    data: 10357
  },
  {
    key: 'DLP',
    data: 8890
  }
];

export const nonZeroCategoryData: any = [
  {
    key: 'Phishing Attack',
    data: [5, 10]
  },
  {
    key: 'IDS',
    data: [8, 14]
  },
  {
    key: 'Malware',
    data: [5, 6]
  },
  {
    key: 'DLP',
    data: [10, 18]
  }
];

// generateCategoryData(50)
export const largeCategoryData = [
  {
    key: 'IDS0',
    data: 9
  },
  {
    key: 'IDS1',
    data: 26
  },
  {
    key: 'DLP2',
    data: 8
  },
  {
    key: 'Phishing Attack3',
    data: 17
  },
  {
    key: 'Malware4',
    data: 28
  },
  {
    key: 'Malware5',
    data: 12
  },
  {
    key: 'DLP6',
    data: 22
  },
  {
    key: 'Malware7',
    data: 14
  },
  {
    key: 'Malware8',
    data: 1
  },
  {
    key: 'IDS9',
    data: 34
  },
  {
    key: 'Phishing Attack10',
    data: 34
  },
  {
    key: 'Malware11',
    data: 23
  },
  {
    key: 'Phishing Attack12',
    data: 48
  },
  {
    key: 'Malware13',
    data: 12
  },
  {
    key: 'DLP14',
    data: 31
  },
  {
    key: 'IDS15',
    data: 43
  },
  {
    key: 'IDS16',
    data: 32
  },
  {
    key: 'IDS17',
    data: 45
  },
  {
    key: 'Malware18',
    data: 37
  },
  {
    key: 'Malware19',
    data: 5
  },
  {
    key: 'DLP20',
    data: 2
  },
  {
    key: 'Phishing Attack21',
    data: 30
  },
  {
    key: 'Malware22',
    data: 16
  },
  {
    key: 'DLP23',
    data: 43
  },
  {
    key: 'DLP24',
    data: 9
  },
  {
    key: 'Malware25',
    data: 6
  },
  {
    key: 'Malware26',
    data: 35
  },
  {
    key: 'Malware27',
    data: 25
  },
  {
    key: 'Malware28',
    data: 46
  },
  {
    key: 'IDS29',
    data: 34
  },
  {
    key: 'IDS30',
    data: 23
  },
  {
    key: 'IDS31',
    data: 0
  },
  {
    key: 'Malware32',
    data: 14
  },
  {
    key: 'IDS33',
    data: 3
  },
  {
    key: 'Malware34',
    data: 28
  },
  {
    key: 'DLP35',
    data: 21
  },
  {
    key: 'Phishing Attack36',
    data: 12
  },
  {
    key: 'Malware37',
    data: 26
  },
  {
    key: 'IDS38',
    data: 46
  },
  {
    key: 'Phishing Attack39',
    data: 43
  },
  {
    key: 'IDS40',
    data: 20
  },
  {
    key: 'IDS41',
    data: 7
  },
  {
    key: 'IDS42',
    data: 22
  },
  {
    key: 'IDS43',
    data: 4
  },
  {
    key: 'Phishing Attack44',
    data: 26
  },
  {
    key: 'DLP45',
    data: 23
  },
  {
    key: 'IDS46',
    data: 18
  },
  {
    key: 'IDS47',
    data: 28
  },
  {
    key: 'DLP48',
    data: 40
  },
  {
    key: 'Phishing Attack49',
    data: 26
  }
];

export const multiCategory = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML',
        data: 100
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 150
      },
      {
        key: 'SSH',
        data: 112
      }
    ]
  },
  {
    key: 'Discovery',
    data: [
      {
        key: 'XML',
        data: 100
      },
      {
        key: 'JSON',
        data: 34
      },
      {
        key: 'HTTPS',
        data: 22
      },
      {
        key: 'SSH',
        data: 111
      }
    ]
  },
  {
    key: 'Exploitation',
    data: [
      {
        key: 'XML',
        data: 70
      },
      {
        key: 'JSON',
        data: 130
      },
      {
        key: 'HTTPS',
        data: 110
      },
      {
        key: 'SSH',
        data: 115
      }
    ]
  },
  {
    key: 'Threat Intelligence',
    data: [
      {
        key: 'XML',
        data: 130
      },
      {
        key: 'JSON',
        data: 120
      },
      {
        key: 'HTTPS',
        data: 200
      },
      {
        key: 'SSH',
        data: 160
      }
    ]
  },
  {
    key: 'Breach',
    data: [
      {
        key: 'XML',
        data: 5
      },
      {
        key: 'JSON',
        data: 10
      },
      {
        key: 'HTTPS',
        data: 15
      },
      {
        key: 'SSH',
        data: 20
      }
    ]
  }
];
