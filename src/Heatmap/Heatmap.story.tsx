import { Heatmap } from './Heatmap';
import { heatmapSimpleData } from 'reaviz-data-utils';
import { SequentialLegend } from '@/common/legends/SequentialLegend/SequentialLegend';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';
import { getYScale } from '@/common/scales';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '@/common/Axis';

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
    height={250}
    width={400}
    data={heatmapSimpleData}
    series={<HeatmapSeries colorScheme="OrRd" />}
  />
);

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

export const Symbols = () => (
  <Heatmap
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
