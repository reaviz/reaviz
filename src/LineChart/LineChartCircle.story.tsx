import React from 'react';
import { singleDateData } from '../../demo';
import { LineChart } from './LineChart';
import { PointSeries } from '../AreaChart';
import { ScatterPoint } from '../ScatterPlot';
import { symbol, symbolStar } from 'd3-shape';
import { LineSeries } from './LineSeries';
import { MarkLineY } from '../common';

export default {
  title: 'Charts/Line Chart/Circle Series',
  component: LineChart,
  subcomponents: {
    LineSeries
  }
};

export const On = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show={true} />} />}
  />
);

export const OnWithMarkLineY = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <LineSeries
        symbols={<PointSeries show={true} />}
        markLineY={
          <MarkLineY
            height={234}
            pointY={104}
            width={333}
            text="Goal 700k"
            color="white"
          />
        }
      />
    }
  />
);

export const Off = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={null} />}
  />
);

export const OnHover = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="hover" />} />}
  />
);

export const OnlyFirst = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="first" />} />}
  />
);

export const OnlyLast = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="last" />} />}
  />
);

export const Shapes = () => (
  <LineChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <LineSeries
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
