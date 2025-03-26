import { Heatmap } from './Heatmap';
import { heatmapSimpleData } from 'reaviz-data-utils';
import { SequentialLegend } from '@/common/legends/SequentialLegend/SequentialLegend';
import { HeatmapCell, HeatmapSeries } from './HeatmapSeries';
import { getYScale } from '@/common/scales';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS
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
    id="basic"
    height={250}
    width={400}
    data={heatmapSimpleData}
    series={<HeatmapSeries colorScheme="OrRd" />}
    yAxis={
      <LinearYAxis type="category">
        <LinearYAxisTickSeries>
          <LinearYAxisTickLabel
            {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
            padding={5}
          />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
    xAxis={
      <LinearXAxis type="category">
        <LinearXAxisTickSeries>
          <LinearXAxisTickLabel
            {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
            padding={5}
          />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
  />
);

export const BasicLegend = () => (
  <div style={{ display: 'flex', height: '250px' }}>
    <Heatmap
      id="basic-legend"
      height={250}
      width={400}
      data={heatmapSimpleData}
      yAxis={
        <LinearYAxis type="category">
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      xAxis={
        <LinearXAxis type="category">
          <LinearXAxisTickSeries>
            <LinearXAxisTickLabel
              {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
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
      yAxis={
        <LinearYAxis type="category">
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
      xAxis={
        <LinearXAxis type="category">
          <LinearXAxisTickSeries>
            <LinearXAxisTickLabel
              {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={5}
            />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
      secondaryAxis={[
        <LinearYAxis
          type="category"
          scale={scale}
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
        >
          <LinearYAxisTickSeries>
            <LinearYAxisTickLabel
              {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              padding={10}
              position="end"
            />
          </LinearYAxisTickSeries>
        </LinearYAxis>
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
    yAxis={
      <LinearYAxis type="category">
        <LinearYAxisTickSeries>
          <LinearYAxisTickLabel
            {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
            padding={5}
          />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
    xAxis={
      <LinearXAxis type="category">
        <LinearXAxisTickSeries>
          <LinearXAxisTickLabel
            {...LINEAR_X_AXIS_TICK_LABEL_DEFAULT_PROPS}
            padding={5}
          />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
  />
);
