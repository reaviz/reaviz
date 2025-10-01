import React from 'react';
import { RadialAxis } from './RadialAxis';
import { scaleTime } from 'd3-scale';
import { extent, range } from 'd3-array';
import {
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel
} from './RadialAxisTickSeries';
import { startOfDay, subHours, addHours, format } from 'date-fns';

const xScale = (() => {
  const date = startOfDay(subHours(new Date(), 1));

  const data = range(13).map((i) => ({
    key: addHours(date, i)
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
                    <RadialAxisTickLabel format={(d) => format(d, 'h a')} />
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

export const OnclickLabels = () => (
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
                      format={(d) => format(d, 'h a')}
                      onClick={(e, t) =>
                        window.alert(t.toTimeString().split(' ')[0])
                      }
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
