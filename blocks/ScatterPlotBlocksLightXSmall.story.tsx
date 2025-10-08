import React from 'react';
import {
  GridStripe,
  Gridline,
  GridlineSeries,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  ScatterPlot,
  ScatterPoint,
  ScatterSeries
} from '../src/index';

import {
  largeSignalChartData,
  medSignalChartData,
  signalStageData,
  singleDateData
} from 'reaviz-data-utils';

export default {
  tags: ['snapshot'],
  title: 'Blocks/Scatter Plot/Light/X-Small',
  component: ScatterPlot
};

export const Minimal = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <ScatterPlot
        id="minimal"
        data={singleDateData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="time"
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries
                line={null}
                label={<LinearXAxisTickLabel fill="#535362" />}
                tickSize={50}
              />
            }
          />
        }
        series={
          <ScatterSeries point={<ScatterPoint color="#105EFF" size={3} />} />
        }
      />
    </div>
  );
};

export const Simple = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <ScatterPlot
        id="simple"
        data={medSignalChartData}
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
                line={null}
                label={<LinearXAxisTickLabel fill="#535362" />}
                tickSize={50}
              />
            }
          />
        }
        series={
          <ScatterSeries point={<ScatterPoint color="#105EFF" size={3} />} />
        }
      />
    </div>
  );
};

export const Symbols = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <ScatterPlot
        id="symbols"
        data={singleDateData}
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
                line={null}
                label={<LinearXAxisTickLabel fill="#535362" />}
                tickSize={50}
              />
            }
          />
        }
        series={
          <ScatterSeries
            point={
              <ScatterPoint
                symbol={() => (
                  <g transform={`translate(-${0.05}, -${5})`}>
                    <polygon
                      points="225,10 100,210 350,210"
                      transform={`scale(${0.05}) translate(-220, -50)`}
                      style={{
                        fill: '#105EFF'
                      }}
                    />
                  </g>
                )}
              />
            }
          />
        }
      />
    </div>
  );
};

export const Categorical = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <ScatterPlot
        id="categorical"
        data={signalStageData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            type="category"
            domain={[
              'Threat Intelligence',
              'External Recon',
              'Exploitation',
              'Execution',
              'Defense Evasion',
              'Exfiltration',
              'C2'
            ]}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={10} />
            }
          />
        }
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={<LinearXAxisTickLabel fill="#535362" />}
                tickSize={50}
              />
            }
          />
        }
        series={
          <ScatterSeries point={<ScatterPoint color="#105EFF" size={3} />} />
        }
        gridlines={
          <GridlineSeries
            line={<Gridline direction="y" />}
            stripe={<GridStripe direction="y" fill="#E2E2EA" />}
          />
        }
      />
    </div>
  );
};

export const Bubble = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <ScatterPlot
        id="bubble"
        data={largeSignalChartData}
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
                label={<LinearXAxisTickLabel fill="#535362" />}
                tickSize={10}
              />
            }
          />
        }
        series={
          <ScatterSeries
            point={
              <ScatterPoint
                color="#105EFF90"
                size={(v) => v.metadata.severity * 0.5}
              />
            }
          />
        }
      />
    </div>
  );
};
