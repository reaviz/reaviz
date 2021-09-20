import React, { Component } from 'react';
import { LineChart, LineSeries } from '../../LineChart';
import {
  largeDateData,
  randomNumber,
  generateDate,
  signalStageData,
  signalStages
} from '../../../demo';
import {
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel
} from '../Axis';
import { TooltipArea } from '../Tooltip';
import { ChartBrush } from './ChartBrush';
import { ScatterPlot, ScatterSeries, ScatterPoint } from '../../ScatterPlot';
import { BarChart, HistogramBarSeries } from '../../BarChart';
import { range } from 'd3-array';
import { Tooltip } from 'realayers';
import { GridlineSeries, Gridline, GridStripe } from '../Gridline';
import { ChartZoomPan } from '../ZoomPan';

export default {
  title: 'Utils/Brush'
};

export const Line = () => (
  <LineChart
    width={450}
    height={85}
    data={largeDateData}
    brush={<ChartBrush disabled={false} />}
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
    yAxis={
      <LinearYAxis
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
      />
    }
  />
);

export const Scatter = () => (
  <ScatterPlot
    width={450}
    height={85}
    data={largeDateData}
    brush={<ChartBrush disabled={false} />}
    series={
      <ScatterSeries
        point={<ScatterPoint tooltip={<TooltipArea disabled={true} />} />}
      />
    }
    yAxis={
      <LinearYAxis
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
      />
    }
  />
);

export const Bar = () => {
  const barData = range(50)
    .filter(() => randomNumber(1, 2) % 2)
    .map((i) => ({
      key: generateDate(randomNumber(i - 2, i + 2)),
      data: randomNumber(1, 10)
    }))
    .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));

  return (
    <BarChart
      width={450}
      height={45}
      brush={<ChartBrush disabled={false} />}
      data={barData}
      gridlines={null}
      yAxis={
        <LinearYAxis
          axisLine={null}
          tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
        />
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
      series={
        <HistogramBarSeries tooltip={null} binSize={60 * 60 * 24 * 1000} />
      }
    />
  );
};

export const Bubble = () => {
  const data = range(20)
    .filter(() => randomNumber(1, 10) % 2)
    .map((i) => {
      return {
        key: generateDate(i),
        data: 1,
        metadata: {
          severity: randomNumber(1, 10)
        }
      };
    })
    .reverse();

  return (
    <ScatterPlot
      width={450}
      height={85}
      data={data}
      brush={<ChartBrush disabled={false} />}
      series={
        <ScatterSeries
          point={
            <ScatterPoint
              tooltip={<TooltipArea disabled={true} />}
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
      yAxis={
        <LinearYAxis
          domain={[0, 2]}
          axisLine={null}
          tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
        />
      }
      xAxis={
        <LinearXAxis
          type="time"
          roundDomains={true}
          domain={[generateDate(22), generateDate(2)]}
          axisLine={null}
          tickSeries={
            <LinearXAxisTickSeries
              line={null}
              label={<LinearXAxisTickLabel rotation={false} padding={5} />}
            />
          }
        />
      }
      gridlines={<GridlineSeries line={<Gridline direction="x" />} />}
    />
  );
};

export const DefaultSelection = () => (
  <LineChart
    width={450}
    height={85}
    data={largeDateData}
    brush={
      <ChartBrush
        disabled={false}
        domain={[
          largeDateData[largeDateData.length / 2].key,
          largeDateData[largeDateData.length - 1].key
        ]}
      />
    }
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

export const ZoomCombo = () => <ZoomBrushStory />;

class ZoomBrushStory extends Component {
  state = {
    domain: undefined,
    brushing: false
  };
  timeout: any;

  onBrushChange = ({ domain }) => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ brushing: false }), 3000);

    this.setState({
      domain,
      brushing: true
    });
  };

  render() {
    const { brushing, domain } = this.state;
    const brushData = signalStageData.map((d) => ({
      ...d,
      data: 1
    }));

    return (
      <div>
        <ScatterPlot
          height={400}
          width={750}
          data={signalStageData}
          series={<ScatterSeries animated={!brushing} />}
          gridlines={
            <GridlineSeries
              line={<Gridline direction="y" />}
              stripe={<GridStripe direction="y" />}
            />
          }
          yAxis={
            <LinearYAxis
              domain={signalStages as any}
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={<LinearYAxisTickLabel rotation={false} />}
                />
              }
            />
          }
          zoomPan={
            <ChartZoomPan
              disabled={false}
              onZoomPan={this.onBrushChange}
              domain={domain}
            />
          }
        />
        <br />
        <div style={{ marginLeft: '100px' }}>
          <ScatterPlot
            height={50}
            width={650}
            data={brushData}
            margins={[0, 10]}
            gridlines={null}
            yAxis={
              <LinearYAxis
                domain={[0, 2]}
                type="value"
                axisLine={null}
                tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
              />
            }
            series={
              <ScatterSeries
                animated={!brushing}
                point={
                  <ScatterPoint
                    tooltip={<Tooltip disabled={true} />}
                    size={(d) => {
                      return d.metadata.severity + 5;
                    }}
                  />
                }
              />
            }
            brush={
              <ChartBrush
                disabled={false}
                domain={domain}
                onBrushChange={this.onBrushChange}
              />
            }
          />
        </div>
      </div>
    );
  }
}
