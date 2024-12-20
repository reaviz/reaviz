import { medDateData, multiCategory } from 'reaviz-data-utils';
import { format } from 'date-fns';
import {
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisTickLine,
  RadialAxisTickSeries
} from '@/common/Axis/RadialAxis';
import { schemes } from '@/common/color';
import { RadialBarChart } from './RadialBarChart';
import { RadialBar, RadialBarSeries, RadialGuideBar } from './RadialBarSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Radial/Axis',
  component: RadialBarChart,
  subcomponents: {
    RadialBarSeries,
    RadialBar,
    RadialGuideBar
  }
};

export const SemiCircle = () => (
  <RadialBarChart
    id="semi-circle"
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
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const Quarter = () => (
  <RadialBarChart
    id="quarter-circle"
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
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
            <RadialAxisTickLabel format={(f) => format(new Date(f), 'M/d')} />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={0}
    endAngle={0.5 * Math.PI}
  />
);

export const Custom = () => (
  <RadialBarChart
    id="custom"
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
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
            <RadialAxisTickLabel format={(f) => format(new Date(f), 'M/d')} />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={-0.4 * Math.PI}
    endAngle={0.4 * Math.PI}
  />
);

export const SemiCircleMultiSeries = () => (
  <RadialBarChart
    id="semi-circle-multi-series"
    height={450}
    width={450}
    innerRadius={50}
    data={multiCategory}
    series={
      <RadialBarSeries
        type="grouped"
        animated
        colorScheme="cybertron"
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis type="category">
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={-0.5 * Math.PI}
    endAngle={0.5 * Math.PI}
  />
);

export const QuarterCircleMultiSeries = () => (
  <RadialBarChart
    id="quarter-circle-multi-series"
    height={450}
    width={450}
    innerRadius={50}
    data={multiCategory}
    series={
      <RadialBarSeries
        type="grouped"
        animated
        colorScheme="cybertron"
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis type="category">
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={0}
    endAngle={0.5 * Math.PI}
  />
);

export const CustomCircle1MultiSeries = () => (
  <RadialBarChart
    id="custom-circle-1"
    height={450}
    width={450}
    innerRadius={50}
    data={multiCategory}
    series={
      <RadialBarSeries
        type="grouped"
        animated
        colorScheme="cybertron"
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis type="category">
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={-0.75 * Math.PI}
    endAngle={0.75 * Math.PI}
  />
);

export const CustomCircle2MultiSeries = () => (
  <RadialBarChart
    id="custom-circle-2"
    height={450}
    width={450}
    innerRadius={50}
    data={multiCategory}
    series={
      <RadialBarSeries
        type="grouped"
        animated
        colorScheme="cybertron"
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis type="category">
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
    startAngle={-0.25 * Math.PI}
    endAngle={0.25 * Math.PI}
  />
);
