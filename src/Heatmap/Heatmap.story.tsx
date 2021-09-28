import React from 'react';
import { Heatmap } from './Heatmap';
import {
  heatmapSimpleData
} from '../../demo';
import { SequentialLegend } from '../common/legends/SequentialLegend/SequentialLegend';
import { number, object, select } from '@storybook/addon-knobs';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';
import { schemes } from '../common/color';
import { getYScale } from '../common/scales';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '../common/Axis';

export default {
  title: 'Charts/Heatmap/Simple',
  component: Heatmap,
  subcomponents: {
    HeatmapSeries,
    HeatmapCell
  }
};

export const Basic = () => {
    const height = number('Height', 250);
    const width = number('Width', 400);
    const color = select('Color Scheme', schemes, 'OrRd');
    const data = object('Data', heatmapSimpleData);

    return (
      <Heatmap
        height={height}
        width={width}
        data={data}
        series={<HeatmapSeries colorScheme={color} />}
      />
    );
  };

export const BasicLegend = () => (
    <div style={{ display: 'flex', height: '250px' }}>
      <Heatmap height={250} width={400} data={heatmapSimpleData} />
      <SequentialLegend
        data={heatmapSimpleData}
        style={{ height: '165px', marginLeft: '10px' }}
      />
    </div>
  );

BasicLegend.story = {
  name: 'Basic + Legend',
};

export const MultiAxis = () => {
    const scale = getYScale({
      type: 'category',
      height: 190,
      data: [
        {
          key: 'Before',
          data: 0,
          y: 'Before'
        },
        {
          key: 'After',
          data: 0,
          y: 'After'
        }
      ]
    });

    return (
      <Heatmap
        height={250}
        width={400}
        margins={0}
        data={heatmapSimpleData}
        secondaryAxis={[
          <LinearYAxis
            type="category"
            scale={scale}
            axisLine={null}
            position="end"
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={<LinearYAxisTickLabel padding={10} position="end" />}
              />
            }
          />
        ]}
      />
    );
  };
