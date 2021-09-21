import React from 'react';
import { SequentialLegend } from './SequentialLegend';
import { heatmapSimpleData } from '../../../../demo';

export default {
  title: 'Utils/Legend/Sequential/Horizontal',
};

export const Simple = () => (
    <div style={{ width: '250px' }}>
      <SequentialLegend data={heatmapSimpleData} orientation="horizontal" />
    </div>
  );

export const _LongText = () => (
    <div style={{ width: '250px' }}>
      <SequentialLegend
        orientation="horizontal"
        data={[
          { key: 'Foo', data: 50000000 },
          { key: 'Bar', data: 0 }
        ]}
      />
    </div>
  );

export const _CustomColors = () => (
    <div style={{ width: '250px' }}>
      <SequentialLegend
        data={heatmapSimpleData}
        orientation="horizontal"
        colorScheme={['rgb(255, 248, 225)', 'rgb(255, 111, 0)']}
      />
    </div>
  );
