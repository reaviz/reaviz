import React from 'react';
import { TreeMapSeries } from './TreeMapSeries';
import { ChartShallowDataShape } from '../common/data';
import { TreeMap } from './TreeMap';
import { TreeMapRect } from './TreeMapRect';
import { range } from 'd3-array';
import { randomNumber } from '../../demo';
import { schemes } from '../common/color';
import { number, object, select } from '@storybook/addon-knobs';
import { TreeMapLabel } from './TreeMapLabel';

export default {
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

export const Simple = () => {
  const scheme = select('Color Scheme', schemes, 'cybertron');
  const height = number('Height', 450);
  const width = number('Width', 450);
  const data = object('Data', simpleData);

  return (
    <TreeMap
      height={height}
      width={width}
      data={data}
      series={<TreeMapSeries colorScheme={scheme} />}
    />
  );
};

export const NoAnimation = () => (
  <TreeMap
    height={400}
    width={400}
    series={<TreeMapSeries animated={false} />}
    data={simpleData}
  />
);

export const _20Items = () => <TreeMap data={twentyItems} height={600} width={600} />;

export const _100Items = () => {
  const longData: ChartShallowDataShape[] = range(100).map((o) => ({
    key: `Item ${o + 1}`,
    data: randomNumber(0, 100)
  }));

  return <TreeMap data={longData} height={600} width={600} />;
};

export const Events = () => (
  <TreeMap
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

const twentyItems = [
  {
      "key": "Item 1",
      "data": 3
  },
  {
      "key": "Item 2",
      "data": 12
  },
  {
      "key": "Item 3",
      "data": 11
  },
  {
      "key": "Item 4",
      "data": 13
  },
  {
      "key": "Item 5",
      "data": 12
  },
  {
      "key": "Item 6",
      "data": 8
  },
  {
      "key": "Item 7",
      "data": 10
  },
  {
      "key": "Item 8",
      "data": 17
  },
  {
      "key": "Item 9",
      "data": 2
  },
  {
      "key": "Item 10",
      "data": 4
  },
  {
      "key": "Item 11",
      "data": 0
  },
  {
      "key": "Item 12",
      "data": 15
  },
  {
      "key": "Item 13",
      "data": 12
  },
  {
      "key": "Item 14",
      "data": 5
  },
  {
      "key": "Item 15",
      "data": 12
  },
  {
      "key": "Item 16",
      "data": 1
  },
  {
      "key": "Item 17",
      "data": 7
  },
  {
      "key": "Item 18",
      "data": 7
  },
  {
      "key": "Item 19",
      "data": 12
  },
  {
      "key": "Item 20",
      "data": 1
  },
  {
      "key": "Item 21",
      "data": 5
  },
  {
      "key": "Item 22",
      "data": 0
  },
  {
      "key": "Item 23",
      "data": 1
  },
  {
      "key": "Item 24",
      "data": 0
  },
  {
      "key": "Item 25",
      "data": 11
  },
  {
      "key": "Item 26",
      "data": 17
  },
  {
      "key": "Item 27",
      "data": 17
  },
  {
      "key": "Item 28",
      "data": 11
  },
  {
      "key": "Item 29",
      "data": 8
  },
  {
      "key": "Item 30",
      "data": 7
  },
  {
      "key": "Item 31",
      "data": 13
  },
  {
      "key": "Item 32",
      "data": 7
  },
  {
      "key": "Item 33",
      "data": 3
  },
  {
      "key": "Item 34",
      "data": 9
  },
  {
      "key": "Item 35",
      "data": 16
  },
  {
      "key": "Item 36",
      "data": 11
  },
  {
      "key": "Item 37",
      "data": 8
  },
  {
      "key": "Item 38",
      "data": 12
  },
  {
      "key": "Item 39",
      "data": 7
  },
  {
      "key": "Item 40",
      "data": 4
  },
  {
      "key": "Item 41",
      "data": 5
  },
  {
      "key": "Item 42",
      "data": 11
  },
  {
      "key": "Item 43",
      "data": 17
  },
  {
      "key": "Item 44",
      "data": 11
  },
  {
      "key": "Item 45",
      "data": 1
  },
  {
      "key": "Item 46",
      "data": 10
  },
  {
      "key": "Item 47",
      "data": 10
  },
  {
      "key": "Item 48",
      "data": 12
  },
  {
      "key": "Item 49",
      "data": 3
  },
  {
      "key": "Item 50",
      "data": 14
  }
];
