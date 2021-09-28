import React from 'react';
import { TreeMapSeries } from '..';
import { ChartShallowDataShape } from '../common/data';
import { TreeMap } from './TreeMap';
import { TreeMapRect } from './TreeMapRect';
import { range } from 'd3-array';
import { randomNumber } from '../../demo';

export default {
  title: 'Charts/TreeMap',
};

const simpleData: ChartShallowDataShape[] = [
  { key: 'AWS', data: 100 },
  { key: 'SendGrid', data: 45 },
  { key: 'Okta', data: 75 },
  { key: 'Twillo', data: 25 }
];

export const Simple = () => (
  <TreeMap
    height={400}
    width={400}
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

export const _20Items = () => {
  const longData: ChartShallowDataShape[] = range(50).map((o) => ({
    key: `${o + 1}`,
    data: randomNumber(0, 20)
  }));

  return <TreeMap data={longData} height={600} width={600} />;
};

export const _100Items = () => {
  const longData: ChartShallowDataShape[] = range(100).map((o) => ({
    key: `${o + 1}`,
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
