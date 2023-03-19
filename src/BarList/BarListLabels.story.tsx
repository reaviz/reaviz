import React from 'react';
import { BarList } from './BarList';
import { BarListSeries } from './BarListSeries';

export default {
  title: 'Charts/Bar List/Labels',
  component: BarList
};

export const LabelStart = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries labelPosition="start" valuePosition="end" />}
  />
);

export const LabelBottom = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries labelPosition="bottom" valuePosition="end" />}
  />
);

export const LabelEnd = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries labelPosition="end" valuePosition="start" />}
  />
);

export const LabelTop = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries labelPosition="top" />}
  />
);

export const LabelNone = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries labelPosition="none" valuePosition="end" />}
  />
);

export const ValueBottom = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries valuePosition="bottom" />}
  />
);

export const ValueEnd = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries valuePosition="end" />}
  />
);

export const ValueStart = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries valuePosition="start" />}
  />
);

export const ValueNone = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
    series={<BarListSeries valuePosition="none" />}
  />
);

export const LongValueStart = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 5000 },
      { key: 'Critical Failure', data: 50000 },
      { key: 'Physical Intrusion', data: 500000 },
      { key: 'Phishing Attempts', data: 5000000 }
    ]}
    series={<BarListSeries valuePosition="start" />}
  />
);

export const LongValueEnd = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 5000 },
      { key: 'Critical Failure', data: 50000 },
      { key: 'Physical Intrusion', data: 500000 },
      { key: 'Phishing Attempts', data: 5000000 }
    ]}
    series={<BarListSeries valuePosition="end" />}
  />
);
