import React, { useState } from 'react';

import { LinearGauge } from './LinearGauge';
import { LinearGaugeBar } from './LinearGaugeBar';
import { LinearGaugeOuterBar } from './LinearGaugeOuterBar';
import { LinearGaugeSeries } from './LinearGaugeSeries';

export default {
  tags: ['snapshot'],
  title: 'Charts/Gauge/Linear/Single-Series',
  component: LinearGauge,
  subcomponents: {
    LinearGaugeSeries,
    LinearGauge,
    LinearGaugeBar,
    LinearGaugeOuterBar
  }
};

export const Simple = () => (
  <div style={{ textAlign: 'center' }}>
    <h2 style={{ color: 'white', margin: 0 }}>Risk Score</h2>
    <LinearGauge
      id="simple"
      height={30}
      width={300}
      data={{ key: 'Risk Score', data: 80 }}
    />
  </div>
);

export const AutoSize = () => {
  const [width, setWidth] = useState(300);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width, padding: 5, border: 'solid 1px red' }}>
        <LinearGauge
          id="auto-size"
          height={20}
          data={{ key: 'Risk Score', data: 80 }}
        />
      </div>
      <br />
      <button type="button" onClick={() => setWidth(width === 300 ? 150 : 300)}>
        Update Size
      </button>
    </div>
  );
};

export const NonZeroStart = () => (
  <div style={{ textAlign: 'center' }}>
    <LinearGauge
      id="non-zero-start"
      height={30}
      width={300}
      data={{ key: 'Risk Score', data: [15, 80] }}
    />
  </div>
);

NonZeroStart.story = {
  name: 'Non-Zero Start'
};

export const MultipleGauges = () => (
  <div style={{ textAlign: 'center' }}>
    <LinearGauge
      id="multiple-gauges-1"
      height={15}
      width={300}
      data={{ key: 'Step 1', data: [0, 15] }}
    />
    <br />
    <LinearGauge
      id="multiple-gauges-2"
      height={15}
      width={300}
      data={{ key: 'Step 2', data: [15, 50] }}
    />
    <br />
    <LinearGauge
      id="multiple-gauges-3"
      height={15}
      width={300}
      data={{ key: 'Step 3', data: [50, 55] }}
    />
    <br />
    <LinearGauge
      id="multiple-gauges-4"
      height={15}
      width={300}
      data={{ key: 'Step 4', data: [55, 100] }}
    />
  </div>
);
