import React from 'react';
import { Meter } from './Meter';

export default {
  title: 'Charts/Meter',
  component: Meter
};

export const Basic = () => <Meter value={50} style={{ width: 300 }} />;
