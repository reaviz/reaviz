import React from 'react';
import {
  Area,
  AreaChart,
  AreaSeries,
  Gradient,
  GradientStop,
  Gridline,
  GridlineSeries,
  Line,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  PointSeries,
  StackedAreaChart,
  StackedAreaSeries,
  StackedNormalizedAreaChart,
  StackedNormalizedAreaSeries
} from '../src/index';

import {
  areaCircleSeriesV1Data,
  areaMultiSeriesInterpolationSmoothData,
  areaMultiSeriesInterpolationStepData,
  areaMultiSeriesSimpleData,
  areaSingleSeriesInterpolationSmoothData,
  areaSingleSeriesInterpolationStepData,
  areaSingleSeriesNonZeroData,
  areaSingleSeriesSimpleData,
  multiDateData
} from 'reaviz-data-utils';

export default {
  tags: ['skip-snapshot'],
  title: 'Blocks/Area Chart/Dark/X-Small',
  component: AreaChart
};

export const Stacked = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <StackedAreaChart
        id="stacked"
        data={multiDateData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                tickSize={30}
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <StackedAreaSeries
            line={<Line strokeWidth={3} glow={{ blur: 10 }} />}
            area={
              <Area
                glow={{ blur: 20 }}
                color="transparent"
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="80%" stopOpacity={0.2} />
                    ]}
                  />
                }
              />
            }
            colorScheme={['#FAE5F6', '#EE4094', '#BB015A']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const StackedNormalized = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <StackedNormalizedAreaChart
        id="stacked-normalized"
        data={multiDateData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <StackedNormalizedAreaSeries
            line={<Line strokeWidth={3} glow={{ blur: 10 }} />}
            area={
              <Area
                glow={{ blur: 20 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="80%" stopOpacity={0.2} />
                    ]}
                  />
                }
              />
            }
            colorScheme={['#FAE5F6', '#EE4094', '#BB015A']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const NonZero = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="non-zero"
        data={areaSingleSeriesNonZeroData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            line={<Line strokeWidth={3} glow={{ blur: 10 }} />}
            area={
              <Area
                glow={{ blur: 20 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="80%" stopOpacity={0.2} />
                    ]}
                  />
                }
              />
            }
            colorScheme={'#EE4094'}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const MultiSeriesSimple = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="multi-series-simple"
        data={areaMultiSeriesSimpleData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            type="grouped"
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />
                    ]}
                  />
                }
              />
            }
            colorScheme={['#4C86FF', '#40D3F4', '#9152EE']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const Simple = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="simple"
        data={areaSingleSeriesSimpleData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />
                    ]}
                  />
                }
              />
            }
            colorScheme={'#40D3F4'}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const MultiSeriesInterpolationSmooth = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="multi-series-interpolation-smooth"
        data={areaMultiSeriesInterpolationSmoothData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            type="grouped"
            interpolation="smooth"
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />
                    ]}
                  />
                }
              />
            }
            colorScheme={['#5B14C5', '#DAC5F9', '#B58BF3']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const InterpolationSmooth = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="interpolation-smooth"
        data={areaSingleSeriesInterpolationSmoothData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            interpolation="smooth"
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />
                    ]}
                  />
                }
              />
            }
            colorScheme={'#5B14C5'}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const MultiSeriesInterpolationStep = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="multi-series-interpolation-step"
        data={areaMultiSeriesInterpolationStepData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            type="grouped"
            interpolation="step"
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />
                    ]}
                  />
                }
              />
            }
            colorScheme={['#5B14C5', '#DAC5F9', '#B58BF3']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const InterpolationStep = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="interpolation-step"
        data={areaSingleSeriesInterpolationStepData}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            interpolation="step"
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.4} />
                    ]}
                  />
                }
              />
            }
            colorScheme={'#5B14C5'}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const CircleSeries = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <AreaChart
        id="circle-series"
        data={areaCircleSeriesV1Data}
        xAxis={
          <LinearXAxis
            type="time"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    format={(v) =>
                      new Date(v).toLocaleDateString('en-US', {
                        month: 'numeric',
                        day: 'numeric'
                      })
                    }
                    fill="#9A9AAF"
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={
              <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
            }
          />
        }
        series={
          <AreaSeries
            symbols={<PointSeries show={true} />}
            area={
              <Area
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} stopOpacity={0} />,
                      <GradientStop key={1} offset="100%" stopOpacity={0.4} />
                    ]}
                  />
                }
              />
            }
            colorScheme={'#4C86FF'}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};
