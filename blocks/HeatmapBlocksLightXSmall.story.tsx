import React from 'react';
import {
  Heatmap,
  HeatmapCell,
  HeatmapSeries,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  ScatterPlot,
  SequentialLegend
} from '../src/index';

import {
  heatmapXSmallBlocksData,
  heatmapXSmallSimpleBlocksData
} from 'reaviz-data-utils';
import { schemes } from '../src/common/color/schemes';

export default {
  tags: ['skip-snapshot'],
  title: 'Blocks/Heatmap/Light/X-Small',
  component: ScatterPlot
};

export const Simple = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={[
                {
                  fill: '#FFC600',
                  filter: 'drop-shadow(0px 0px 5px #FFC600)'
                },
                { fill: '#F68500' },
                { fill: '#E00007' }
              ]}
              padding={0.25}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const SimpleCircle = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={() => <circle r={8} transform="translate(8, 8)" />}
                />
              }
              colorScheme={[
                {
                  fill: '#FFC600',
                  filter: 'drop-shadow(0px 0px 5px #FFC600)'
                },
                { fill: '#F68500' },
                { fill: '#E00007' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const SimpleHex = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={(data) => {
                    const rowNumber =
                      heatmapXSmallBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(2, 2) rotate(90)';

                    const size = 110;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.2; // Adjust this value to make the hexagon slimmer or wider

                    const d = `M ${radius * slimFactor} 0
                                 L ${(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-radius * slimFactor} 0
                                 L ${-(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 }
                                 L ${(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 } Z`;

                    if (rowNumber % 2 === 0) {
                      transform = 'translate(12, 2) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                {
                  fill: '#FFC600',
                  filter: 'drop-shadow(0px 0px 5px #FFC600)'
                },
                { fill: '#F68500' },
                { fill: '#E00007' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const Intensity = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#8b00e066', stroke: '#9152EE', strokeWidth: '2px' },
                { fill: '#F8A340' },
                { fill: '#FFD440', filter: 'drop-shadow(0px 0px 5px #FFD440)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={['#8b00e066', '#F8A340', '#FFD440']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const IntensityCircle = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={() => <circle r={8} transform="translate(8, 8)" />}
                />
              }
              colorScheme={[
                { fill: '#8b00e066', stroke: '#9152EE', strokeWidth: '2px' },
                { fill: '#F8A340' },
                { fill: '#FFD440', filter: 'drop-shadow(0px 0px 5px #FFD440)' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#8b00e066', '#F8A340', '#FFD440']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const IntensityHex = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={(data) => {
                    const rowNumber =
                      heatmapXSmallBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(2, 2) rotate(90)';

                    const size = 110;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.2; // Adjust this value to make the hexagon slimmer or wider

                    const d = `M ${radius * slimFactor} 0
                                 L ${(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-radius * slimFactor} 0
                                 L ${-(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 }
                                 L ${(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 } Z`;

                    if (rowNumber % 2 === 0) {
                      transform = 'translate(12, 2) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                { fill: '#8b00e066', stroke: '#9152EE', strokeWidth: '2px' },
                { fill: '#F8A340' },
                { fill: '#FFD440', filter: 'drop-shadow(0px 0px 5px #FFD440)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#8b00e066', '#F8A340', '#FFD440']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const Correlation = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#01736566' },
                { fill: '#40e5d166', stroke: '#40E5D1', strokeWidth: '2px' },
                { fill: '#40E5D1', filter: 'drop-shadow(0px 0px 5px #40E5D1)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={['#01736566', '#40e5d166', '#40E5D1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const CorrelationCircle = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={() => <circle r={8} transform="translate(8, 8)" />}
                />
              }
              colorScheme={[
                { fill: '#01736566' },
                { fill: '#40e5d166', stroke: '#40E5D1', strokeWidth: '2px' },
                { fill: '#40E5D1', filter: 'drop-shadow(0px 0px 5px #40E5D1)' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#01736566', '#40e5d166', '#40E5D1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const CorrelationyHex = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={(data) => {
                    const rowNumber =
                      heatmapXSmallBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(2, 2) rotate(90)';

                    const size = 110;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.2; // Adjust this value to make the hexagon slimmer or wider

                    const d = `M ${radius * slimFactor} 0
                                 L ${(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-radius * slimFactor} 0
                                 L ${-(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 }
                                 L ${(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 } Z`;

                    if (rowNumber % 2 === 0) {
                      transform = 'translate(12, 2) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                { fill: '#01736566' },
                { fill: '#40e5d166', stroke: '#40E5D1', strokeWidth: '2px' },
                { fill: '#40E5D1', filter: 'drop-shadow(0px 0px 5px #40E5D1)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#01736566', '#40e5d166', '#40E5D1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const Geospatial = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#202E03', stroke: '#AADC40', strokeWidth: '2px' },
                { fill: '#80CE5B' },
                { fill: '#D5EFC8', filter: 'drop-shadow(0px 0px 5px #D5EFC8)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={['#202E03', '#80CE5B', '#D5EFC8']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const GeospatialCircle = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={() => <circle r={8} transform="translate(8, 8)" />}
                />
              }
              colorScheme={[
                { fill: '#202E03', stroke: '#AADC40', strokeWidth: '2px' },
                { fill: '#80CE5B' },
                { fill: '#D5EFC8', filter: 'drop-shadow(0px 0px 5px #D5EFC8)' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#202E03', '#80CE5B', '#D5EFC8']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const GeospatialHex = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={(data) => {
                    const rowNumber =
                      heatmapXSmallBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(2, 2) rotate(90)';

                    const size = 110;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.2; // Adjust this value to make the hexagon slimmer or wider

                    const d = `M ${radius * slimFactor} 0
                                 L ${(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-radius * slimFactor} 0
                                 L ${-(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 }
                                 L ${(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 } Z`;

                    if (rowNumber % 2 === 0) {
                      transform = 'translate(12, 2) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                { fill: '#202E03', stroke: '#AADC40', strokeWidth: '2px' },
                { fill: '#80CE5B' },
                { fill: '#D5EFC8', filter: 'drop-shadow(0px 0px 5px #D5EFC8)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#202E03', '#80CE5B', '#D5EFC8']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const Warm = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#F7BFC166' },
                { fill: '#e0000766', stroke: '#E00007', strokeWidth: '2px' },
                { fill: '#E00007', filter: 'drop-shadow(0px 0px 5px #E00007)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={['#F7BFC166', '#e0000766', '#E00007']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const WarmCircle = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={() => <circle r={8} transform="translate(8, 8)" />}
                />
              }
              colorScheme={[
                { fill: '#F7BFC166' },
                { fill: '#e0000766', stroke: '#E00007', strokeWidth: '2px' },
                { fill: '#E00007', filter: 'drop-shadow(0px 0px 5px #E00007)' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={[`#F7BFC166`, `#e0000766`, `#E00007`]}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const WarmHex = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={(data) => {
                    const rowNumber =
                      heatmapXSmallBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(2, 2) rotate(90)';

                    const size = 110;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.2; // Adjust this value to make the hexagon slimmer or wider

                    const d = `M ${radius * slimFactor} 0
                                 L ${(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-radius * slimFactor} 0
                                 L ${-(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 }
                                 L ${(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 } Z`;

                    if (rowNumber % 2 === 0) {
                      transform = 'translate(12, 2) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                { fill: '#F7BFC166' },
                { fill: '#e0000766', stroke: '#E00007', strokeWidth: '2px' },
                { fill: '#E00007', filter: 'drop-shadow(0px 0px 5px #E00007)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#F7BFC166', '#e0000766', '#E00007']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const Hot = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#b7000666', stroke: '#E00007', strokeWidth: '2px' },
                { fill: '#E00007' },
                {
                  fill: '#F7BFC1',
                  filter: 'drop-shadow(0px 0px 5px #F7BFC1)'
                }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={['#b7000666', '#E00007', '#F7BFC1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const HotCircle = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={() => <circle r={8} transform="translate(8, 8)" />}
                />
              }
              colorScheme={[
                { fill: '#b7000666', stroke: '#E00007', strokeWidth: '2px' },
                { fill: '#E00007' },
                {
                  fill: '#F7BFC1',
                  filter: 'drop-shadow(0px 0px 5px #F7BFC1)'
                }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#b7000666', '#E00007', '#F7BFC1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const HotHex = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={(data) => {
                    const rowNumber =
                      heatmapXSmallBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(2, 2) rotate(90)';

                    const size = 110;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.2; // Adjust this value to make the hexagon slimmer or wider

                    const d = `M ${radius * slimFactor} 0
                                 L ${(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-radius * slimFactor} 0
                                 L ${-(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 }
                                 L ${(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 } Z`;

                    if (rowNumber % 2 === 0) {
                      transform = 'translate(12, 2) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                { fill: '#b7000666', stroke: '#E00007', strokeWidth: '2px' },
                { fill: '#E00007' },
                {
                  fill: '#F7BFC1',
                  filter: `drop-shadow(0px 0px 5px #F7BFC1)`
                }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#b7000666', '#E00007', '#F7BFC1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const Classic = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallSimpleBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              colorScheme={[
                { fill: '#a840e866', stroke: '#8B00E0', strokeWidth: '2px' },
                { fill: '#105EFF' },
                { fill: '#40D3F4', filter: 'drop-shadow(0px 0px 5px #40D3F4)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallSimpleBlocksData}
          colorScheme={['#a840e866', '#105EFF', '#40D3F4']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const ClassicCircle = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={() => <circle r={8} transform="translate(8, 8)" />}
                />
              }
              colorScheme={[
                { fill: '#a840e866', stroke: '#8B00E0', strokeWidth: '2px' },
                { fill: '#105EFF' },
                { fill: '#40D3F4', filter: 'drop-shadow(0px 0px 5px #40D3F4)' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#a840e866', '#105EFF', '#40D3F4']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};

export const ClassicHex = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-black">
        Incident Report
      </h3>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          height={220}
          data={heatmapXSmallBlocksData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries label={null} line={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              axisLine={null}
              tickSeries={
                <LinearXAxisTickSeries
                  line={null}
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-60}
                      fill="#535362"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <HeatmapSeries
              cell={
                <HeatmapCell
                  symbol={(data) => {
                    const rowNumber =
                      heatmapXSmallBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(2, 2) rotate(90)';

                    const size = 110;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.2; // Adjust this value to make the hexagon slimmer or wider

                    const d = `M ${radius * slimFactor} 0
                                 L ${(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-(radius * slimFactor) / 2} ${
                                   (radius * Math.sqrt(3)) / 2
                                 }
                                 L ${-radius * slimFactor} 0
                                 L ${-(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 }
                                 L ${(radius * slimFactor) / 2} ${
                                   -(radius * Math.sqrt(3)) / 2
                                 } Z`;

                    if (rowNumber % 2 === 0) {
                      transform = 'translate(12, 2) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                { fill: '#a840e866', stroke: '#8B00E0', strokeWidth: '2px' },
                { fill: '#105EFF' },
                { fill: '#40D3F4', filter: 'drop-shadow(0px 0px 5px #40D3F4)' }
              ]}
              padding={0.3}
            />
          }
        />
        <SequentialLegend
          data={heatmapXSmallBlocksData}
          colorScheme={['#a840e866', '#105EFF', '#40D3F4']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-6 !h-[135px] text-[#535362] font-medium"
        />
      </div>
    </div>
  );
};
