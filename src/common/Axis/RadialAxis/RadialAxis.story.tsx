import React from 'react';
import { RadialAxis } from './RadialAxis';
import { scaleTime } from 'd3-scale';
import { extent, range } from 'd3-array';
import moment from 'moment';
import {
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel
} from './RadialAxisTickSeries';

const xScale = (() => {
  const date = moment().subtract(1, 'day').startOf('day');

  const data = range(13).map((i) => ({
    key: date.clone().add(i, 'hour').toDate()
  }));

  const domain = extent<{ key: Date }, Date>(data, (d) => d.key) as Date[];

  const xScale = scaleTime()
    .range([0, 2 * Math.PI])
    .domain(domain);

  return xScale;
})();

export default {
  title: 'Utils/Axis/Radial'
};

export const Simple = () => (
  <div style={{ padding: '10px' }}>
    <svg width={600} height={600}>
      <g transform="translate(300, 300)">
        <RadialAxis
          height={600}
          width={600}
          innerRadius={10}
          xScale={xScale}
          ticks={
            <RadialAxisTickSeries
              tick={
                <RadialAxisTick
                  label={
                    <RadialAxisTickLabel
                      format={(d) => moment(d).format('h a')}
                    />
                  }
                />
              }
            />
          }
        />
      </g>
    </svg>
  </div>
);
