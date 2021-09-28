import React from 'react';
import { LinearGauge } from './LinearGauge';
import { DiscreteLegend, DiscreteLegendEntry } from '../common/legends';
import { mitreData } from '../../demo';
import { LinearGaugeSeries } from './LinearGaugeSeries';
import chroma from 'chroma-js';
import { LinearGaugeBar } from './LinearGaugeBar';
import { LinearGaugeOuterBar } from './LinearGaugeOuterBar';

const colorScheme = chroma
  .scale(['#FF9C02', '#870000'])
  .colors(mitreData.length);

// Credit: https://icons8.com/icons/set/access
const Icon = ({ fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width="60"
    height="60"
    fill={fill}
  >
    <path d="M 15 3 C 10.398 3 5.6113281 4.0371094 5.6113281 4.0371094 L 5.6074219 4.0410156 A 2 2 0 0 0 4 6 L 4 12 C 4 22.398 14.021484 26.744141 14.021484 26.744141 A 2 2 0 0 0 15 27 A 2 2 0 0 0 15.974609 26.744141 L 15.978516 26.744141 C 15.979516 26.744141 26 22.398 26 12 L 26 6 A 2 2 0 0 0 24.388672 4.0371094 C 24.388672 4.0371094 19.602 3 15 3 z M 15 7 C 18.309 7 21 9.691 21 13 C 21 16.309 18.309 19 15 19 C 11.691 19 9 16.309 9 13 C 9 9.691 11.691 7 15 7 z M 15 9 C 14.26 9 13.575469 9.2144062 12.980469 9.5664062 L 18.433594 15.019531 C 18.785594 14.424531 19 13.74 19 13 C 19 10.794 17.206 9 15 9 z M 11.566406 10.980469 C 11.214406 11.575469 11 12.26 11 13 C 11 15.206 12.794 17 15 17 C 15.74 17 16.424531 16.785594 17.019531 16.433594 L 11.566406 10.980469 z" />
  </svg>
);

export default {
  title: 'Charts/Gauge/Linear/Multi-Series',
  component: LinearGauge,
  subcomponents: {
    LinearGaugeSeries,
    LinearGauge,
    LinearGaugeBar,
    LinearGaugeOuterBar
  }
};

export const _Simple = () => (
  <div style={{ width: '465px', textAlign: 'center' }}>
    <h2 style={{ color: 'white', margin: 0 }}>MIRTE Attack</h2>
    <LinearGauge
      height={30}
      data={mitreData}
      series={<LinearGaugeSeries colorScheme={colorScheme} />}
    />
    <DiscreteLegend
      orientation="horizontal"
      entries={mitreData.map((v, i) => (
        <DiscreteLegendEntry
          key={v.key}
          style={{ padding: '0 3px' }}
          symbol={<Icon fill={colorScheme[i]} />}
          label={`${v.data}`}
          color={colorScheme[i]}
          orientation="horizontal"
        />
      ))}
    />
  </div>
);
