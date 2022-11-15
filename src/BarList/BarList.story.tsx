import React from 'react';
import { BarList } from './BarList';
import { BarListSeries } from './BarListSeries';

export default {
  title: 'Charts/Bar List',
  component: BarList
};

export const Simple = () => (
  <BarList
    style={{ width: 350 }}
    data={[
      { key: 'Vulnerability Patch', data: 50 },
      { key: 'Critical Failure', data: 25 },
      { key: 'Physical Intrusion', data: 5 },
      { key: 'Phishing Attempts', data: 100 }
    ]}
  />
);

export const Styling = () => (
  <>
    <style>
      {`
        .bar {
          border-radius: 5px;
        }
        .outer {
          background: rgba(0, 0, 0, .2);
          border-radius: 5px;
        }
        .value {
          opacity: .5;
        }
      `}
    </style>
    <BarList
      style={{ width: 350 }}
      data={[
        { key: 'Vulnerability Patch', data: 50 },
        { key: 'Critical Failure', data: 25 },
        { key: 'Physical Intrusion', data: 5 },
        { key: 'Phishing Attempts', data: 100 }
      ]}
      series={
        <BarListSeries
          barClassName="bar"
          outerBarClassName="outer"
          valueClassName="value"
          labelPosition="end"
        />
      }
    />
  </>
);

export const Events = () => (
  <>
    <BarList
      style={{ width: 350 }}
      data={[
        { key: 'Vulnerability Patch', data: 50 },
        { key: 'Critical Failure', data: 25 },
        { key: 'Physical Intrusion', data: 5 },
        { key: 'Phishing Attempts', data: 100 }
      ]}
      series={
        <BarListSeries
          onItemClick={(d) => alert(`Clicked ${d.key}`)}
          outerBarClassName="outer"
          labelPosition="end"
        />
      }
    />
  </>
);

export const Format = () => (
  <>
    <style>
      {`
        .value {
          width: 40px;
        }
      `}
    </style>
    <BarList
      style={{ width: 350 }}
      data={[
        { key: 'Vulnerability Patch', data: 50 },
        { key: 'Critical Failure', data: 25 },
        { key: 'Physical Intrusion', data: 5 },
        { key: 'Phishing Attempts', data: 100 }
      ]}
      series={
        <BarListSeries
          valueFormat={(data) => `${data}%`}
          onItemClick={(d) => alert(`Clicked ${d.key}`)}
          labelPosition="end"
          valueClassName="value"
        />
      }
    />
  </>
);
