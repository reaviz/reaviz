import { range } from 'd3-array';
import { symbol, symbolStar } from 'd3-shape';
import React, { Fragment, useState } from 'react';
import {
  largeSignalChartData,
  medSignalChartData,
  signalChartData,
  signalStageData,
  signalStages
} from 'reaviz-data-utils';
import { randomNumber } from 'reaviz-data-utils';

import {
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries
} from '@/common/Axis/LinearAxis';
import { schemes } from '@/common/color';
import { Gridline, GridlineSeries, GridStripe } from '@/common/Gridline';

import { ScatterPlot } from './ScatterPlot';
import { ScatterPoint, ScatterSeries } from './ScatterSeries';

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
  />
);

export const CategoricalAxis = () => (
  <ScatterPlot
    id="categorical"
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
);

export const NoAnimation = () => (
  <ScatterPlot
    id="no-animation"
    height={400}
    width={750}
    data={medSignalChartData}
    series={<ScatterSeries animated={false} />}
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
        <ScatterPlot id={`performance-${i}`} data={medSignalChartData} />
      </div>
    ))}
  </Fragment>
);

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <ScatterPlot id="autosize" data={medSignalChartData} />
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
      />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};
