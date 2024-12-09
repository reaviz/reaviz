import { multiCategory } from 'reaviz-data-utils';
import { RadialArea } from '@/RadialAreaChart';
import { GradientStop } from '@/common/Gradient';
import { RadialGradient } from '@/common/Gradient/RadialGradient';
import { RadarChart } from './RadarChart';
import { RadarChartSeries } from './RadarChartSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Radar Chart',
  component: RadarChart
};

export const Simple = () => (
  <RadarChart id="simple" data={multiCategory} height={500} width={500} />
);

export const Filled = () => (
  <RadarChart
    id="filled"
    data={multiCategory}
    height={500}
    width={500}
    series={
      <RadarChartSeries
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
  />
);
