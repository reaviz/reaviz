import { timeDay } from 'd3-time';
import {
  singleDateData,
  singleDateBigIntData,
  nonZeroDateData
} from 'reaviz-data-utils';
import { AreaChart } from './AreaChart';
import { range } from 'd3-array';
import {
  AreaSeries,
  Area,
  Line,
  PointSeries,
  StackedAreaSeries,
  StackedNormalizedAreaSeries
} from './AreaSeries';
import {
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisLine,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries
} from '@/common/Axis/LinearAxis';
import { Gradient, GradientStop } from '@/common/Gradient';
import { Stripes } from '@/common/Mask';
import { ChartDataShape } from '@/common/data';

export default {
  tags: ['snapshot'],
  title: 'Charts/Area Chart/Single Series',
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

export const Simple = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        interpolation="linear"
        colorScheme="cybertron"
        line={<Line strokeWidth={4} />}
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

export const Masks = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        interpolation="smooth"
        area={
          <Area
            mask={<Stripes />}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="0%" stopOpacity={0.2} />,
                  <GradientStop offset="50%" stopOpacity={1} />
                ]}
              />
            }
          />
        }
        line={<Line strokeWidth={3} />}
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

export const Interpolation = () => (
  <div style={{ display: 'flex', gap: 20 }}>
    <div>
      <h1>Smooth</h1>
      <AreaChart
        width={350}
        height={250}
        data={singleDateData}
        series={<AreaSeries interpolation="smooth" />}
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
    <div>
      <h1>Step</h1>
      <AreaChart
        width={350}
        height={250}
        data={singleDateData}
        series={<AreaSeries interpolation="step" />}
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
  </div>
);

export const NoAnimation = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={<AreaSeries animated={false} />}
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

export const NonZero = () => (
  <AreaChart
    width={350}
    height={250}
    data={nonZeroDateData as ChartDataShape[]}
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

NonZero.story = {
  name: 'Non-Zero'
};

export const Interval = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    xAxis={
      <LinearXAxis type="time">
        <LinearAxisLine />
        <LinearXAxisTickSeries interval={timeDay}>
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

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <AreaChart
      data={singleDateData}
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

export const SingleValue = () => (
  <AreaChart
    data={[singleDateData[0]]}
    width={350}
    height={250}
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

export const Performance = () =>
  range(15).map((i) => (
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
      <AreaChart
        data={singleDateData}
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
  ));
Performance.tags = ['skip-snapshot'];

export const BigInt = () => (
  <AreaChart
    id="big-int"
    width={350}
    height={250}
    data={singleDateBigIntData}
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
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);
