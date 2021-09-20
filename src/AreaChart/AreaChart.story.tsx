import React, { Fragment, useState } from 'react';
import chroma from 'chroma-js';
import { timeDay } from 'd3-time';
import { object, number, select } from '@storybook/addon-knobs';

import {
  multiDateData,
  singleDateData,
  singleDateBigIntData,
  randomNumber,
  nonZeroDateData,
  longMultiDateData
} from '../../demo';
import { AreaChart } from './AreaChart';
import { StackedNormalizedAreaChart } from './StackedNormalizedAreaChart';
import { StackedAreaChart } from './StackedAreaChart';
import { range } from 'd3-array';
import {
  AreaSeries,
  Area,
  Line,
  StackedAreaSeries,
  StackedNormalizedAreaSeries,
  PointSeries
} from './AreaSeries';
import { GridlineSeries, Gridline } from '../common/Gridline';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxisTickLabel
} from '../common/Axis/LinearAxis';
import { ScatterPoint } from '../ScatterPlot';
import { symbol, symbolStar } from 'd3-shape';
import { Gradient, GradientStop } from '../common/Gradient';
import { Stripes } from '../common/Mask';
import { ChartDataShape } from '../common/data';
import { schemes } from '../common/color';
import { getYScale, getXScale } from '../common/scales';

export default {
  title: 'Charts/Area Chart/Single Series',
};

export const Simple = () => {
    const height = number('Height', 250);
    const width = number('Width', 350);
    const lineStroke = number('Stroke Width', 4);
    const color = select('Color Scheme', schemes, 'cybertron');
    const interpolation = select(
      'Interpolation',
      {
        linear: 'linear',
        step: 'step',
        smooth: 'smooth'
      },
      'linear'
    );
    const data = object('Data', singleDateData);

    return (
      <AreaChart
        width={width}
        height={height}
        data={data}
        series={
          <AreaSeries
            interpolation={interpolation}
            colorScheme={color}
            line={<Line strokeWidth={lineStroke} />}
          />
        }
      />
    );
  };

export const Masks = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={
        <AreaSeries
          area={
            <Area
              mask={<Stripes />}
              gradient={
                <Gradient
                  stops={[
                    <GradientStop offset="10%" stopOpacity={0} />,
                    <GradientStop offset="80%" stopOpacity={1} />
                  ]}
                />
              }
            />
          }
          line={<Line strokeWidth={3} />}
        />
      }
    />
  );

export const NoAnimation = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={<AreaSeries animated={false} />}
    />
  );

export const NonZero = () => (
    <AreaChart
      width={350}
      height={250}
      data={nonZeroDateData as ChartDataShape[]}
    />
  );

NonZero.story = {
  name: 'Non-Zero',
};

export const Interval = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      xAxis={
        <LinearXAxis
          type="time"
          tickSeries={<LinearXAxisTickSeries interval={timeDay} />}
        />
      }
    />
  );

export const Autosize = () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <AreaChart data={singleDateData} />
    </div>
  );

export const Performance = () =>
    range(15).map((i) => (
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
        <AreaChart data={singleDateData} />
      </div>
    ));

export const BigInt = () => (
    <AreaChart width={350} height={250} data={singleDateBigIntData} />
  );

export default {
  title: 'Charts/Area Chart/Multi Series',
};

export const _Simple = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', multiDateData);

    return (
      <AreaChart
        width={width}
        height={height}
        data={data}
        series={<AreaSeries type="grouped" colorScheme={color} />}
      />
    );
  };

export const LargeDataset = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', longMultiDateData);

    return (
      <AreaChart
        width={width}
        height={height}
        series={<AreaSeries type="grouped" colorScheme={color} />}
        data={data}
      />
    );
  };

export const LiveUpdating = () => <LiveUpdatingStory />;

export const CustomColors = () => (
    <AreaChart
      width={550}
      height={350}
      series={
        <AreaSeries
          type="grouped"
          colorScheme={(_data, index) => (index % 2 ? 'blue' : 'green')}
        />
      }
      data={multiDateData}
    />
  );

export const Stacked = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', multiDateData);

    return (
      <StackedAreaChart
        width={width}
        height={height}
        series={<StackedAreaSeries colorScheme={color} />}
        data={data}
      />
    );
  };

export const StackedNormalized = () => {
    const height = number('Height', 350);
    const width = number('Width', 550);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', multiDateData);

    return (
      <StackedNormalizedAreaChart
        width={width}
        height={height}
        data={data}
        series={<StackedNormalizedAreaSeries colorScheme={color} />}
      />
    );
  };

export default {
  title: 'Charts/Area Chart/Gridlines',
};

export const AllAxes = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  );

export const XAxis = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    />
  );

XAxis.story = {
  name: 'X-Axis',
};

export const YAxis = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      gridlines={<GridlineSeries line={<Gridline direction="y" />} />}
    />
  );

YAxis.story = {
  name: 'Y-Axis',
};

export default {
  title: 'Charts/Area Chart/Circle Series',
};

export const On = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={<AreaSeries symbols={<PointSeries show={true} />} />}
    />
  );

export const Off = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={<AreaSeries symbols={null} />}
    />
  );

export const OnHover = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={<AreaSeries symbols={<PointSeries show="hover" />} />}
    />
  );

export const OnlyFirst = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={<AreaSeries symbols={<PointSeries show="first" />} />}
    />
  );

export const OnlyLast = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={<AreaSeries symbols={<PointSeries show="last" />} />}
    />
  );

export const Shapes = () => (
    <AreaChart
      width={350}
      height={250}
      data={singleDateData}
      series={
        <AreaSeries
          symbols={
            <PointSeries
              show={true}
              point={
                <ScatterPoint
                  symbol={() => {
                    const d = symbol().type(symbolStar).size(175)();

                    return (
                      <path
                        d={d!}
                        style={{
                          fill: 'lime',
                          stroke: 'purple',
                          strokeWidth: 1.5
                        }}
                      />
                    );
                  }}
                />
              }
            />
          }
        />
      }
    />
  );

export default {
  title: 'Charts/Area Chart/Axis',
};

export const TopBottomAxis = () => {
    const scale = getXScale({
      type: 'category',
      width: 450,
      data: [
        {
          key: 'Before',
          data: 0,
          x: 'Before'
        },
        {
          key: 'After',
          data: 0,
          x: 'After'
        }
      ]
    });

    return (
      <AreaChart
        width={450}
        height={200}
        margins={0}
        data={singleDateData}
        xAxis={
          <LinearXAxis
            type="time"
            orientation="horizontal"
            position="end"
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries
                line={null}
                label={<LinearXAxisTickLabel padding={5} position="end" />}
              />
            }
          />
        }
        secondaryAxis={[
          <LinearXAxis
            type="category"
            orientation="horizontal"
            position="start"
            scale={scale}
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries
                line={null}
                label={<LinearXAxisTickLabel padding={20} position="start" />}
              />
            }
          />
        ]}
        yAxis={<LinearYAxis type="value" axisLine={null} />}
      />
    );
  };

TopBottomAxis.story = {
  name: 'Top + Bottom Axis',
};

export const LeftRightAxis = () => {
    const scale = getYScale({
      type: 'category',
      height: 200,
      data: [
        {
          key: 'Low',
          data: 0,
          y: 'Low'
        },
        {
          key: 'High',
          data: 0,
          y: 'High'
        }
      ]
    });

    return (
      <AreaChart
        width={450}
        height={200}
        margins={0}
        data={singleDateData}
        yAxis={
          <LinearYAxis
            position="end"
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries
                line={null}
                label={<LinearYAxisTickLabel padding={5} position="end" />}
              />
            }
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
        xAxis={<LinearXAxis type="time" axisLine={null} />}
      />
    );
  };

LeftRightAxis.story = {
  name: 'Left + Right Axis',
};

const LiveUpdatingStory = () => {
  const [data, setData] = useState(multiDateData.map((d) => ({ ...d })));

  const updateData = () => {
    const newData = [...data];
    const idx = randomNumber(0, newData.length - 1);
    const set = newData[idx];

    const updateIndex = randomNumber(0, set.data.length - 1);
    set.data[updateIndex].data = randomNumber(10, 50);

    setData(newData);
  };

  return (
    <Fragment>
      <AreaChart
        width={550}
        height={350}
        series={
          <AreaSeries
            type="grouped"
            colorScheme={chroma
              .scale(['27efb5', '00bfff'])
              .colors(multiDateData.length)}
          />
        }
        data={data}
      />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};
