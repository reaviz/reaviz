import { categoryData, medDateData, multiCategory } from 'reaviz-data-utils';
import {
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisTickLine,
  RadialAxisTickSeries
} from '@/common/Axis';
import { RadialAreaChart } from './RadialAreaChart';
import {
  RadialArea,
  RadialAreaSeries,
  RadialLine,
  RadialPointSeries
} from './RadialAreaSeries';

export default {
  tags: ['snapshot'],
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
    id="simple"
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
      <RadialAxis>
        <RadialAxisArcSeries count={5} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="outside" />
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
    series={<RadialAreaSeries area={null} />}
    axis={<RadialAxis type="category" />}
  />
);

export const MultiSeries = () => (
  <RadialAreaChart
    id="multi-series"
    data={multiCategory}
    height={500}
    width={500}
    series={<RadialAreaSeries area={null} type="grouped" />}
    axis={<RadialAxis type="category" />}
  />
);
