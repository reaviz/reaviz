import { symbol, symbolStar } from 'd3-shape';
import React from 'react';
import { singleDateData } from 'reaviz-data-utils';

import { PointSeries } from '@/AreaChart';
import { ScatterPoint } from '@/ScatterPlot';

import { LineChart } from './LineChart';
import { LineSeries } from './LineSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Line Chart/Circle Series',
  component: LineChart,
  subcomponents: {
    LineSeries,
  },
};

export const On = () => (
  <LineChart
    id="on"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show={true} />} />}
  />
);

export const Off = () => (
  <LineChart
    id="off"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show={false} />} />}
  />
);

export const OnHover = () => (
  <LineChart
    id="on-hover"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="hover" />} />}
  />
);

export const OnlyFirst = () => (
  <LineChart
    id="only-first"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="first" />} />}
  />
);

export const OnlyLast = () => (
  <LineChart
    id="only-last"
    width={350}
    height={250}
    data={singleDateData}
    series={<LineSeries symbols={<PointSeries show="last" />} />}
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
                        strokeWidth: 1.5,
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
