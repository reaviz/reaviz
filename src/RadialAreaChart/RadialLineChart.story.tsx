import { RadialAreaChart } from './RadialAreaChart';
import { medDateData, categoryData, multiCategory } from '../../demo';
import {
  RadialArea,
  RadialAreaSeries,
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
} from '../common/Axis';

export default {
  title: 'Charts/Line Chart/Radial',
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
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        area={null}
        colorScheme="cybertron"
        animated
        interpolation="smooth"
      />
    }
    axis={
      <RadialAxis
        arcs={<RadialAxisArcSeries count={5} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="outside" />}
                label={<RadialAxisTickLabel autoRotate />}
              />
            }
          />
        }
      />
    }
  />
);

export const CategoricalData = () => (
  <RadialAreaChart
    data={categoryData}
    height={500}
    width={500}
    series={<RadialAreaSeries area={null} />}
    axis={<RadialAxis type="category" />}
  />
);

export const MultiSeries = () => (
  <RadialAreaChart
    data={multiCategory}
    height={500}
    width={500}
    series={<RadialAreaSeries area={null} type="grouped" />}
    axis={<RadialAxis type="category" />}
  />
);

export const SemiCircle = () => (
  <RadialAreaChart
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        area={null}
        colorScheme="cybertron"
        animated
        interpolation="smooth"
      />
    }
    axis={
      <RadialAxis
        arcs={<RadialAxisArcSeries count={5} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="outside" />}
                label={<RadialAxisTickLabel autoRotate />}
              />
            }
          />
        }
      />
    }
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const SemiCircleMultiSeries = () => (
  <RadialAreaChart
    data={multiCategory}
    height={500}
    width={500}
    series={<RadialAreaSeries area={null} type="grouped" interpolation="linear" />}
    axis={<RadialAxis type="category" />}
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);