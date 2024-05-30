import { RadialGauge } from './RadialGauge';
import { categoryData, categoryDataStackedArcs } from '@demo/index';
import {
  RadialGaugeArc,
  RadialGaugeSeries,
  StackedRadialGaugeValueLabel,
  StackedRadialGaugeSeries,
  StackedRadialGaugeDescriptionLabel
} from './RadialGaugeSeries';
import { Gradient } from '@/common/Gradient';
import { max } from 'd3-array';
import { ChartDataShape, ColorSchemeType } from '@/common';
import React from 'react';
import { StoryFn } from '@storybook/react';

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
  const colorScheme: string[] = ['#CE003E', '#DF8D03', '#00ECB1', '#9FA9B1'];

  return (
    <RadialGauge
      data={categoryData}
      startAngle={0}
      endAngle={Math.PI * 2}
      height={300}
      width={700}
      minValue={0}
      maxValue={[10, 20, 30, 40]}
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

interface GaugeStackedTemplateProps {
  width: number;
  height: number;
  data: ChartDataShape[];
  colorSchemaType: 'handlerFn' | 'array' | 'string';
}

const GaugeStackedTemplate: StoryFn<GaugeStackedTemplateProps> = ({
  width,
  height,
  data,
  colorSchemaType
}) => {
  const defaultColor = '#948d62';
  const customColorScheme: Record<string, string> = {
    'Third Party': '#DF8D03',
    Malware: '#993FFF',
    DLP: '#D9C0FF',
    IDS: '#00FFC7'
  };
  const colorSchemeHandler = (data: ChartDataShape) => {
    const key = data.key;
    if (typeof key === 'string' && customColorScheme[key]) {
      return customColorScheme[key];
    }

    return defaultColor;
  };
  const colorSchemeArr: string[] = ['#c42656', '#03df2f', '#6747b4', '#ccd016'];

  let colorSchema: ColorSchemeType;
  switch (colorSchemaType) {
    case 'handlerFn':
      colorSchema = colorSchemeHandler;
      break;
    case 'array':
      colorSchema = colorSchemeArr;
      break;
    default:
      colorSchema = defaultColor;
  }

  const descriptionElement = (
    <text x="0" y={-20} textAnchor="middle" alignmentBaseline="middle">
      <tspan x="0" fontSize={16} fontWeight={700} fill="#E9E9E9">
        Hours Complete
      </tspan>
      <tspan x="0" dy="1.2em" fontSize={32} fontWeight={800} fill="#FFFFFF">
        67%
      </tspan>
      <tspan x="0" dy="1.5em" fontSize={14} fill="#c2b0e7">
        <tspan fontWeight="bold" fill="#00E5AF">
          ↑ 4%
        </tspan>
        from last week
      </tspan>
    </text>
  );

  return (
    <RadialGauge
      data={data}
      startAngle={0}
      endAngle={Math.PI * 2}
      height={height}
      width={width}
      minValue={0}
      maxValue={[50, 26, 100]}
      series={
        <StackedRadialGaugeSeries
          arcPadding={0.5}
          fillFactor={0.3}
          colorScheme={colorSchema}
          descriptionLabel={descriptionElement}
        />
      }
    />
  );
};

export const GaugeStacked = GaugeStackedTemplate.bind({});
GaugeStacked.args = {
  width: 700,
  height: 300,
  data: categoryDataStackedArcs,
  maxValue: undefined,
  colorSchemaType: 'handlerFn'
};
GaugeStacked.argTypes = {
  width: { control: { type: 'number', min: 300, max: 700, step: 10 } },
  height: { control: { type: 'number', min: 300, max: 700, step: 10 } },
  data: {
    type: 'object'
  },
  maxValue: {
    type: 'number'
  },
  colorSchemaType: {
    control: 'inline-radio',
    options: ['handlerFn', 'array', 'string']
  }
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
        innerArc={
          <RadialGaugeArc cornerRadius={12.5} gradient={<Gradient />} />
        }
      />
    }
  />
);
