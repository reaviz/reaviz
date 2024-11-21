import { BarChart } from './BarChart';
import { MarimekkoChart } from './MarimekkoChart';
import { StackedBarChart } from './StackedBarChart';
import { StackedNormalizedBarChart } from './StackedNormalizedBarChart';
import { multiCategory, binnedDateData } from 'reaviz-data-utils';
import chroma from 'chroma-js';
import {
  BarSeries,
  Bar,
  StackedBarSeries,
  StackedNormalizedBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  GuideBar,
  BarLabel,
  HistogramBarSeries
} from './BarSeries';
import { GridlineSeries, Gridline } from '@/common/Gridline';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '@/common/Axis/LinearAxis';
import { Gradient, GradientStop } from '@/common/Gradient';

const targetSampleData = [
  {
    key: 'Lateral Movement',
    data: [
      {
        key: 'XML',
        data: 100,
        target: 120
      },
      {
        key: 'JSON',
        data: 120,
        target: 100
      },
      {
        key: 'HTTPS',
        data: 150,
        target: 160
      }
    ]
  },
  {
    key: 'Discovery',
    data: [
      {
        key: 'XML',
        data: 100,
        target: 110
      },
      {
        key: 'JSON',
        data: 34,
        target: 50
      },
      {
        key: 'HTTPS',
        data: 40,
        target: 40
      }
    ]
  },
  {
    key: 'Exploitation',
    data: [
      {
        key: 'XML',
        data: 70,
        target: 80
      },
      {
        key: 'JSON',
        data: 130,
        target: 100
      },
      {
        key: 'HTTPS',
        data: 110,
        target: 90
      }
    ]
  }
];

export default {
  title: 'Charts/Bar Chart/Vertical/Multi Series',
  component: BarChart,
  subcomponents: {
    BarSeries,
    StackedBarSeries,
    StackedNormalizedBarSeries,
    MarimekkoBarSeries,
    RangeLines,
    Bar,
    BarLabel,
    GuideBar,
    HistogramBarSeries
  }
};

export const Simple = () => (
  <BarChart
    width={350}
    height={350}
    data={multiCategory}
    series={
      <BarSeries
        type="grouped"
        bar={
          <Bar
            gradient={<Gradient />}
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
            guide={<GuideBar />}
          />
        }
        colorScheme="cybertron"
        padding={0.8}
      />
    }
  />
);

export const BarTargetMarker = () => (
  <BarChart
    width={350}
    height={350}
    data={targetSampleData}
    series={
      <BarSeries
        type="grouped"
        bar={
          <Bar
            gradient={<Gradient />}
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
            guide={<GuideBar />}
          />
        }
        colorScheme="cybertron"
        padding={0.8}
      />
    }
  />
);

export const Stacked = () => (
  <StackedBarChart
    width={350}
    height={350}
    data={multiCategory}
    series={
      <StackedBarSeries
        bar={
          <Bar
            rx={0}
            ry={0}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
                  <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                ]}
              />
            }
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
            guide={<GuideBar />}
          />
        }
        colorScheme="cybertron"
      />
    }
  />
);

export const StackedCustomStyle = () => (
  <StackedBarChart
    width={350}
    height={350}
    data={multiCategory}
    gridlines={null}
    series={
      <StackedBarSeries
        bar={[
          { start: '#d7b5d8', end: '#980043' },
          { start: '#fbb4b9', end: '#7a0177' },
          { start: '#c2e699', end: '#006837' },
          { start: '#a1dab4', end: '#253494' }
        ].map((gradient) => (
          <Bar
            gradient={
              <Gradient
                stops={[
                  <GradientStop
                    offset="0%"
                    key="start"
                    color={gradient.start}
                  />,
                  <GradientStop offset="100%" key="stop" color={gradient.end} />
                ]}
              />
            }
            width={10}
          />
        ))}
      />
    }
    yAxis={
      <LinearYAxis
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    }
  />
);

export const StackedDiverging = () => (
  <StackedBarChart
    width={400}
    height={250}
    margins={0}
    data={binnedDateData}
    gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    series={
      <StackedBarSeries
        bar={[
          <Bar
            rx={0}
            ry={0}
            guide={<GuideBar />}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
                  <GradientStop offset="90%" stopOpacity={0.1} key="start" />
                ]}
              />
            }
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
          />,
          <Bar
            rx={0}
            ry={0}
            guide={<GuideBar />}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
                  <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                ]}
              />
            }
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
          />
        ]}
        type="stackedDiverging"
        colorScheme={chroma
          .scale(['ACB7C9', '418AD7'])
          .colors(binnedDateData[0].data.length)}
      />
    }
    yAxis={
      <LinearYAxis
        roundDomains={true}
        tickSeries={
          <LinearYAxisTickSeries
            line={null}
            label={<LinearYAxisTickLabel padding={5} />}
          />
        }
      />
    }
    xAxis={
      <LinearXAxis
        type="category"
        position="center"
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    }
  />
);

export const StackedNormalized = () => (
  <StackedNormalizedBarChart
    width={350}
    height={350}
    data={multiCategory}
    series={
      <StackedNormalizedBarSeries
        bar={
          <Bar
            key="stacked-normalized-bar"
            rx={0}
            ry={0}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
                  <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                ]}
              />
            }
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
          />
        }
        colorScheme="cybertron"
      />
    }
  />
);

export const Marimekko = () => (
  <MarimekkoChart
    width={350}
    height={350}
    data={multiCategory}
    series={
      <MarimekkoBarSeries
        bar={
          <Bar
            key="marimekko-bar"
            rx={0}
            ry={0}
            padding={10}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
                  <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                ]}
              />
            }
            rangeLines={<RangeLines position="top" strokeWidth={3} />}
          />
        }
        colorScheme="cybertron"
      />
    }
  />
);
