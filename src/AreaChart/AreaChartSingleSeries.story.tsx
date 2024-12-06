import { timeDay } from 'd3-time';
import {
  singleDateData,
  singleDateBigIntData,
  nonZeroDateData
} from 'reaviz-data-utils';
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
import { LinearXAxis, LinearXAxisTickSeries } from '@/common/Axis/LinearAxis';
import { Gradient, GradientStop } from '@/common/Gradient';
import { Stripes } from '@/common/Mask';
import { ChartDataShape } from '@/common/data';

export default {
  tags: ['snapshot'],
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
      />
    }
  />
);

export const Masks = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        interpolation="smooth"
        area={
          <Area
            mask={<Stripes />}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="0%" stopOpacity={0.2} />,
                  <GradientStop offset="50%" stopOpacity={1} />
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

export const Interpolation = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    <div>
      <h1>Smooth</h1>
      <AreaChart
        width={350}
        height={250}
        data={singleDateData}
        series={<AreaSeries interpolation="smooth" />}
      />
    </div>
    <div>
      <h1>Step</h1>
      <AreaChart
        width={350}
        height={250}
        data={singleDateData}
        series={<AreaSeries interpolation="step" />}
      />
    </div>
  </div>
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
  <AreaChart
    id="big-int"
    width={350}
    height={250}
    data={singleDateBigIntData}
  />
);
