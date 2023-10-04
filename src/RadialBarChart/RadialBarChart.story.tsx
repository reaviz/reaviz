import { RadialBarChart } from './RadialBarChart';
import { largeCategoryData, medDateData, multiCategory } from '../../demo';
import { RadialBarSeries, RadialBar, RadialGuideBar } from './RadialBarSeries';
import {
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLine
} from '../common/Axis/RadialAxis';
import { schemes } from '../common/color';

export default {
  title: 'Charts/Bar Chart/Radial',
  component: RadialBarChart,
  subcomponents: {
    RadialBarSeries,
    RadialBar,
    RadialGuideBar
  }
};

export const Simple = () => (
  <RadialBarChart
    height={450}
    width={450}
    innerRadius={50}
    data={medDateData}
    series={
      <RadialBarSeries
        animated
        colorScheme={schemes['cybertron'][0]}
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis
        ticks={
          <RadialAxisTickSeries
            tick={
              <RadialAxisTick line={<RadialAxisTickLine position="inside" />} />
            }
          />
        }
        arcs={<RadialAxisArcSeries count={10} />}
      />
    }
  />
);

export const Gradient = () => (
  <RadialBarChart
    height={450}
    width={450}
    innerRadius={50}
    data={medDateData}
    series={
      <RadialBarSeries
        animated
        colorScheme={schemes['cybertron'][0]}
        bar={
          <RadialBar
            curved={false}
            gradient={RadialBar.defaultProps.gradient}
            guide={<RadialGuideBar />}
          />
        }
      />
    }
    axis={
      <RadialAxis
        ticks={
          <RadialAxisTickSeries
            tick={
              <RadialAxisTick line={<RadialAxisTickLine position="inside" />} />
            }
          />
        }
        arcs={<RadialAxisArcSeries count={10} />}
      />
    }
  />
);

export const Resizable = () => (
  <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
    <RadialBarChart data={largeCategoryData} innerRadius={10} />
  </div>
);


export const MultiSeries = () => (
  <RadialBarChart
    height={450}
    width={450}
    innerRadius={50}
    data={multiCategory}
    series={
      <RadialBarSeries
        type='grouped'
        animated
        colorScheme="cybertron"
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis
        type='category'
        ticks={
          <RadialAxisTickSeries
            tick={
              <RadialAxisTick line={<RadialAxisTickLine position="inside" />} />
            }
          />
        }
        arcs={<RadialAxisArcSeries count={10} />}
      />
    }
  />
);