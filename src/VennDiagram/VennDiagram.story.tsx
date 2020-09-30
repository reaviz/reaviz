import React from 'react';
import { storiesOf } from '@storybook/react';
import { VennDiagram } from './VennDiagram';

storiesOf('Charts/Venn Diagram', module)
  .add('Simple', () => (
    <VennDiagram
      height={300}
      width={300}
      data={[
        { key: ['A'], data: 12 },
        { key: ['B'], data: 12 },
        { key: ['A', 'B'], data: 2 },
      ]}
    />
  ))
  .add('Large Offsets', () => (
    <VennDiagram
      height={300}
      width={300}
      data={[
        { key: ['A'], data: 50 },
        { key: ['B'], data: 12 },
        { key: ['A', 'B'], data: 5 },
      ]}
    />
  ))
  .add('Many Intersections', () => (
    <VennDiagram
      height={300}
      width={300}
      data={[
        { key: ['A'], data: 22 },
        { key: ['B'], data: 12 },
        { key: ['C'], data: 13 },
        { key: ['D'], data: 22 },
        { key: ['D', 'C'], data: 7 },
        { key: ['B', 'C', 'D'], data: 11 },
        { key: ['A', 'B'], data: 3 },
        { key: ['A', 'B', 'C'], data: 5 }
      ]}
    />
  ))
  .add('No Intersections', () => (
    <VennDiagram
      height={300}
      width={300}
      data={[
        { key: ['A'], data: 22 },
        { key: ['B'], data: 12 },
        { key: ['C'], data: 13 },
        { key: ['D'], data: 22 }
      ]}
    />
  ))
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <VennDiagram
        data={[
          { key: ['A'], data: 12 },
          { key: ['B'], data: 12 },
          { key: ['A', 'B'], data: 2 },
        ]}
      />
    </div>
  ));
