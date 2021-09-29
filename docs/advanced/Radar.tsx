import React, { Fragment, FC } from 'react';
import { ChartContainer, ChartContainerChildProps, GradientStop, RadialArea, RadialAreaSeries, RadialAxis, RadialAxisArc, RadialAxisArcSeries, RadialAxisTick, RadialAxisTickLabel, RadialAxisTickLine, RadialAxisTickSeries, RadialBar, RadialBarSeries, RadialGradient, RadialGuideBar, RadialLine, RadialScatterPoint, RadialScatterSeries } from '../../src/index';
import { scaleLinear, scaleBand } from 'd3-scale';
import { range } from 'd3-array';
import { getDegrees } from '../../src/common/utils/math';
import { symbol, symbolTriangle } from 'd3-shape';
import { ARC_COUNT, buildScale, getRadius, INNER_RADIUS } from './radarUtils';

const InnerX: FC = () => (
  <g transform="translate(-12, -12)">
    <line
      fill="#fff"
      x1="0"
      x2="25"
      y1="0"
      y2="25"
      style={{
        strokeWidth: 1,
        stroke: '#fff'
      }}
    />
    <line
      fill="#fff"
      x1="25"
      x2="0"
      y1="0"
      y2="25"
      style={{
        strokeWidth: 1,
        stroke: '#fff'
      }}
    />
  </g>
);

const RadarLineSeries: FC<any> = ({
  count = 4,
  outerRad,
  innerRad
}) => {
  const lines = range(count);
  const radius = scaleLinear().range([innerRad, outerRad]);
  const angle = scaleBand()
    .domain(lines as any)
    .range([Math.PI / count, (2 + 1 / count) * Math.PI]);

  return lines.map(i => {
    const rotation = getDegrees(angle(i));
    const [x1, x2] = radius.range();

    return (
      <line
        key={i}
        stroke="#054856"
        transform={`rotate(${rotation})`}
        x1={x1}
        x2={x2}
        pointerEvents="none"
      />
    );
  });
};

const RadarScatterPlot: FC<any> = ({
  radius,
  data
}) => {
  const { innerRadius, outerRadius } = getRadius(4, 4, radius);
  const { yScale, xScale, data: scatterData } = buildScale(
    data,
    outerRadius,
    innerRadius,
    false
  );
  return (
    <RadialScatterSeries
      id="radar-scatter"
      data={scatterData}
      xScale={xScale}
      yScale={yScale}
      point={
        <RadialScatterPoint
          symbol={point => {
            let size = 0;
            if (point.value >= 80) {
              size = 200;
            } else if (point.value >= 50) {
              size = 100;
            } else if (point.value >= 40) {
              size = 50;
            }

            const d = (symbol()
              .type(symbolTriangle)
              .size(size))();

            return (
              <path
                d={d}
                fill="#CB003E"
                stroke="#EF0954"
                strokeWidth="1"
              />
            );
          }}
        />
      }
    />
  );
};

const RadarBarChart: FC<any> = ({
  height,
  width,
  radius,
  data
}) => {
  const { innerRadius, outerRadius } = getRadius(9, 12, radius);
  const { yScale, xScale, data: barData } = buildScale(
    data,
    outerRadius,
    innerRadius,
    false
  );

  return (
    <RadialBarSeries
      id="radar-bars"
      colorScheme={["#016691"]}
      data={barData}
      xScale={xScale}
      yScale={yScale}
      innerRadius={innerRadius}
      width={width}
      height={height}
      bar={
        <RadialBar
          gradient={false}
          guide={
            <RadialGuideBar
              opacity={0.2}
              fill="#016691"
            />
          }
        />
      }
    />
  );
};

const RadarAreaChart: FC<any> = ({
  height,
  width,
  radius,
  data
}) => {
  const { innerRadius, outerRadius } = getRadius(6, 8, radius);
  const { yScale, xScale, data: areaData } = buildScale(
    data,
    outerRadius,
    innerRadius,
    true
  );

  return (
    <RadialAreaSeries
      id="radar-area"
      data={areaData}
      xScale={xScale}
      yScale={yScale}
      height={height}
      width={width}
      outerRadius={outerRadius}
      innerRadius={innerRadius}
      colorScheme={["#1E5DC8"]}
      line={<RadialLine strokeWidth={1} />}
      area={
        <RadialArea
          gradient={
            <RadialGradient
              stops={[
                <GradientStop key={1} offset="40%" stopOpacity={0.5} />,
                <GradientStop key={2} offset="10%" stopOpacity={0.1} />
              ]}
            />
          }
        />
      }
    />
  );
};

export const Radar: FC<any> = ({
  margins = 10,
  axisPadding = 5,
  areaData = [],
  barData = [],
  scatterData = []
}) => {
  const renderInnerLines = (outerRad: number) => {
    const { innerRadius } = getRadius(1, 1, outerRad);
    return (
      <RadarLineSeries
        count={25}
        innerRad={innerRadius - axisPadding}
        outerRad={innerRadius}
      />
    );
  };

  const renderSideLines = (outerRad: number) => {
    const { innerRadius } = getRadius(2, 2, outerRad);
    return (
      <RadarLineSeries
        innerRad={innerRadius - axisPadding}
        outerRad={innerRadius + axisPadding}
      />
    );
  };

  const renderOuterLines = (outerRad: number) => {
    const { innerRadius } = getRadius(3, 3, outerRad);
    const outerRadius = outerRad + (margins as number);
    return <RadarLineSeries innerRad={innerRadius} outerRad={outerRadius} />;
  };

  const renderAxis = (height: number, width: number) => {
    const { xScale } = buildScale(areaData, undefined, undefined, true);
    return (
      <RadialAxis
        height={height}
        width={width}
        innerRadius={INNER_RADIUS}
        xScale={xScale}
        arcs={
          <RadialAxisArcSeries
            count={ARC_COUNT}
            arc={
              <RadialAxisArc
                stroke="#054366"
                strokeDasharray={(index: number) => [1, 3, 6, 9, 12].includes(index) ? 'none' : '1,3'}
              />
            }
          />
        }
        ticks={
          <RadialAxisTickSeries
            count={24}
            tick={
              <RadialAxisTick
                line={<RadialAxisTickLine position="outside" />}
              />
            }
          />
        }
      />
    );
  };

  return (
    <ChartContainer
      id="radar"
      width={500}
      height={500}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={true}
    >
      {({ chartWidth, chartHeight }: ChartContainerChildProps) => {
        const rad = Math.min(chartWidth, chartHeight) / 2;
        return (
          <Fragment>
            {renderAxis(chartHeight, chartWidth)}
            {renderOuterLines(rad)}
            {renderSideLines(rad)}
            {renderInnerLines(rad)}
            <RadarBarChart height={chartHeight} width={chartWidth} radius={rad} data={barData} />
            <RadarAreaChart height={chartHeight} width={chartWidth} radius={rad} data={areaData} />
            <RadarScatterPlot radius={rad} data={scatterData} />
            <InnerX />
          </Fragment>
        );
      }}
    </ChartContainer>
  );
}
