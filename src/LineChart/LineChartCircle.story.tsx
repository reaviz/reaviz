import React from 'react';
import { singleDateData } from 'reaviz-data-utils';
import { LineChart } from './LineChart';
import { PointSeries } from '@/AreaChart';
import { ScatterPoint } from '@/ScatterPlot';
import { symbol, symbolStar } from 'd3-shape';
import { LineSeries } from './LineSeries';
import { LinearAxisLine, LinearXAxis, LinearYAxis } from '@/common';

export default {
  tags: ['snapshot'],
  title: 'Charts/Line Chart/Circle Series',
  component: LineChart,
  subcomponents: {
    LineSeries
  }
};

export const On = () => (
  <LineChart
    id="on"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show={true} />} />}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

export const Off = () => (
  <LineChart
    id="off"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show={false} />} />}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

export const OnHover = () => (
  <LineChart
    id="on-hover"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="hover" />} />}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

export const OnlyFirst = () => (
  <LineChart
    id="only-first"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="first" />} />}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

export const OnlyLast = () => (
  <LineChart
    id="only-last"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="last" />} />}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);

export const Shapes = () => (
  <LineChart
    id="shapes"
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
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
      </LinearYAxis>
    }
  />
);
