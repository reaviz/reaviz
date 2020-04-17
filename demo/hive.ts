export const nodes = [
  {
    x: 0,
    y: 0.6,
    value: '6',
    count: 2
  },
  {
    x: 1,
    y: 0.05555555555555555,
    value: 'Threat Intelligence',
    count: 2
  },
  {
    x: 2,
    y: 0.725925925925926,
    value: '2018-06-07T10:32:06',
    count: 1
  },
  {
    x: 0,
    y: 0.2,
    value: '2',
    count: 2
  },
  {
    x: 1,
    y: 0.2777777777777778,
    value: 'Exploitation',
    count: 2
  },
  {
    x: 2,
    y: 0.725925925925926,
    value: '2018-06-07T11:02:06',
    count: 2
  },
  {
    x: 0,
    y: 0.1,
    value: '1',
    count: 2
  },
  {
    x: 1,
    y: 0.6111111111111112,
    value: 'Defense Evasion',
    count: 1
  },
  {
    x: 2,
    y: 0.725925925925926,
    value: '2018-06-07T11:02:06',
    count: 2
  },
  {
    x: 0,
    y: 0.5,
    value: '5',
    count: 2
  },
  {
    x: 1,
    y: 0.7777777777777778,
    value: 'Lateral Movement',
    count: 3
  },
  {
    x: 2,
    y: 0.7074074074074074,
    value: '2018-06-12T10:02:06',
    count: 1
  },
  {
    x: 0,
    y: 0.1,
    value: '1',
    count: 2
  },
  {
    x: 1,
    y: 0.7777777777777778,
    value: 'Lateral Movement',
    count: 3
  },
  {
    x: 2,
    y: 0.7074074074074074,
    value: '2018-06-12T10:32:06',
    count: 1
  },
  {
    x: 0,
    y: 0.4,
    value: '4',
    count: 2
  },
  {
    x: 1,
    y: 0.7777777777777778,
    value: 'Lateral Movement',
    count: 3
  },
  {
    x: 2,
    y: 0.7,
    value: '2018-06-14T10:32:06',
    count: 1
  },
  {
    x: 0,
    y: 0.4,
    value: '4',
    count: 2
  },
  {
    x: 1,
    y: 0.7222222222222222,
    value: 'Discovery',
    count: 1
  },
  {
    x: 2,
    y: 0.7,
    value: '2018-06-14T11:02:06',
    count: 1
  },
  {
    x: 0,
    y: 0.6,
    value: '6',
    count: 2
  },
  {
    x: 1,
    y: 0.2777777777777778,
    value: 'Exploitation',
    count: 2
  },
  {
    x: 2,
    y: 0.6851851851851852,
    value: '2018-06-18T11:02:06',
    count: 2
  },
  {
    x: 0,
    y: 0.2,
    value: '2',
    count: 2
  },
  {
    x: 1,
    y: 0.05555555555555555,
    value: 'Threat Intelligence',
    count: 2
  },
  {
    x: 2,
    y: 0.6851851851851852,
    value: '2018-06-18T11:02:06',
    count: 2
  },
  {
    x: 0,
    y: 0.3,
    value: '3',
    count: 1
  },
  {
    x: 1,
    y: 0.9444444444444444,
    value: 'C2',
    count: 1
  },
  {
    x: 2,
    y: 0.674074074074074,
    value: '2018-06-21T10:35:06',
    count: 1
  },
  {
    x: 0,
    y: 0.5,
    value: '5',
    count: 2
  },
  {
    x: 1,
    y: 0.1111111111111111,
    value: 'Traffic Anomaly',
    count: 1
  },
  {
    x: 2,
    y: 0.6703703703703704,
    value: '2018-06-22T09:32:06',
    count: 1
  }
];

export const links = [
  {
    color: '#1764ff',
    source: nodes[0],
    target: nodes[1]
  },
  {
    color: '#1764ff',
    source: nodes[1],
    target: nodes[2]
  },
  {
    color: '#1764ff',
    source: nodes[2],
    target: nodes[0]
  },
  {
    color: '#73e4fc',
    source: nodes[3],
    target: nodes[4]
  },
  {
    color: '#73e4fc',
    source: nodes[4],
    target: nodes[5]
  },
  {
    color: '#73e4fc',
    source: nodes[5],
    target: nodes[3]
  },
  {
    color: '#27efb5',
    source: nodes[6],
    target: nodes[7]
  },
  {
    color: '#27efb5',
    source: nodes[7],
    target: nodes[8]
  },
  {
    color: '#27efb5',
    source: nodes[8],
    target: nodes[6]
  },
  {
    color: '#1764ff',
    source: nodes[9],
    target: nodes[10]
  },
  {
    color: '#1764ff',
    source: nodes[10],
    target: nodes[11]
  },
  {
    color: '#1764ff',
    source: nodes[11],
    target: nodes[9]
  },
  {
    color: '#73e4fc',
    source: nodes[12],
    target: nodes[13]
  },
  {
    color: '#73e4fc',
    source: nodes[13],
    target: nodes[14]
  },
  {
    color: '#73e4fc',
    source: nodes[14],
    target: nodes[12]
  },
  {
    color: '#27efb5',
    source: nodes[15],
    target: nodes[16]
  },
  {
    color: '#27efb5',
    source: nodes[16],
    target: nodes[17]
  },
  {
    color: '#27efb5',
    source: nodes[17],
    target: nodes[15]
  },
  {
    color: '#1764ff',
    source: nodes[18],
    target: nodes[19]
  },
  {
    color: '#1764ff',
    source: nodes[19],
    target: nodes[20]
  },
  {
    color: '#1764ff',
    source: nodes[20],
    target: nodes[18]
  },
  {
    color: '#73e4fc',
    source: nodes[21],
    target: nodes[22]
  },
  {
    color: '#73e4fc',
    source: nodes[22],
    target: nodes[23]
  },
  {
    color: '#73e4fc',
    source: nodes[23],
    target: nodes[21]
  },
  {
    color: '#27efb5',
    source: nodes[24],
    target: nodes[25]
  },
  {
    color: '#27efb5',
    source: nodes[25],
    target: nodes[26]
  },
  {
    color: '#27efb5',
    source: nodes[26],
    target: nodes[24]
  },
  {
    color: '#1764ff',
    source: nodes[27],
    target: nodes[28]
  },
  {
    color: '#1764ff',
    source: nodes[28],
    target: nodes[29]
  },
  {
    color: '#1764ff',
    source: nodes[29],
    target: nodes[27]
  },
  {
    color: '#73e4fc',
    source: nodes[30],
    target: nodes[31]
  },
  {
    color: '#73e4fc',
    source: nodes[31],
    target: nodes[32]
  },
  {
    color: '#73e4fc',
    source: nodes[32],
    target: nodes[30]
  }
];
