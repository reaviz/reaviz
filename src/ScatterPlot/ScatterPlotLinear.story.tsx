import React, { Fragment, useState } from 'react';
import { ScatterPlot } from './ScatterPlot';
import {
  signalChartData,
  largeSignalChartData,
  medSignalChartData,
  signalStageData,
  signalStages
} from 'reaviz-data-utils';
import { randomNumber } from 'reaviz-data-utils';
import { range } from 'd3-array';
import { GridlineSeries, Gridline, GridStripe } from '@/common/Gridline';
import { ScatterSeries, ScatterPoint } from './ScatterSeries';
import {
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxis,
  LinearAxisLine,
  LinearXAxisTickSeries,
  LinearXAxisTickLine,
  LinearXAxisTickLabel,
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearYAxisTickLine,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS
} from '@/common/Axis/LinearAxis';
import { symbolStar, symbol } from 'd3-shape';
import { schemes } from '@/common/color';

export default {
  tags: ['snapshot'],
  title: 'Charts/Scatter Plot/Linear',
  component: ScatterPlot,
  subcomponents: {
    ScatterSeries,
    ScatterPoint
  }
};

export const Simple = () => (
  <ScatterPlot
    id="simple"
    height={400}
    width={750}
    data={medSignalChartData}
    series={
      <ScatterSeries
        point={<ScatterPoint color={schemes.cybertron[0]} size={4} />}
      />
    }
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const CategoricalAxis = () => (
  <ScatterPlot
    id="categorical"
    height={400}
    width={750}
    data={signalStageData}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="category" domain={signalStages as any}>
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel rotation={false} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
    gridlines={
      <GridlineSeries
        line={<Gridline direction="y" />}
        stripe={<GridStripe direction="y" />}
      />
    }
  />
);

export const NoAnimation = () => (
  <ScatterPlot
    id="no-animation"
    height={400}
    width={750}
    data={medSignalChartData}
    series={<ScatterSeries animated={false} />}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const Performance = () => (
  <Fragment>
    {range(15).map((i) => (
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
        <ScatterPlot
          id={`performance-${i}`}
          data={medSignalChartData}
          xAxis={
            <LinearXAxis type="time">
              <LinearAxisLine />
              <LinearXAxisTickSeries>
                <LinearXAxisTickLine
                  {...LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS}
                />
                <LinearXAxisTickLabel />
              </LinearXAxisTickSeries>
            </LinearXAxis>
          }
          yAxis={
            <LinearYAxis type="value">
              <LinearAxisLine />
              <LinearYAxisTickSeries>
                <LinearYAxisTickLine
                  {...LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS}
                />
                <LinearYAxisTickLabel />
              </LinearYAxisTickSeries>
            </LinearYAxis>
          }
        />
      </div>
    ))}
  </Fragment>
);

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <ScatterPlot
      id="autosize"
      data={medSignalChartData}
      xAxis={
        <LinearXAxis type="time">
          <LinearAxisLine />
          <LinearXAxisTickSeries>
            <LinearXAxisTickLine />
            <LinearXAxisTickLabel />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
      yAxis={
        <LinearYAxis type="value">
          <LinearAxisLine />
          <LinearYAxisTickSeries>
            <LinearYAxisTickLine />
            <LinearYAxisTickLabel />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
    />
  </div>
);

export const Symbols = () => (
  <ScatterPlot
    height={400}
    width={750}
    data={signalChartData}
    series={
      <ScatterSeries
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const Bubble = () => (
  <ScatterPlot
    id="bubble"
    height={400}
    width={750}
    data={largeSignalChartData}
    margins={20}
    series={
      <ScatterSeries
        point={
          <ScatterPoint
            color="rgba(45, 96, 232, .8)"
            size={(v) => v.metadata.severity + 5}
          />
        }
      />
    }
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const LiveUpdate = () => <BubbleChartLiveUpdate />;

const BubbleChartLiveUpdate = () => {
  const [data, setData] = useState(largeSignalChartData.map((d) => ({ ...d })));

  const updateData = () => {
    const d = data.map((item) => {
      item.data = randomNumber(1, 100);
      return { ...item };
    });

    setData(d);
  };

  return (
    <Fragment>
      <ScatterPlot
        id="live-update"
        height={400}
        width={750}
        data={data}
        margins={20}
        series={
          <ScatterSeries
            point={
              <ScatterPoint
                color="rgba(45, 96, 232, .8)"
                size={(v) => {
                  return v.metadata.severity + 5;
                }}
              />
            }
          />
        }
        xAxis={
          <LinearXAxis type="time">
            <LinearAxisLine />
            <LinearXAxisTickSeries>
              <LinearXAxisTickLine />
              <LinearXAxisTickLabel />
            </LinearXAxisTickSeries>
          </LinearXAxis>
        }
        yAxis={
          <LinearYAxis type="value">
            <LinearAxisLine />
            <LinearYAxisTickSeries>
              <LinearYAxisTickLine />
              <LinearYAxisTickLabel />
            </LinearYAxisTickSeries>
          </LinearYAxis>
        }
      />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};
