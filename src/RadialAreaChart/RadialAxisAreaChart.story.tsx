import { medDateData, multiCategory } from 'reaviz-data-utils';
import {
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisTickLine,
  RadialAxisTickSeries
} from '@/common/Axis';
import { GradientStop, RadialGradient } from '@/common/Gradient';
import { RadialAreaChart } from './RadialAreaChart';
import {
  RadialArea,
  RadialAreaSeries,
  RadialLine,
  RadialPointSeries
} from './RadialAreaSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Area Chart/Radial/Axis',
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
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const SemiCircleMultiSeries = () => (
  <RadialAreaChart
    id="multi-series"
    data={multiCategory}
    height={500}
    width={500}
    series={
      <RadialAreaSeries
        type="grouped"
        interpolation="linear"
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
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const QuarterCircle = () => (
  <RadialAreaChart
    id="quarter-circle"
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        colorScheme="cybertron"
        animated
        interpolation="linear"
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
    startAngle={0}
    endAngle={0.5 * Math.PI}
    isClosedCurve={false}
  />
);

export const QuarterCircleMultiSeries = () => (
  <RadialAreaChart
    id="quarter-circle-multi-series"
    data={multiCategory}
    height={500}
    width={500}
    series={
      <RadialAreaSeries
        type="grouped"
        interpolation="linear"
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
    startAngle={0}
    endAngle={0.5 * Math.PI}
    isClosedCurve={false}
  />
);

export const CustomCircle = () => (
  <RadialAreaChart
    id="custom-circle"
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        colorScheme="cybertron"
        animated
        interpolation="linear"
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
    startAngle={-Math.PI}
    endAngle={0.5 * Math.PI}
    isClosedCurve={false}
  />
);

export const CustomCircle2 = () => (
  <RadialAreaChart
    id="custom-circle-2"
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        colorScheme="cybertron"
        animated
        interpolation="linear"
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
    startAngle={-Math.PI}
    endAngle={-0.25 * Math.PI}
    isClosedCurve={false}
  />
);

export const CustomCircle3 = () => (
  <RadialAreaChart
    id="custom-circle-3"
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
    startAngle={-0.75 * Math.PI}
    endAngle={0.75 * Math.PI}
    isClosedCurve={false}
  />
);

export const CustomCircle4 = () => (
  <RadialAreaChart
    id="custom-circle-4"
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        colorScheme="cybertron"
        animated
        interpolation="linear"
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
    startAngle={-0.25 * Math.PI}
    endAngle={0.25 * Math.PI}
    isClosedCurve={false}
  />
);

export const NoAutoRotateLabels = () => (
  <RadialAreaChart
    id="no-auto-rotate-labels"
    height={500}
    width={500}
    data={medDateData}
    innerRadius={0.1}
    series={
      <RadialAreaSeries
        colorScheme="cybertron"
        animated
        interpolation="linear"
        area={<RadialArea gradient={<RadialGradient />} />}
      />
    }
    axis={
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
            <RadialAxisTickLabel autoRotate={false} />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={0}
    endAngle={0.5 * Math.PI}
    isClosedCurve={false}
  />
);
