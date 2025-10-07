import { heatmapSimpleData } from 'reaviz-data-utils';

import {
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries
} from '@/common/Axis';
import { SequentialLegend } from '@/common/legends/SequentialLegend/SequentialLegend';
import { getYScale } from '@/common/scales';

import { Heatmap } from './Heatmap';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Heatmap/Simple',
  component: Heatmap,
  subcomponents: {
    HeatmapSeries,
    HeatmapCell
  }
};

export const Basic = () => (
  <Heatmap
    id="basic"
    height={250}
    width={400}
    data={heatmapSimpleData}
    series={<HeatmapSeries colorScheme="OrRd" />}
  />
);

export const BasicLegend = () => (
  <div style={{ display: 'flex', height: '250px' }}>
    <Heatmap
      id="basic-legend"
      height={250}
      width={400}
      data={heatmapSimpleData}
    />
    <SequentialLegend
      data={heatmapSimpleData}
      style={{ height: '165px', marginLeft: '10px' }}
    />
  </div>
);

BasicLegend.story = {
  name: 'Basic + Legend'
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
      id="multi-axis"
      height={250}
      width={400}
      margins={0}
      data={heatmapSimpleData}
      secondaryAxis={[
        <LinearYAxis
          key="category"
          type="category"
          scale={scale}
          axisLine={null}
          position="end"
          tickSeries={
            <LinearYAxisTickSeries
              line={null}
              label={
                <LinearYAxisTickLabel
                  {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
                  padding={10}
                  position="end"
                />
              }
            />
          }
        />
      ]}
    />
  );
};

export const Symbols = () => (
  <Heatmap
    id="symbols"
    height={230}
    width={230}
    data={heatmapSimpleData}
    series={
      <HeatmapSeries
        cell={
          <HeatmapCell
            symbol={() => <circle r={14} transform={'translate(14, 14)'} />}
          />
        }
        colorScheme="OrRd"
      />
    }
  />
);
