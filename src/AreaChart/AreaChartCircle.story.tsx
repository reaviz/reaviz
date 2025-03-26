import React from 'react';
import { singleDateData } from 'reaviz-data-utils';
import { AreaChart } from './AreaChart';
import {
  Area,
  AreaSeries,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries
} from './AreaSeries';
import { ScatterPoint } from '@/ScatterPlot';
import { symbol, symbolStar } from 'd3-shape';
import {
  LinearAxisLine,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries
} from '@/common';

export default {
  tags: ['snapshot'],
  title: 'Charts/Area Chart/Circle Series',
  component: AreaChart,
  subcomponents: {
    AreaSeries,
    Area,
    Line,
    PointSeries,
    StackedAreaSeries,
    StackedNormalizedAreaSeries
  }
};

export const On = () => (
  <AreaChart
    id="on"
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries symbols={<PointSeries show={true} />} />}
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

export const Off = () => (
  <AreaChart
    id="off"
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries symbols={<PointSeries show={false} />} />}
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

export const OnHover = () => (
  <AreaChart
    id="on-hover"
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries symbols={<PointSeries show="hover" />} />}
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

export const OnlyFirst = () => (
  <AreaChart
    id="only-first"
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries symbols={<PointSeries show="first" />} />}
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

export const OnlyLast = () => (
  <AreaChart
    id="only-last"
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries symbols={<PointSeries show="last" />} />}
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

export const Shapes = () => (
  <AreaChart
    id="shapes"
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
