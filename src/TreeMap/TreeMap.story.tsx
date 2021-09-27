import React from 'react';
import { ChartShallowDataShape } from '../common/data';
import { TreeMap } from './TreeMap';

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
