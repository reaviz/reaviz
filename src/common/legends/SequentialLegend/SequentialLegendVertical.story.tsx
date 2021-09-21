import React from 'react';
import { SequentialLegend } from './SequentialLegend';
import { heatmapSimpleData } from '../../../../demo';

export default {
  title: 'Utils/Legend/Sequential/Vertical',
};

export const Simple = () => (
    <div style={{ height: '250px' }}>
      <SequentialLegend data={heatmapSimpleData} />
    </div>
  );

export const LongText = () => (
    <div style={{ height: '250px' }}>
      <SequentialLegend
        data={[
          { key: 'Foo', data: 50000000 },
          { key: 'Bar', data: 0 }
        ]}
      />
    </div>
  );

export const CustomColors = () => (
    <div style={{ height: '250px' }}>
      <SequentialLegend
        data={heatmapSimpleData}
        colorScheme={['rgb(255, 248, 225)', 'rgb(255, 111, 0)']}
      />
    </div>
  );
