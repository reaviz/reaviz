import React from 'react';
import { TreeMapSeries } from './TreeMapSeries';
import { ChartNestedDataShape, ChartShallowDataShape } from '@/common/data';
import { TreeMap } from './TreeMap';
import { TreeMapRect } from './TreeMapRect';
import { range } from 'd3-array';
import { randomNumber } from 'reaviz-data-utils';
import { TreeMapLabel } from './TreeMapLabel';

export default {
  tags: ['snapshot'],
  title: 'Charts/TreeMap',
  component: TreeMap,
  subcomponents: {
    TreeMapSeries,
    TreeMapRect,
    TreeMapLabel
  }
};

const simpleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export const Simple = () => (
  <TreeMap
    height={450}
    width={450}
    data={simpleData}
    series={<TreeMapSeries colorScheme="cybertron" />}
  />
);

export const LabelPosition = () => (
  <TreeMap
    height={400}
    width={400}
    series={<TreeMapSeries label={<TreeMapLabel placement="middle" />} />}
    data={simpleData}
  />
);

export const NoAnimation = () => (
  <TreeMap
    height={400}
    width={400}
    series={<TreeMapSeries animated={false} />}
    data={simpleData}
  />
);

const longLabelData: ChartShallowDataShape[] = [
  { key: 'Short text', data: 100 },
  { key: 'Another short text', data: 45 },
  {
    key: "This is a test of very long text that should not fit in a rectangle's width.",
    data: 75
  },
  {
    key: "This is another test of even longer text that should not fit in a rectangle at all because the text height should be more than the rectangle's height.",
    data: 25
  }
];

export const LongText = () => (
  <TreeMap id="long-text" height={400} width={400} data={longLabelData} />
);

export const NoWrap = () => (
  <TreeMap
    id="no-wrap"
    height={400}
    width={400}
    series={<TreeMapSeries label={<TreeMapLabel wrap={false} />} />}
    data={longLabelData}
  />
);

export const _20Items = () => (
  <TreeMap id="20-items" data={twentyItems} height={600} width={600} />
);

export const _100Items = () => {
  const longData: ChartShallowDataShape[] = range(100).map((o) => ({
    key: `Item ${o + 1}`,
    data: randomNumber(0, 100)
  }));

  return <TreeMap id="100-items" data={longData} height={600} width={600} />;
};
_100Items.tags = ['no-snapshot'];

export const Events = () => (
  <TreeMap
    id="events"
    height={400}
    width={400}
    data={simpleData}
    series={
      <TreeMapSeries
        rect={
          <TreeMapRect
            onMouseEnter={(event, data) => {
              console.log('onMouseEnter', event, data);
            }}
            onMouseLeave={(event, data) => {
              console.log('onMouseLeave', event, data);
            }}
            onClick={(event, data) => {
              console.log('onClick', event, data);
              alert(`Clicked ${data.data.key}`);
            }}
          />
        }
      />
    }
  />
);
Events.tags = ['no-snapshot'];

const twentyItems = [
  {
    key: 'Item 1',
    data: 3
  },
  {
    key: 'Item 2',
    data: 12
  },
  {
    key: 'Item 3',
    data: 11
  },
  {
    key: 'Item 4',
    data: 13
  },
  {
    key: 'Item 5',
    data: 12
  },
  {
    key: 'Item 6',
    data: 8
  },
  {
    key: 'Item 7',
    data: 10
  },
  {
    key: 'Item 8',
    data: 17
  },
  {
    key: 'Item 9',
    data: 2
  },
  {
    key: 'Item 10',
    data: 4
  },
  {
    key: 'Item 11',
    data: 0
  },
  {
    key: 'Item 12',
    data: 15
  },
  {
    key: 'Item 13',
    data: 12
  },
  {
    key: 'Item 14',
    data: 5
  },
  {
    key: 'Item 15',
    data: 12
  },
  {
    key: 'Item 16',
    data: 1
  },
  {
    key: 'Item 17',
    data: 7
  },
  {
    key: 'Item 18',
    data: 7
  },
  {
    key: 'Item 19',
    data: 12
  },
  {
    key: 'Item 20',
    data: 1
  },
  {
    key: 'Item 21',
    data: 5
  },
  {
    key: 'Item 22',
    data: 0
  },
  {
    key: 'Item 23',
    data: 1
  },
  {
    key: 'Item 24',
    data: 0
  },
  {
    key: 'Item 25',
    data: 11
  },
  {
    key: 'Item 26',
    data: 17
  },
  {
    key: 'Item 27',
    data: 17
  },
  {
    key: 'Item 28',
    data: 11
  },
  {
    key: 'Item 29',
    data: 8
  },
  {
    key: 'Item 30',
    data: 7
  },
  {
    key: 'Item 31',
    data: 13
  },
  {
    key: 'Item 32',
    data: 7
  },
  {
    key: 'Item 33',
    data: 3
  },
  {
    key: 'Item 34',
    data: 9
  },
  {
    key: 'Item 35',
    data: 16
  },
  {
    key: 'Item 36',
    data: 11
  },
  {
    key: 'Item 37',
    data: 8
  },
  {
    key: 'Item 38',
    data: 12
  },
  {
    key: 'Item 39',
    data: 7
  },
  {
    key: 'Item 40',
    data: 4
  },
  {
    key: 'Item 41',
    data: 5
  },
  {
    key: 'Item 42',
    data: 11
  },
  {
    key: 'Item 43',
    data: 17
  },
  {
    key: 'Item 44',
    data: 11
  },
  {
    key: 'Item 45',
    data: 1
  },
  {
    key: 'Item 46',
    data: 10
  },
  {
    key: 'Item 47',
    data: 10
  },
  {
    key: 'Item 48',
    data: 12
  },
  {
    key: 'Item 49',
    data: 3
  },
  {
    key: 'Item 50',
    data: 14
  }
];

const nestedData: ChartNestedDataShape[] = [
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

export const Nested = () => (
  <TreeMap
    id="nested"
    height={450}
    width={450}
    data={nestedData}
    series={<TreeMapSeries colorScheme="cybertron" />}
  />
);
Nested.tags = ['no-snapshot'];
