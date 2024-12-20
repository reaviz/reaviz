import { medDateData, multiCategory } from 'reaviz-data-utils';
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
  title: 'Charts/Line Chart/Radial/Axis',
  component: RadialAreaChart,
  subcomponents: {
    RadialAreaSeries,
    RadialArea,
    RadialLine,
    RadialPointSeries
  }
};

export const SemiCircle = () => (
  <RadialAreaChart
    id="semi-circle"
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
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const SemiCircleMultiSeries = () => (
  <RadialAreaChart
    id="semi-circle-multi-series"
    data={multiCategory}
    height={500}
    width={500}
    series={
      <RadialAreaSeries area={null} type="grouped" interpolation="linear" />
    }
    axis={<RadialAxis type="category" />}
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const Custom = () => (
  <RadialAreaChart
    id="custom"
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
    startAngle={-0.25 * Math.PI}
    endAngle={0.25 * Math.PI}
    isClosedCurve={false}
  />
);
