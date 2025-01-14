import React from 'react';
import { BarList } from './BarList';
import { BarListSeries } from './BarListSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar List/Labels',
  component: BarList
};

export const LabelStart = () => (
  <BarList
    id="label-start"
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
    id="label-bottom"
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
    id="label-end"
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
    id="label-top"
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
    id="label-none"
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
    id="value-bottom"
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
    id="value-end"
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 100 },
      { key: 'Critical Failure', data: 55 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 200 }
    ]}
    series={<BarListSeries valuePosition="end" />}
  />
);

export const ValueStart = () => (
  <BarList
    id="value-start"
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
    id="value-none"
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
    id="long-value-start"
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
    id="long-value-end"
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
