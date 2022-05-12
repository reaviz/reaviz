import React from 'react';
import { Count } from './Count';

export default {
  title: 'Utils/Count',
  component: Count
};

export const Simple = () => (
  <h1 style={{ color: 'white ' }}>
    <Count from={0} to={50} />
  </h1>
);

export const NonZeroStart = () => (
  <h1 style={{ color: 'white ' }}>
    <Count from={33} to={50} />
  </h1>
);
