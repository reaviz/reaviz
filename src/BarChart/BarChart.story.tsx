import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, object, select, color } from '@storybook/addon-knobs';
import { BarChart } from './BarChart';
import { MarimekkoChart } from './MarimekkoChart';
import { StackedBarChart } from './StackedBarChart';
import { StackedNormalizedBarChart } from './StackedNormalizedBarChart';
import {
  categoryData,
  largeCategoryData,
  multiCategory,
  randomNumber,
  medDateData,
  histogramNumberData,
  nonZeroCategoryData,
  durationCategoryData,
  binnedDateData,
  binnedDatePositiveOnly,
  binnedDateNegativeOnly
} from '../../demo';
import chroma from 'chroma-js';
import { timeWeek } from 'd3-time';
import { range } from 'd3-array';
import {
  BarSeries,
  Bar,
  StackedBarSeries,
  StackedNormalizedBarSeries,
  MarimekkoBarSeries,
  RangeLines,
  BarLabel,
  GuideBar,
  HistogramBarSeries
} from './BarSeries';
import { GridlineSeries, Gridline } from '../common/Gridline';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxisTickLabel
} from '../common/Axis/LinearAxis';
import { Stripes } from '../common/Mask';
import { Gradient, GradientStop } from '../common/Gradient';
import { schemes } from '../common/color';
import { getXScale, getYScale } from '../common/scales';
import { HistogramBarChart } from './HistogramBarChart';

storiesOf('Charts|Bar Chart/Vertical/Single Series', module)
  .add(
    'Simple',
    () => {
      const color = select('Color Scheme', schemes, 'cybertron');
      const hasGradient = boolean('Gradient', true);
      const hasGuideBar = boolean('Guide Bar', true);
      const rounded = boolean('Rounded', true);
      const padding = number('Padding', 0.1);
      const height = number('Height', 350);
      const width = number('Width', 400);
      const gradient = hasGradient ? Bar.defaultProps.gradient : null;
      const guide = hasGuideBar ? <GuideBar /> : null;

      return (
        <BarChart
          width={width}
          height={height}
          data={categoryData}
          series={
            <BarSeries
              colorScheme={color}
              padding={padding}
              bar={<Bar rounded={rounded} gradient={gradient} guide={guide} />}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Custom Style', () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      series={
        <BarSeries
          bar={
            <Bar
              gradient={null}
              rounded={false}
              style={data => {
                if (data.key === 'DLP') {
                  console.log('Style callback...', data);
                  return {
                    fill: 'blue'
                  };
                }
              }}
            />
          }
        />
      }
    />
  ))
  .add(
    'Large Dataset',
    () => {
      const height = number('Height', 350);
      const width = number('Width', 350);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', largeCategoryData);

      return (
        <BarChart
          width={width}
          height={height}
          data={data}
          series={<BarSeries colorScheme={color} />}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Mask', () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      series={<BarSeries bar={<Bar mask={<Stripes />} />} />}
    />
  ))
  .add('Custom Colors', () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      series={
        <BarSeries
          colorScheme={(_data, index) => (index % 2 ? '#418AD7' : '#ACB7C9')}
        />
      }
    />
  ))
  .add(
    'Labels',
    () => {
      const position = select(
        'Position',
        {
          top: 'top',
          center: 'center',
          bottom: 'bottom'
        },
        'top'
      );
      const fill = color('Color', '');

      return (
        <BarChart
          width={350}
          height={250}
          data={categoryData}
          series={
            <BarSeries
              bar={<Bar label={<BarLabel fill={fill} position={position} />} />}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add(
    'Custom Bar Width',
    () => {
      const barWidth = number('Bar Width', 5);

      return (
        <BarChart
          width={350}
          height={250}
          series={<BarSeries bar={<Bar width={barWidth} />} />}
          data={categoryData}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Live Updating', () => <LiveDataDemo />)
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <BarChart data={categoryData} />
    </div>
  ))
  .add('Performance', () =>
    range(15).map(i => (
      <div
        key={i}
        style={{
          width: '250px',
          height: '250px',
          border: 'solid 1px green',
          margin: '25px',
          display: 'inline-block'
        }}
      >
        <BarChart data={categoryData} />
      </div>
    ))
  )
  .add('No Animation', () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      series={<BarSeries animated={false} />}
    />
  ))
  .add(
    'Waterfall',
    () => {
      const height = number('Height', 350);
      const width = number('Width', 350);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', categoryData);

      return (
        <BarChart
          width={width}
          height={height}
          data={data}
          series={<BarSeries type="waterfall" colorScheme={color} />}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add(
    'Non-Zero',
    () => {
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', nonZeroCategoryData);
      return (
        <BarChart
          width={350}
          height={250}
          data={data}
          series={<BarSeries colorScheme={color} />}
        />
      );
    },
    { options: { showPanel: true } }
  );

storiesOf('Charts|Bar Chart/Vertical/Histogram', module)
  .add(
    'Dates',
    () => {
      const binSize = number('Bin Size', 60 * 60 * 24 * 1000);
      const data = object('Data', medDateData);

      return (
        <HistogramBarChart
          width={350}
          height={250}
          xAxis={
            <LinearXAxis
              type="time"
              tickSeries={<LinearXAxisTickSeries interval={timeWeek} />}
            />
          }
          series={<HistogramBarSeries binSize={binSize} />}
          data={data}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add(
    'Numbers',
    () => {
      const binSize = number('Bin Size', 1);
      const data = object('Data', histogramNumberData);

      return (
        <HistogramBarChart
          width={350}
          height={250}
          xAxis={<LinearXAxis type="value" />}
          series={<HistogramBarSeries binSize={binSize} />}
          data={data}
        />
      );
    },
    { options: { showPanel: true } }
  );

storiesOf('Charts|Bar Chart/Vertical/Multi Series', module)
  .add(
    'Simple',
    () => {
      const height = number('Height', 350);
      const width = number('Width', 350);
      const rangeWidth = number('Rangeline', 3);
      const hasGradient = boolean('Gradient', true);
      const hasRangelines = boolean('Rangelines', false);
      const rounded = boolean('Rounded', true);
      const color = select('Color Scheme', schemes, 'cybertron');
      const hasGuideBar = boolean('Guide Bar', false);
      const guide = hasGuideBar ? <GuideBar /> : null;

      const gradient = hasGradient ? <Gradient /> : null;
      const rangelines = hasRangelines ? (
        <RangeLines position="top" strokeWidth={rangeWidth} />
      ) : null;

      return (
        <BarChart
          width={width}
          height={height}
          data={multiCategory}
          series={
            <BarSeries
              type="grouped"
              bar={
                <Bar
                  rounded={rounded}
                  gradient={gradient}
                  rangeLines={rangelines}
                  guide={guide}
                />
              }
              colorScheme={color}
              padding={0.8}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add(
    'Stacked',
    () => {
      const rx = number('rx', 0);
      const ry = number('ry', 0);
      const height = number('Height', 350);
      const width = number('Width', 350);
      const rangeWidth = number('Rangeline', 3);
      const hasGradient = boolean('Gradient', true);
      const hasRangelines = boolean('Rangelines', true);
      const rounded = boolean('Rounded', false);
      const color = select('Color Scheme', schemes, 'cybertron');
      const hasGuideBar = boolean('Guide Bar', false);
      const data = object('Data', multiCategory);

      const guide = hasGuideBar ? <GuideBar /> : null;
      const gradient = hasGradient ? (
        <Gradient
          stops={[
            <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
            <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
          ]}
        />
      ) : null;

      const rangelines = hasRangelines ? (
        <RangeLines position="top" strokeWidth={rangeWidth} />
      ) : null;

      return (
        <StackedBarChart
          width={width}
          height={height}
          data={data}
          series={
            <StackedBarSeries
              bar={
                <Bar
                  rx={rx}
                  ry={ry}
                  rounded={rounded}
                  gradient={gradient}
                  rangeLines={rangelines}
                  guide={guide}
                />
              }
              colorScheme={color}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Stacked Custom Style', () => (
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
          ].map(gradient => (
            <Bar
              rounded={false}
              gradient={
                <Gradient
                  stops={[
                    <GradientStop
                      offset="0%"
                      key="start"
                      color={gradient.start}
                    />,
                    <GradientStop
                      offset="100%"
                      key="stop"
                      color={gradient.end}
                    />
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
  ))
  .add(
    'Stacked Diverging',
    () => {
      const data = select(
        'Example Data',
        {
          'Opened/Closed': binnedDateData,
          'Opened Only': binnedDatePositiveOnly,
          'Closed Only': binnedDateNegativeOnly
        },
        binnedDateData as any
      );

      const rx = number('rx', 0);
      const ry = number('ry', 0);
      const height = number('Height', 250);
      const width = number('Width', 400);
      const rangeWidth = number('Rangeline', 3);
      const hasGradient = boolean('Gradient', true);
      const hasRangelines = boolean('Rangelines', true);
      const rounded = boolean('Rounded', false);
      const hasGuideBar = boolean('Guide Bar', false);
      const guide = hasGuideBar ? <GuideBar /> : null;

      const gradientBottom = hasGradient ? (
        <Gradient
          stops={[
            <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
            <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
          ]}
        />
      ) : null;

      const gradientTop = hasGradient ? (
        <Gradient
          stops={[
            <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
            <GradientStop offset="90%" stopOpacity={0.1} key="start" />
          ]}
        />
      ) : null;

      const rangelines = hasRangelines ? (
        <RangeLines position="top" strokeWidth={rangeWidth} />
      ) : null;

      return (
        <StackedBarChart
          style={{ filter: 'drop-shadow(0 0 10px 2px white)' }}
          width={width}
          height={height}
          margins={0}
          data={data}
          gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
          series={
            <StackedBarSeries
              bar={[
                <Bar
                  rx={rx}
                  ry={ry}
                  guide={guide}
                  rounded={rounded}
                  gradient={gradientTop}
                  rangeLines={rangelines}
                />,
                <Bar
                  rx={rx}
                  ry={ry}
                  guide={guide}
                  rounded={rounded}
                  gradient={gradientBottom}
                  rangeLines={rangelines}
                />
              ]}
              type="stackedDiverging"
              colorScheme={chroma
                .scale(['ACB7C9', '418AD7'])
                .colors(data[0].data.length)}
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
    },
    { options: { showPanel: true } }
  )
  .add(
    'Stacked Normalized',
    () => {
      const rx = number('rx', 0);
      const ry = number('ry', 0);
      const height = number('Height', 350);
      const width = number('Width', 350);
      const rangeWidth = number('Rangeline', 3);
      const hasGradient = boolean('Gradient', true);
      const hasRangelines = boolean('Rangelines', true);
      const rounded = boolean('Rounded', false);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', multiCategory);

      const gradient = hasGradient ? (
        <Gradient
          stops={[
            <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
            <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
          ]}
        />
      ) : null;

      const rangelines = hasRangelines ? (
        <RangeLines position="top" strokeWidth={rangeWidth} />
      ) : null;

      return (
        <StackedNormalizedBarChart
          width={width}
          height={height}
          data={data}
          series={
            <StackedNormalizedBarSeries
              bar={
                <Bar
                  key="stacked-normalized-bar"
                  rx={rx}
                  ry={ry}
                  rounded={rounded}
                  gradient={gradient}
                  rangeLines={rangelines}
                />
              }
              colorScheme={color}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add(
    'Marimekko',
    () => {
      const rx = number('rx', 0);
      const ry = number('ry', 0);
      const height = number('Height', 350);
      const width = number('Width', 350);
      const rangeWidth = number('Rangeline', 3);
      const hasGradient = boolean('Gradient', true);
      const hasRangelines = boolean('Rangelines', true);
      const rounded = boolean('Rounded', false);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', multiCategory);

      const gradient = hasGradient ? (
        <Gradient
          stops={[
            <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
            <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
          ]}
        />
      ) : null;

      const rangelines = hasRangelines ? (
        <RangeLines position="top" strokeWidth={rangeWidth} />
      ) : null;

      return (
        <MarimekkoChart
          width={width}
          height={height}
          data={data}
          series={
            <MarimekkoBarSeries
              bar={
                <Bar
                  key="marimekko-bar"
                  rx={rx}
                  ry={ry}
                  rounded={rounded}
                  padding={10}
                  gradient={gradient}
                  rangeLines={rangelines}
                />
              }
              colorScheme={color}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  );

storiesOf('Charts|Bar Chart/Horizontal/Single Series', module)
  .add(
    'Simple',
    () => {
      const hasGradient = boolean('Gradient', true);
      const rounded = boolean('Rounded', true);
      const padding = number('Padding', 0.1);
      const height = number('Height', 350);
      const width = number('Width', 500);
      const color = select('Color Scheme', schemes, 'cybertron');
      const hasGuideBar = boolean('Guide Bar', false);
      const guide = hasGuideBar ? <GuideBar /> : null;
      const data = object('Data', categoryData);
      const gradient = hasGradient ? Bar.defaultProps.gradient : null;

      return (
        <BarChart
          width={width}
          height={height}
          data={data}
          xAxis={<LinearXAxis type="value" />}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={<LinearYAxisTickSeries tickSize={20} />}
            />
          }
          series={
            <BarSeries
              colorScheme={color}
              layout="horizontal"
              padding={padding}
              bar={<Bar rounded={rounded} gradient={gradient} guide={guide} />}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Large Dataset', () => (
    <BarChart
      height={350}
      width={500}
      data={largeCategoryData}
      xAxis={<LinearXAxis type="value" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
      series={
        <BarSeries
          layout="horizontal"
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(largeCategoryData.length)}
        />
      }
    />
  ))
  .add(
    'Labels',
    () => {
      const position = select(
        'Position',
        {
          top: 'top',
          center: 'center',
          bottom: 'bottom'
        },
        'top'
      );
      const fill = color('Color', '');

      return (
        <BarChart
          width={350}
          height={250}
          data={categoryData}
          xAxis={<LinearXAxis type="value" />}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={<LinearYAxisTickSeries tickSize={20} />}
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={<Bar label={<BarLabel fill={fill} position={position} />} />}
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <BarChart
        data={categoryData}
        series={<BarSeries layout="horizontal" />}
        xAxis={<LinearXAxis type="value" />}
        yAxis={
          <LinearYAxis
            type="category"
            tickSeries={<LinearYAxisTickSeries tickSize={20} />}
          />
        }
      />
    </div>
  ))
  .add('Waterfall', () => (
    <BarChart
      height={350}
      width={500}
      data={categoryData}
      xAxis={<LinearXAxis type="value" />}
      series={<BarSeries layout="horizontal" type="waterfall" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
    />
  ))
  .add('Duration', () => (
    <BarChart
      height={350}
      width={500}
      data={durationCategoryData}
      xAxis={
        <LinearXAxis
          type="duration"
          tickSeries={
            <LinearXAxisTickSeries
              label={<LinearXAxisTickLabel format={d => d / 3600 + 'h'} />}
            />
          }
        />
      }
      series={<BarSeries layout="horizontal" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
    />
  ))
  .add('Non-Zero', () => (
    <BarChart
      height={350}
      width={500}
      data={nonZeroCategoryData}
      xAxis={<LinearXAxis type="value" />}
      series={<BarSeries layout="horizontal" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
    />
  ));

storiesOf('Charts|Bar Chart/Horizontal/Multi Series', module)
  .add('Simple', () => (
    <BarChart
      width={500}
      height={350}
      data={multiCategory}
      xAxis={<LinearXAxis type="value" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
      series={
        <BarSeries
          layout="horizontal"
          type="grouped"
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(multiCategory[0].data.length)}
          padding={0.8}
        />
      }
    />
  ))
  .add('Stacked', () => (
    <StackedBarChart
      width={500}
      height={350}
      data={multiCategory}
      xAxis={<LinearXAxis type="value" />}
      yAxis={
        <LinearYAxis
          type="category"
          tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
      }
      series={
        <StackedBarSeries
          layout="horizontal"
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(multiCategory.length)}
        />
      }
    />
  ))
  .add(
    'Stacked Diverging',
    () => {
      const data = select(
        'data',
        {
          'Opened/Closed': binnedDateData,
          'Opened Only': binnedDatePositiveOnly,
          'Closed Only': binnedDateNegativeOnly
        },
        binnedDateData as any
      );

      return (
        <StackedBarChart
          width={400}
          height={250}
          data={data}
          gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
          series={
            <StackedBarSeries
              layout="horizontal"
              type="stackedDiverging"
              colorScheme={chroma
                .scale(['ACB7C9', '418AD7'])
                .colors(data[0].data.length)}
            />
          }
          yAxis={
            <LinearYAxis
              type="category"
              position="center"
              tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              roundDomains={true}
              type="value"
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={<LinearXAxisTickLabel padding={5} />}
                />
              }
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Stacked Normalized', () => (
    <StackedNormalizedBarChart
      width={500}
      height={350}
      data={multiCategory}
      yAxis={<LinearYAxis type="category" />}
      xAxis={
        <LinearXAxis
          type="value"
          tickSeries={
            <LinearXAxisTickSeries
              tickSize={20}
              label={
                <LinearXAxisTickLabel
                  rotation={false}
                  format={data => `${data * 100}%`}
                />
              }
            />
          }
        />
      }
      series={
        <StackedNormalizedBarSeries
          layout="horizontal"
          colorScheme={chroma
            .scale(['ACB7C9', '418AD7'])
            .colors(multiCategory.length)}
          bar={
            <Bar
              gradient={
                <Gradient
                  stops={[
                    <GradientStop offset="5%" stopOpacity={0.1} key="start" />,
                    <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                  ]}
                />
              }
              rounded={false}
              rangeLines={<RangeLines position="top" strokeWidth={3} />}
            />
          }
        />
      }
    />
  ));

storiesOf('Charts|Bar Chart/Gridlines', module)
  .add('All Axes', () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  ))
  .add('X-Axis', () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    />
  ))
  .add('Y-Axis', () => (
    <BarChart
      width={350}
      height={250}
      data={categoryData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    />
  ));

storiesOf('Charts|Bar Chart/Axis', module)
  .add('Top + Bottom Axis', () => {
    const scale = getXScale({
      type: 'category',
      width: 450,
      data: [
        {
          key: 'Closed',
          data: 0,
          x: 'Closed'
        },
        {
          key: 'Opened',
          data: 0,
          x: 'Opened'
        }
      ],
      isMultiSeries: false,
      isDiverging: true
    });

    return (
      <StackedBarChart
        width={450}
        height={200}
        margins={0}
        data={binnedDateData}
        gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
        series={
          <StackedBarSeries
            layout="horizontal"
            type="stackedDiverging"
            colorScheme={['#ACB7C9', '#418AD7']}
            bar={[
              <Bar
                rounded={false}
                width={10}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop
                        offset="5%"
                        stopOpacity={0.25}
                        key="start"
                      />,
                      <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />,
              <Bar
                rounded={false}
                width={10}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
                      <GradientStop
                        offset="90%"
                        stopOpacity={0.25}
                        key="start"
                      />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />
            ]}
          />
        }
        xAxis={
          <LinearYAxis
            orientation="horizontal"
            position="end"
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={
                  <LinearYAxisTickLabel
                    padding={5}
                    position="end"
                    format={d => `${d < 0 ? d * -1 : d}`}
                  />
                }
              />
            }
          />
        }
        secondaryAxis={[
          <LinearYAxis
            orientation="horizontal"
            type="category"
            scale={scale}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={<LinearYAxisTickLabel padding={20} position="start" />}
              />
            }
          />
        ]}
        yAxis={
          <LinearXAxis
            type="category"
            position="center"
            orientation="vertical"
            tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
          />
        }
      />
    );
  })
  .add('Left + Right Axis', () => {
    const scale = getYScale({
      type: 'category',
      height: 200,
      data: [
        {
          key: 'Closed',
          data: 0,
          y: 'Closed'
        },
        {
          key: 'Opened',
          data: 0,
          y: 'Opened'
        }
      ],
      isMultiSeries: false,
      isDiverging: true
    });

    return (
      <StackedBarChart
        width={450}
        height={200}
        margins={0}
        data={binnedDateData}
        gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
        series={
          <StackedBarSeries
            type="stackedDiverging"
            colorScheme={['#ACB7C9', '#418AD7']}
            bar={[
              <Bar
                rounded={false}
                width={25}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop
                        offset="5%"
                        stopOpacity={0.25}
                        key="start"
                      />,
                      <GradientStop offset="90%" stopOpacity={0.7} key="stop" />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />,
              <Bar
                rounded={false}
                width={25}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop offset="5%" stopOpacity={0.7} key="stop" />,
                      <GradientStop
                        offset="90%"
                        stopOpacity={0.25}
                        key="start"
                      />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={3} />}
              />
            ]}
          />
        }
        yAxis={
          <LinearYAxis
            roundDomains={true}
            position="end"
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={
                  <LinearYAxisTickLabel
                    padding={5}
                    position="end"
                    format={d => `${d < 0 ? d * -1 : d}`}
                  />
                }
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
        secondaryAxis={[
          <LinearYAxis
            type="category"
            position="start"
            axisLine={null}
            scale={scale}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={
                  <LinearYAxisTickLabel
                    padding={20}
                    position="start"
                    rotation={270}
                    align="start"
                  />
                }
              />
            }
          />
        ]}
      />
    );
  });

const LiveDataDemo = () => {
  const [data, setData] = useState([...largeCategoryData]);

  const updateData = () => {
    const updateCount = randomNumber(1, 4);
    const newData = [...data];

    let idx = 0;
    while (idx <= updateCount) {
      const updateIndex = randomNumber(0, data.length - 1);
      newData[updateIndex].data = randomNumber(10, 100);
      idx++;
    }

    setData(newData);
  };

  const sortData = () => {
    setData([...data].reverse());
  };

  return (
    <Fragment>
      <BarChart
        width={350}
        height={350}
        data={data}
        series={
          <BarSeries
            colorScheme={chroma.scale(['ACB7C9', '418AD7']).colors(data.length)}
          />
        }
      />
      <br />
      <button onClick={updateData}>Update</button>
      <button onClick={sortData}>Sort</button>
    </Fragment>
  );
};
