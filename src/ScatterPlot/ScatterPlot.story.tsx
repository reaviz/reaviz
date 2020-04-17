import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { object, color, number } from '@storybook/addon-knobs';

import { ScatterPlot } from './ScatterPlot';
import {
  signalChartData,
  largeSignalChartData,
  medSignalChartData,
  signalStageData,
  signalStages
} from '../../demo/signals';
import { randomNumber, singleDateData } from '../../demo';
import { range } from 'd3-array';
import { GridlineSeries, Gridline, GridStripe } from '../common/Gridline';
import { ScatterSeries, ScatterPoint } from './ScatterSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel
} from '../common/Axis/LinearAxis';
import { symbolStar, symbol } from 'd3-shape';
import { schemes } from '../common/color';
import { getYScale, getXScale } from '../common/scales';

storiesOf('Charts|Scatter Plot/Linear', module)
  .add(
    'Simple',
    () => {
      const height = number('Height', 400);
      const width = number('Width', 750);
      const size = number('Size', 4);
      const fill = color('Color', schemes.cybertron[0]);
      const data = object('Data', medSignalChartData);

      return (
        <ScatterPlot
          height={height}
          width={width}
          data={data}
          series={
            <ScatterSeries point={<ScatterPoint color={fill} size={size} />} />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Categorical Axis', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={signalStageData}
      yAxis={
        <LinearYAxis
          type="category"
          domain={signalStages as any}
          tickSeries={
            <LinearYAxisTickSeries
              label={<LinearYAxisTickLabel rotation={false} />}
            />
          }
        />
      }
      gridlines={
        <GridlineSeries
          line={<Gridline direction="y" />}
          stripe={<GridStripe direction="y" />}
        />
      }
    />
  ))
  .add('No Animation', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={medSignalChartData}
      series={<ScatterSeries animated={false} />}
    />
  ))
  .add('Performance', () => (
    <Fragment>
      {range(15).map(i => (
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
          <ScatterPlot data={medSignalChartData} />
        </div>
      ))}
    </Fragment>
  ))
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <ScatterPlot data={medSignalChartData} />
    </div>
  ))
  .add('Symbols', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={signalChartData}
      series={
        <ScatterSeries
          point={
            <ScatterPoint
              symbol={() => {
                const d = symbol()
                  .type(symbolStar)
                  .size(175)();

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
  ))
  .add('Bubble', () => (
    <ScatterPlot
      height={400}
      width={750}
      data={largeSignalChartData}
      margins={20}
      series={
        <ScatterSeries
          point={
            <ScatterPoint
              color="rgba(45, 96, 232, .8)"
              size={v => v.metadata.severity + 5}
            />
          }
        />
      }
    />
  ))
  .add('Live Update', () => <BubbleChartLiveUpdate />);

storiesOf('Charts|Scatter Plot/Axis', module)
  .add('Top + Bottom Axis', () => {
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
      ],
      isMultiSeries: false,
      isDiverging: true
    });

    return (
      <ScatterPlot
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
  })
  .add('Left + Right Axis', () => {
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
      ],
      isMultiSeries: false,
      isDiverging: true
    });

    return (
      <ScatterPlot
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
  });

const BubbleChartLiveUpdate = () => {
  const [data, setData] = useState(largeSignalChartData.map(d => ({ ...d })));

  const updateData = () => {
    const d = data.map(item => {
      item.data = randomNumber(1, 100);
      return { ...item };
    });

    setData(d);
  };

  return (
    <Fragment>
      <ScatterPlot
        height={400}
        width={750}
        data={data}
        margins={20}
        series={
          <ScatterSeries
            point={
              <ScatterPoint
                color="rgba(45, 96, 232, .8)"
                size={v => {
                  return v.metadata.severity + 5;
                }}
              />
            }
          />
        }
      />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};
