import React from 'react';
import { storiesOf } from '@storybook/react';
import { HivePlot } from './HivePlot';
import { nodes, links } from '../../demo';
import { range } from 'd3-array';

storiesOf('Charts|Hive Plot', module)
  .add('Mini', () => (
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
  ))
  .add('Large', () => (
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
  ))
  .add('Autosize', () => (
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
  ))
  .add('Performance', () =>
    range(20).map(i => (
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
    ))
  );
