import { RadialAreaChart } from './RadialAreaChart';
import { medDateData, categoryData, multiCategory } from 'reaviz-data-utils';
import {
  RadialAreaSeries,
  RadialArea,
  RadialLine,
  RadialPointSeries
} from './RadialAreaSeries';
import {
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisArcSeries,
  RadialAxisTickLine
} from '@/common/Axis';
import { GradientStop, RadialGradient } from '@/common/Gradient';

export default {
  tags: ['snapshot'],
  title: 'Charts/Area Chart/Radial',
  component: RadialAreaChart,
  subcomponents: {
    RadialAreaSeries,
    RadialArea,
    RadialLine,
    RadialPointSeries
  }
};

export const Simple = () => (
  <RadialAreaChart
    id="simple"
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        colorScheme="cybertron"
        animated
        interpolation="smooth"
        area={<RadialArea gradient={<RadialGradient />} />}
      />
    }
    axis={
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
            <RadialAxisTickLabel autoRotate />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
  />
);

export const CategoricalData = () => (
  <RadialAreaChart
    id="categorical"
    data={categoryData}
    height={500}
    width={500}
    axis={<RadialAxis type="category" />}
  />
);

export const Resizable = () => (
  <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
    <RadialAreaChart id="resizable" data={medDateData} />
  </div>
);

export const MultiSeries = () => (
  <RadialAreaChart
    id="multi-series"
    data={multiCategory}
    height={500}
    width={500}
    series={
      <RadialAreaSeries
        type="grouped"
        area={
          <RadialArea
            gradient={
              <RadialGradient
                stops={[
                  <GradientStop offset="0%" stopOpacity={0.1} key="start" />,
                  <GradientStop offset="80%" stopOpacity={0.3} key="stop" />
                ]}
              />
            }
          />
        }
      />
    }
    axis={<RadialAxis type="category" />}
  />
);
