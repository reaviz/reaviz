import { RadialAreaChart } from './RadialAreaChart';
import { medDateData, categoryData, multiCategory } from '../../demo';
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
} from '../common/Axis';
import { GradientStop, RadialGradient } from '../common/Gradient';

export default {
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
      <RadialAxis
        arcs={<RadialAxisArcSeries count={10} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="inside" />}
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
    axis={<RadialAxis type="category" />}
  />
);

export const Resizable = () => (
  <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
    <RadialAreaChart data={medDateData} />
  </div>
);

export const MultiSeries = () => (
  <RadialAreaChart
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

export const SemiCircle = () => (
  <RadialAreaChart
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
      <RadialAxis
        arcs={<RadialAxisArcSeries count={10} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="inside" />}
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
      <RadialAxis
        arcs={<RadialAxisArcSeries count={10} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="inside" />}
                label={<RadialAxisTickLabel autoRotate />}
              />
            }
          />
        }
      />
    }
    startAngle={0}
    endAngle={0.5 * Math.PI}
    isClosedCurve={false}
  />
);

export const QuarterCircleMultiSeries = () => (
  <RadialAreaChart
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
      <RadialAxis
        arcs={<RadialAxisArcSeries count={10} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="inside" />}
                label={<RadialAxisTickLabel autoRotate />}
              />
            }
          />
        }
      />
    }
    startAngle={-Math.PI}
    endAngle={0.5 * Math.PI}
    isClosedCurve={false}
  />
);

export const CustomCircle2 = () => (
  <RadialAreaChart
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
      <RadialAxis
        arcs={<RadialAxisArcSeries count={10} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="inside" />}
                label={<RadialAxisTickLabel autoRotate />}
              />
            }
          />
        }
      />
    }
    startAngle={-Math.PI}
    endAngle={-0.25 * Math.PI}
    isClosedCurve={false}
  />
);

export const CustomCircle3 = () => (
  <RadialAreaChart
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
      <RadialAxis
        arcs={<RadialAxisArcSeries count={10} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="inside" />}
                label={<RadialAxisTickLabel autoRotate />}
              />
            }
          />
        }
      />
    }
    startAngle={-0.75 * Math.PI}
    endAngle={0.75 * Math.PI}
    isClosedCurve={false}
  />
);

export const CustomCircle4 = () => (
  <RadialAreaChart
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
      <RadialAxis
        arcs={<RadialAxisArcSeries count={10} />}
        ticks={
          <RadialAxisTickSeries
            count={5}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="inside" />}
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