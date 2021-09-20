import React from 'react';
import { DiscreteLegend } from './DiscreteLegend';
import { DiscreteLegendEntry } from './DiscreteLegendEntry';

export default {
  title: 'Utils/Legend/Discrete/Vertical',
};

export const Simple = () => (
  <DiscreteLegend
    style={{ width: '200px' }}
    entries={[
      <DiscreteLegendEntry label="DLP" color="green" />,
      <DiscreteLegendEntry label="SIEM" color="blue" />,
      <DiscreteLegendEntry label="AWS" color="yellow" />,
      <DiscreteLegendEntry label="AD" color="purple" />
    ]}
  />
);

export default {
  title: 'Utils/Legend/Discrete/Horizontal',
};

export const _Simple = () => (
    <DiscreteLegend
      orientation="horizontal"
      entries={[
        <DiscreteLegendEntry label="DLP" color="green" />,
        <DiscreteLegendEntry label="SIEM" color="blue" />,
        <DiscreteLegendEntry label="AWS" color="yellow" />,
        <DiscreteLegendEntry label="AD" color="purple" />
      ]}
    />
  );

export const LabelsVerticals = () => (
    <DiscreteLegend
      orientation="horizontal"
      entries={[
        <DiscreteLegendEntry
          label="DLP"
          color="green"
          orientation="vertical"
        />,
        <DiscreteLegendEntry
          label="SIEM"
          color="blue"
          orientation="vertical"
        />,
        <DiscreteLegendEntry
          label="AWS"
          color="yellow"
          orientation="vertical"
        />,
        <DiscreteLegendEntry label="AD" color="purple" orientation="vertical" />
      ]}
    />
  );
