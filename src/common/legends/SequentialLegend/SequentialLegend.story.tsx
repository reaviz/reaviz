import React from 'react';
import { storiesOf } from '@storybook/react';
import { SequentialLegend } from './SequentialLegend';
import { heatmapSimpleData } from '../../../../demo';

storiesOf('Charts|Legend/Sequential/Vertical', module)
  .add('Simple', () => (
    <div style={{ height: '250px' }}>
      <SequentialLegend data={heatmapSimpleData} />
    </div>
  ))
  .add('Long Text', () => (
    <div style={{ height: '250px' }}>
      <SequentialLegend
        data={[{ key: 'Foo', data: 50000000 }, { key: 'Bar', data: 0 }]}
      />
    </div>
  ))
  .add('Custom Colors', () => (
    <div style={{ height: '250px' }}>
      <SequentialLegend
        data={heatmapSimpleData}
        colorScheme={['rgb(255, 248, 225)', 'rgb(255, 111, 0)']}
      />
    </div>
  ));

storiesOf('Charts|Legend/Sequential/Horizontal', module)
  .add('Simple', () => (
    <div style={{ width: '250px' }}>
      <SequentialLegend data={heatmapSimpleData} orientation="horizontal" />
    </div>
  ))
  .add('Long Text', () => (
    <div style={{ width: '250px' }}>
      <SequentialLegend
        orientation="horizontal"
        data={[{ key: 'Foo', data: 50000000 }, { key: 'Bar', data: 0 }]}
      />
    </div>
  ))
  .add('Custom Colors', () => (
    <div style={{ width: '250px' }}>
      <SequentialLegend
        data={heatmapSimpleData}
        orientation="horizontal"
        colorScheme={['rgb(255, 248, 225)', 'rgb(255, 111, 0)']}
      />
    </div>
  ));
