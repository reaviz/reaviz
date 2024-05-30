import { medDateData, multiCategory } from '@demo/index';
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
    startAngle={-0.25 * Math.PI}
    endAngle={0.25 * Math.PI}
    isClosedCurve={false}
  />
);
