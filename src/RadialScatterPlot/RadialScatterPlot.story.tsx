import {
  medDateData,
  largeSignalChartData,
  medSignalChartData,
  categoryData
} from 'reaviz-data-utils';
import { RadialScatterPlot } from './RadialScatterPlot';
import { RadialScatterSeries, RadialScatterPoint } from './RadialScatterSeries';
import {
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisArcSeries,
  RadialAxisTick,
  RadialAxisTickLine
} from '../common/Axis/RadialAxis';

export default {
  title: 'Charts/Scatter Plot/Radial',
  component: RadialScatterPlot,
  subcomponents: {
    RadialScatterSeries,
    RadialScatterPoint
  }
};

export const Simple = () => (
  <RadialScatterPlot
    id="simple"
    height={450}
    width={450}
    data={medDateData}
    innerRadius={80}
    series={
      <RadialScatterSeries
        animated
        point={<RadialScatterPoint size={5} color="rgba(45, 96, 232, .8)" />}
      />
    }
    axis={
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
  />
);

export const Categories = () => (
  <RadialScatterPlot
    id="categories"
    height={450}
    width={450}
    data={categoryData}
    innerRadius={80}
    series={
      <RadialScatterSeries
        point={<RadialScatterPoint size={5} color="rgba(45, 96, 232, .8)" />}
      />
    }
    axis={
      <RadialAxis type="category">
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
  />
);

export const Bubble = () => (
  <RadialScatterPlot
    id="bubble"
    height={450}
    width={450}
    data={largeSignalChartData}
    innerRadius={0.1}
    series={
      <RadialScatterSeries
        animated
        point={
          <RadialScatterPoint
            color="rgba(45, 96, 232, .6)"
            size={(v) => v.metadata.severity + 5}
          />
        }
      />
    }
    axis={
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
  />
);

export const Symbols = () => (
  <RadialScatterPlot
    id="symbols"
    height={450}
    width={450}
    data={medSignalChartData}
    innerRadius={80}
    series={
      <RadialScatterSeries
        animated
        point={
          <RadialScatterPoint
            symbol={(d) => {
              const scale = d.metadata.severity / 50;
              const size = scale * 100;
              return (
                <g transform={`translate(-${size}, -${size})`}>
                  <polygon
                    points="225,10 100,210 350,210"
                    transform={`scale(${scale})`}
                    style={{
                      fill: 'rgba(206, 0, 62, .7)',
                      stroke: '#FF004D',
                      strokeWidth: 5
                    }}
                  />
                </g>
              );
            }}
          />
        }
      />
    }
    axis={
      <RadialAxis>
        <RadialAxisArcSeries count={10} />
        <RadialAxisTickSeries count={5}>
          <RadialAxisTick>
            <RadialAxisTickLine position="inside" />
          </RadialAxisTick>
        </RadialAxisTickSeries>
      </RadialAxis>
    }
  />
);

export const Resizable = () => (
  <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
    <RadialScatterPlot
      id="resizable"
      height={210}
      width={210}
      data={largeSignalChartData}
      innerRadius={10}
      series={
        <RadialScatterSeries
          animated
          point={<RadialScatterPoint size={5} color="rgba(45, 96, 232, .6)" />}
        />
      }
      axis={
        <RadialAxis>
          <RadialAxisArcSeries count={10} />
          <RadialAxisTickSeries count={5}>
            <RadialAxisTick>
              <RadialAxisTickLine position="inside" />
            </RadialAxisTick>
          </RadialAxisTickSeries>
        </RadialAxis>
      }
    />
  </div>
);
