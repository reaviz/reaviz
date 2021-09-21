import React, { FC } from 'react';
import { largeDateData, largeSignalChartData } from '../../../demo';
import { LineChart, LineSeries } from '../../LineChart';
import { ChartZoomPan, ZoomPan } from '../ZoomPan';
import { ScatterPlot, ScatterSeries, ScatterPoint } from '../../ScatterPlot';
import { AreaChart, AreaSeries } from '../../AreaChart';
import { TooltipArea } from '../Tooltip';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel
} from '../Axis';
import { useState } from '@storybook/addons';

export default {
  title: 'Utils/Zoom Pan'
};

export const Line = () => (
  <LineChart
    width={450}
    height={300}
    data={largeDateData}
    zoomPan={<ChartZoomPan />}
    series={
      <LineSeries tooltip={<TooltipArea disabled={true} />} markLine={null} />
    }
    xAxis={
      <LinearXAxis
        type="time"
        tickSeries={
          <LinearXAxisTickSeries
            label={<LinearXAxisTickLabel rotation={false} />}
          />
        }
      />
    }
  />
);

export const Area = () => (
  <AreaChart
    width={350}
    height={250}
    data={largeDateData}
    zoomPan={<ChartZoomPan />}
    series={
      <AreaSeries tooltip={<TooltipArea disabled={true} />} markLine={null} />
    }
    xAxis={
      <LinearXAxis
        type="time"
        tickSeries={
          <LinearXAxisTickSeries
            label={<LinearXAxisTickLabel rotation={false} />}
          />
        }
      />
    }
  />
);

export const Scatter = () => (
  <ScatterPlot
    height={400}
    width={750}
    data={largeSignalChartData}
    margins={20}
    zoomPan={<ChartZoomPan />}
    xAxis={
      <LinearXAxis
        type="time"
        tickSeries={
          <LinearXAxisTickSeries
            label={<LinearXAxisTickLabel rotation={false} />}
          />
        }
      />
    }
    series={
      <ScatterSeries
        point={
          <ScatterPoint
            color="rgba(174, 52, 255, .5)"
            size={(v) => v.metadata.severity + 5}
          />
        }
      />
    }
  />
);

export const GenericZoomPan = () => <GenericZoomPanStory />;

export const GenericZoomPanWModifier = () => (
  <GenericZoomPanStory modifier={true} />
);

GenericZoomPanWModifier.story = {
  name: 'Generic Zoom Pan w/ Modifier'
};

export const DefaultZoom = () => {
  const [domain, setDomain] = React.useState<[any, any]>([
    largeDateData[5].key,
    largeDateData[25].key
  ]);
  return (
    <LineChart
      width={450}
      height={300}
      data={largeDateData}
      zoomPan={
        <ChartZoomPan
          domain={domain}
          onZoomPan={({ domain }) => {
            setDomain(domain);
          }}
        />
      }
      series={
        <LineSeries tooltip={<TooltipArea disabled={true} />} markLine={null} />
      }
      xAxis={
        <LinearXAxis
          domain={domain}
          type="time"
          tickSeries={
            <LinearXAxisTickSeries
              label={<LinearXAxisTickLabel rotation={false} />}
            />
          }
        />
      }
    />
  );
};

const GenericZoomPanStory: FC<any> = ({ modifier }) => {
  const [{ scale, x, y }, setState] = React.useState({
    scale: 1,
    x: 0,
    y: 0
  });

  return (
    <div style={{ border: 'dotted 2px red' }}>
      <svg height="350" width="500">
        <ZoomPan
          height={350}
          width={500}
          pannable={true}
          minZoom={1}
          maxZoom={10}
          constrain={false}
          scale={scale}
          x={x}
          y={y}
          requireZoomModifier={modifier}
          onZoomPan={(e) => setState(e)}
        >
          <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            <circle cx="50" cy="100" r="10" fill="blue" />
            <circle cx="100" cy="100" r="10" fill="red" />
            <circle cx="150" cy="100" r="10" fill="green" />
          </g>
        </ZoomPan>
      </svg>
    </div>
  );
};
