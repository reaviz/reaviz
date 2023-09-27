import { timeDay } from 'd3-time';
import {
  singleDateData,
  singleDateBigIntData,
  nonZeroDateData
} from '../../demo';
import { AreaChart } from './AreaChart';
import { range } from 'd3-array';
import {
  AreaSeries,
  Area,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries
} from './AreaSeries';
import { LinearXAxis, LinearXAxisTickSeries } from '../common/Axis/LinearAxis';
import { Gradient, GradientStop } from '../common/Gradient';
import { Stripes } from '../common/Mask';
import { ChartDataShape } from '../common/data';
import { Marker } from '../common';
import { MarkerLabel } from '../common/MarkerLabel';

export default {
  title: 'Charts/Area Chart/Single Series',
  component: AreaChart,
  subcomponents: {
    AreaSeries,
    Area,
    Line,
    PointSeries,
    StackedAreaSeries,
    StackedNormalizedAreaSeries
  }
};

/* Modified currently to test Markers, will undo once Markers are set */
export const Simple = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        interpolation="linear"
        colorScheme="cybertron"
        line={<Line strokeWidth={4} />}
        markers={[
          <Marker
            value={50}
            color="blue"
            label={
              <MarkerLabel color="white" position="center" text="Test Label" />
            }
          />
        ]}
      />
    }
  />
);

<AreaChart
  width={350}
  height={250}
  data={singleDateData}
  series={
    <AreaSeries
      interpolation="linear"
      colorScheme="cybertron"
      line={<Line strokeWidth={4} />}
      markers={[
        <Marker
          value={50}
          color="blue"
          label={
            <MarkerLabel color="white" position="center" text="Test Label" />
          }
        />
      ]}
    />
  }
/>;

export const Masks = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        area={
          <Area
            mask={<Stripes />}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="10%" stopOpacity={0} />,
                  <GradientStop offset="80%" stopOpacity={1} />
                ]}
              />
            }
          />
        }
        line={<Line strokeWidth={3} />}
      />
    }
  />
);

export const NoAnimation = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries animated={false} />}
  />
);

export const NonZero = () => (
  <AreaChart
    width={350}
    height={250}
    data={nonZeroDateData as ChartDataShape[]}
  />
);

NonZero.story = {
  name: 'Non-Zero'
};

export const Interval = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    xAxis={
      <LinearXAxis
        type="time"
        tickSeries={<LinearXAxisTickSeries interval={timeDay} />}
      />
    }
  />
);

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <AreaChart data={singleDateData} />
  </div>
);

export const SingleValue = () => (
  <AreaChart data={[singleDateData[0]]} width={350} height={250} />
);

export const Performance = () =>
  range(15).map((i) => (
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
      <AreaChart data={singleDateData} />
    </div>
  ));

export const BigInt = () => (
  <AreaChart width={350} height={250} data={singleDateBigIntData} />
);
