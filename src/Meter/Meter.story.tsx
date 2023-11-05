import React from 'react';
import { Meter } from './Meter';

export default {
  title: 'Charts/Meter',
  component: Meter
};

export const Basic = () => <Meter value={50} style={{ width: 300 }} />;

export const MinMax = () => <Meter value={40} style={{ width: 300 }} min={0} max={50} />;
