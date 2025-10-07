import React from 'react';

import { DiscreteLegend } from './DiscreteLegend';
import { DiscreteLegendEntry } from './DiscreteLegendEntry';

export default {
  title: 'Utils/Legend/Discrete/Vertical'
};

export const Simple = () => (
  <DiscreteLegend
    style={{ width: '200px' }}
    entries={[
      <DiscreteLegendEntry key="green" label="DLP" color="green" />,
      <DiscreteLegendEntry key="blue" label="SIEM" color="blue" />,
      <DiscreteLegendEntry key="yellow" label="AWS" color="yellow" />,
      <DiscreteLegendEntry key="purple" label="AD" color="purple" />
    ]}
  />
);
