import React from 'react';
import { BarList } from './BarList';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar List/Sort',
  component: BarList
};

export const Ascending = () => (
  <BarList
    sortDirection="asc"
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
  />
);

export const Descending = () => (
  <BarList
    sortDirection="desc"
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
  />
);

export const None = () => (
  <BarList
    sortDirection="none"
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
  />
);
