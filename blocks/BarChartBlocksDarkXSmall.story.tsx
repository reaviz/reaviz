import React from 'react';
import {
  Bar,
  BarChart,
  BarLabel,
  BarSeries,
  Gradient,
  GradientStop,
  Gridline,
  GridlineSeries,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries,
  RangeLines,
  StackedBarChart,
  StackedBarSeries
} from '../src/index';

import {
  binnedDateData,
  categoryData,
  labelsData,
  largeCategoryData2,
  mediumCategoryData,
  multiCategory,
  multiCategoryXSmallBlock
} from 'reaviz-data-utils';

export default {
  tags: ['skip-snapshot'],
  title: 'Blocks/Bar Chart/Dark/X-Small',
  component: BarChart
};

export const SimpleMulti = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={multiCategoryXSmallBlock}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                width={6}
                glow={{ blur: 20, opacity: 0.7 }}
                gradient={null}
              />
            }
            colorScheme={['#DAC5F9', '#40E5D1', '#9152EE', '#5B14C5']}
            layout="vertical"
            type="grouped"
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const SimpleMultiGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={multiCategoryXSmallBlock}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                width={6}
                glow={{ blur: 30 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={1} />
                    ]}
                  />
                }
              />
            }
            colorScheme={['#DAC5F9', '#40E5D1', '#9152EE', '#5B14C5']}
            layout="vertical"
            type="grouped"
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
      <BarChart
        data={mediumCategoryData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />}
            colorScheme={[
              '#5B14C5',
              '#9152EE',
              '#40E5D1',
              '#A840E8',
              '#4C86FF',
              '#0D4ED2',
              '#40D3F4'
            ]}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const SimpleGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={mediumCategoryData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                glow={{ blur: 20, opacity: 0.5 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={1} />
                    ]}
                  />
                }
              />
            }
            colorScheme={[
              '#5B14C5',
              '#9152EE',
              '#40E5D1',
              '#A840E8',
              '#4C86FF',
              '#0D4ED2',
              '#40D3F4'
            ]}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const Labels = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={labelsData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                glow={{ blur: 20, opacity: 0.3 }}
                gradient={null}
                label={<BarLabel fill="" position={'top'} padding={15} />}
              />
            }
            colorScheme={[
              '#0D4ED2',
              '#4C86FF',
              '#40D3F4',
              '#40E5D1',
              '#DAC5F9',
              '#9152EE',
              '#5B14C5'
            ]}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const LabelsGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={labelsData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                glow={{ blur: 20, opacity: 0.3 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={1} />
                    ]}
                  />
                }
                label={<BarLabel fill="" position={'top'} padding={15} />}
              />
            }
            colorScheme={[
              '#0D4ED2',
              '#4C86FF',
              '#40D3F4',
              '#40E5D1',
              '#DAC5F9',
              '#9152EE',
              '#5B14C5'
            ]}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const Waterfall = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={categoryData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={<Bar glow={{ blur: 20, opacity: 0.7 }} gradient={null} />}
            type="waterfall"
            colorScheme={['#40E5D1', '#40D3F4', '#4C86FF', '#9152EE']}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const WaterfallGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={categoryData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                glow={{ blur: 20, opacity: 0.7 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={1} />
                    ]}
                  />
                }
              />
            }
            type="waterfall"
            colorScheme={['#40E5D1', '#40D3F4', '#4C86FF', '#9152EE']}
            padding={0.2}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const LargeDataset = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={largeCategoryData2}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={<Bar glow={{ blur: 20 }} gradient={null} />}
            colorScheme={'#5B14C5'}
            padding={0.5}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const LargeDatasetGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <BarChart
        data={largeCategoryData2}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <BarSeries
            bar={
              <Bar
                glow={{ blur: 20 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={1} />
                    ]}
                  />
                }
              />
            }
            colorScheme={'#5B14C5'}
            padding={0.5}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const Stacked = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <StackedBarChart
        data={multiCategory}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <StackedBarSeries
            bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />}
            colorScheme={['#4C86FF', '#40E5D1', '#40D3F4', '#9152EE']}
            padding={0.35}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const StackedGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <StackedBarChart
        data={multiCategory}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            tickSeries={
              <LinearXAxisTickSeries
                label={
                  <LinearXAxisTickLabel
                    padding={10}
                    rotation={-45}
                    format={(text) => `${text.slice(0, 5)}...`}
                  />
                }
                tickSize={30}
              />
            }
          />
        }
        series={
          <StackedBarSeries
            bar={
              <Bar
                glow={{ blur: 20, opacity: 0.5 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={1} />
                    ]}
                  />
                }
              />
            }
            colorScheme={['#4C86FF', '#40E5D1', '#40D3F4', '#9152EE']}
            padding={0.35}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const StackedDiverging = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <StackedBarChart
        data={binnedDateData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries line={null} label={null} tickSize={30} />
            }
          />
        }
        series={
          <StackedBarSeries
            type="stackedDiverging"
            bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />}
            colorScheme={['#F7BFC1', '#E84045']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const StackedDivergingGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <StackedBarChart
        data={binnedDateData}
        yAxis={
          <LinearYAxis
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries line={null} label={null} tickSize={30} />
            }
          />
        }
        series={
          <StackedBarSeries
            type="stackedDiverging"
            bar={[
              <Bar
                key={1}
                glow={{ blur: 20, opacity: 0.5 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={1} />,
                      <GradientStop key={2} offset="90%" stopOpacity={0} />
                    ]}
                  />
                }
              />,
              <Bar
                key={2}
                glow={{ blur: 20, opacity: 0.5 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="10%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={1} />
                    ]}
                  />
                }
              />
            ]}
            colorScheme={['#F7BFC1', '#E84045']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const HorizontalStackedDivergingGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <StackedBarChart
        data={binnedDateData}
        yAxis={
          <LinearYAxis
            type="category"
            axisLine={null}
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
          />
        }
        xAxis={
          <LinearXAxis
            type="value"
            tickSeries={
              <LinearXAxisTickSeries
                label={<LinearXAxisTickLabel />}
                tickSize={30}
              />
            }
          />
        }
        series={
          <StackedBarSeries
            layout="horizontal"
            type="stackedDiverging"
            bar={[
              <Bar
                key={1}
                glow={{ blur: 30 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0.7} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0} />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={4} />}
              />,
              <Bar
                key={1}
                glow={{ blur: 30 }}
                gradient={
                  <Gradient
                    stops={[
                      <GradientStop key={1} offset="0%" stopOpacity={0} />,
                      <GradientStop key={2} offset="100%" stopOpacity={0.7} />
                    ]}
                  />
                }
                rangeLines={<RangeLines position="top" strokeWidth={4} />}
              />
            ]}
            colorScheme={['#E84045', '#F8A446']}
          />
        }
        gridlines={
          <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
        }
      />
    </div>
  );
};

export const HorizontalSimple = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <BarChart
          data={categoryData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />}
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalSimpleGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <BarChart
          data={categoryData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={
                <Bar
                  glow={{ blur: 20, opacity: 0.5 }}
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} offset="0%" stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={1} />
                      ]}
                    />
                  }
                />
              }
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalWaterfall = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <BarChart
          data={categoryData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={<Bar glow={{ blur: 20, opacity: 0.7 }} gradient={null} />}
              type="waterfall"
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalWaterfallGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <BarChart
          data={categoryData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={
                <Bar
                  glow={{ blur: 20, opacity: 0.7 }}
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} offset="0%" stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={1} />
                      ]}
                    />
                  }
                />
              }
              type="waterfall"
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalLabels = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow pl-2 pr-10 overflow-x-visible'}>
        <BarChart
          data={categoryData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={
                <Bar
                  glow={{ blur: 20, opacity: 0.5 }}
                  gradient={null}
                  label={<BarLabel fill="" padding={15} />}
                />
              }
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalLabelsGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow pl-2 pr-10 overflow-x-visible'}>
        <BarChart
          data={categoryData}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              layout="horizontal"
              bar={
                <Bar
                  glow={{ blur: 20, opacity: 0.5 }}
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} offset="0%" stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={1} />
                      ]}
                    />
                  }
                  label={<BarLabel fill="" padding={15} />}
                />
              }
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalSimpleMulti = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <BarChart
          data={multiCategoryXSmallBlock}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              type="grouped"
              layout="horizontal"
              bar={
                <Bar
                  width={6}
                  glow={{ blur: 20, opacity: 0.7 }}
                  gradient={null}
                />
              }
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalSimpleMultiGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <BarChart
          data={multiCategoryXSmallBlock}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <BarSeries
              type="grouped"
              layout="horizontal"
              bar={
                <Bar
                  width={6}
                  glow={{ blur: 20, opacity: 0.7 }}
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} offset="0%" stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={1} />
                      ]}
                    />
                  }
                />
              }
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalStacked = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <StackedBarChart
          data={multiCategory}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <StackedBarSeries
              layout="horizontal"
              bar={<Bar glow={{ blur: 20, opacity: 0.5 }} gradient={null} />}
              padding={0.2}
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};

export const HorizontalStackedGradient = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <div className={'flex-grow px-2'}>
        <StackedBarChart
          data={multiCategoryXSmallBlock}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={
                <LinearYAxisTickSeries
                  label={
                    <LinearYAxisTickLabel
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                />
              }
            />
          }
          xAxis={
            <LinearXAxis
              type="value"
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries label={null} line={null} tickSize={30} />
              }
            />
          }
          series={
            <StackedBarSeries
              layout="horizontal"
              bar={
                <Bar
                  glow={{ blur: 20, opacity: 0.5 }}
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} offset="0%" stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={1} />
                      ]}
                    />
                  }
                />
              }
              padding={0.2}
              colorScheme={['#9152EE', '#40D3F4', '#40E5D1', '#4C86FF']}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </div>
  );
};
