import React from 'react';
import { HivePlot } from './HivePlot';
import { nodes, links } from '../../demo';
import { range } from 'd3-array';

export default {
  title: 'Charts/Hive Plot',
  component: HivePlot
};

export const Mini = () => (
  <HivePlot
    height={250}
    width={250}
    axis={[
      { label: 'Severity', attribute: 'severity' },
      { label: 'Stage', attribute: 'category' },
      { label: 'Time', attribute: 'timestamp' }
    ]}
    label={{ show: false }}
    disabled={true}
    nodes={nodes}
    links={links}
  />
);

export const Large = () => (
  <HivePlot
    height={500}
    width={500}
    axis={[
      { label: 'Severity', attribute: 'severity' },
      { label: 'Stage', attribute: 'category' },
      { label: 'Time', attribute: 'timestamp' }
    ]}
    nodes={nodes}
    links={links}
  />
);

export const AutoSize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <HivePlot
      axis={[
        { label: 'Severity', attribute: 'severity' },
        { label: 'Stage', attribute: 'category' },
        { label: 'Time', attribute: 'timestamp' }
      ]}
      nodes={nodes}
      links={links}
    />
  </div>
);

AutoSize.story = {
  name: 'AutoSize'
};

export const Performance = () =>
  range(20).map((i) => (
    <div
      key={i}
      style={{
        width: '250px',
        height: '250px',
        border: 'solid 1px green',
        margin: '25px',
        display: 'inline-block'
      }}
    >
      <HivePlot
        axis={[
          { label: 'Severity', attribute: 'severity' },
          { label: 'Stage', attribute: 'category' },
          { label: 'Time', attribute: 'timestamp' }
        ]}
        height={250}
        width={250}
        nodes={nodes}
        links={links}
      />
    </div>
  ));
