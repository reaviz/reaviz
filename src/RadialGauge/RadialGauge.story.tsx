import { RadialGauge } from './RadialGauge';
import { categoryData } from '../../demo';
import {
  RadialGaugeArc,
  RadialGaugeSeries,
  StackedRadialGaugeValueLabel,
  StackedRadialGaugeSeries,
  StackedRadialGaugeDescriptionLabel
} from './RadialGaugeSeries';
import { Gradient } from '../common/Gradient';
import { max } from 'd3-array';

export default {
  title: 'Charts/Gauge/Radial'
};

export const Single = () => (
  <RadialGauge
    data={[
      {
        key: 'Austin, TX',
        data: 24
      }
    ]}
    startAngle={0}
    endAngle={Math.PI * 2}
    height={300}
    width={300}
    minValue={0}
    maxValue={100}
    series={<RadialGaugeSeries arcWidth={10} colorScheme={['#418AD7']} />}
  />
);

export const FilledArc = () => (
  <RadialGauge
    data={[
      {
        key: 'Austin, TX',
        data: 24
      }
    ]}
    width={350}
    height={350}
    series={
      <RadialGaugeSeries
        outerArc={<RadialGaugeArc fill="gray" animated={false} />}
      />
    }
  />
);

export const CustomArc = () => (
  <RadialGauge
    data={[
      {
        key: 'Austin, TX',
        data: 24
      }
    ]}
    height={300}
    width={300}
    series={
      <RadialGaugeSeries
        outerArc={<RadialGaugeArc disabled={true} animated={false} />}
        innerArc={<RadialGaugeArc cornerRadius={12.5} />}
        arcWidth={25}
        colorScheme={['#38e52c']}
      />
    }
  />
);

export const Multi = () => {
  const maxValue = max(categoryData, d => d.data as number);
  const colorScheme: string[] = ['#CE003E', '#DF8D03', '#00ECB1', '#9FA9B1'];

  return (
    <RadialGauge
      data={categoryData}
      startAngle={0}
      endAngle={Math.PI * 2}
      height={300}
      width={700}
      minValue={0}
      maxValue={maxValue}
      series={<RadialGaugeSeries colorScheme={colorScheme} />}
    />
  );
};

export const MultiLine = () => (
  <RadialGauge
    data={categoryData}
    width={350}
    height={350}
    series={<RadialGaugeSeries minGaugeWidth={150} />}
  />
);

export const Stacked = () => {
  const maxValue = max(categoryData, (d) => d.data as number);
  const colorScheme: string[] = ['#CE003E', '#DF8D03', '#00ECB1', '#9FA9B1'];

  return (
    <RadialGauge
      data={categoryData}
      startAngle={0}
      endAngle={Math.PI * 2}
      height={300}
      width={700}
      minValue={0}
      maxValue={maxValue}
      series={
        <StackedRadialGaugeSeries
          arcPadding={0.1}
          fillFactor={0.3}
          colorScheme={colorScheme}
          label={<StackedRadialGaugeValueLabel label="Security Threats" />}
          descriptionLabel={
            <StackedRadialGaugeDescriptionLabel label="Last 12 months" />
          }
        />
      }
    />
  );
};

export const Autosize = () => (
  <div style={{ width: 250, height: 250, border: 'solid 1px red' }}>
    <RadialGauge
      data={[
        {
          key: 'Austin, TX',
          data: 24
        }
      ]}
    />
  </div>
);

export const WithGradient = () => (
  <RadialGauge
    height={300}
    width={700}
    data={[
      {
        key: 'Austin, TX',
        data: 24
      }
    ]}
    series={
      <RadialGaugeSeries
        arcWidth={15}
        innerArc={<RadialGaugeArc cornerRadius={12.5} gradient={<Gradient />} />}
      />
    }
  />
);
