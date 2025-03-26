import React from 'react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Count,
  Heatmap,
  HeatmapCell,
  HeatmapSeries,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries,
  SequentialLegend
} from '../src/index';

import {
  heatmapLargeBlocksData,
  heatmapMediumSimpleBlocksData
} from 'reaviz-data-utils';
import { schemes } from '../src/common/color/schemes';

export default {
  tags: ['skip-snapshot'],
  title: 'Blocks/Heatmap/Light/Large',
  component: AreaChart
};

export const Simple = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapMediumSimpleBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
              padding={0.12}
            />
          }
        />
        <SequentialLegend
          data={heatmapMediumSimpleBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const SimpleCircle = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
          data={heatmapLargeBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const SimpleHex = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                      heatmapLargeBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(6, 8) rotate(90)';

                    const size = 160;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.1; // Adjust this value to make the hexagon slimmer or wider

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
                      transform = 'translate(17, 8) rotate(90)';
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
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={schemes.unifyvizwarm}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Intensity = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapMediumSimpleBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
              padding={0.12}
            />
          }
        />
        <SequentialLegend
          data={heatmapMediumSimpleBlocksData}
          colorScheme={['#8b00e066', '#F8A340', '#FFD440']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const IntensityCircle = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
          data={heatmapLargeBlocksData}
          colorScheme={['#8b00e066', '#F8A340', '#FFD440']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const IntensityHex = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                      heatmapLargeBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(6, 8) rotate(90)';

                    const size = 160;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.1; // Adjust this value to make the hexagon slimmer or wider

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
                      transform = 'translate(17, 8) rotate(90)';
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
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={['#8b00e066', '#F8A340', '#FFD440']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Correlation = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapMediumSimpleBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
              padding={0.12}
            />
          }
        />
        <SequentialLegend
          data={heatmapMediumSimpleBlocksData}
          colorScheme={['#01736566', '#40e5d166', '#40E5D1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const CorrelationCircle = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
          data={heatmapLargeBlocksData}
          colorScheme={['#01736566', '#40e5d166', '#40E5D1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const CorrelationHex = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                      heatmapLargeBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(6, 8) rotate(90)';

                    const size = 160;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.1; // Adjust this value to make the hexagon slimmer or wider

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
                      transform = 'translate(17, 8) rotate(90)';
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
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={['#01736566', '#40e5d166', '#40E5D1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Geospatial = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapMediumSimpleBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
              padding={0.12}
            />
          }
        />
        <SequentialLegend
          data={heatmapMediumSimpleBlocksData}
          colorScheme={['#202E03', '#80CE5B', '#D5EFC8']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const GeospatialCircle = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
          data={heatmapLargeBlocksData}
          colorScheme={['#202E03', '#80CE5B', '#D5EFC8']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const GeospatialHex = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                      heatmapLargeBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(6, 8) rotate(90)';

                    const size = 160;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.1; // Adjust this value to make the hexagon slimmer or wider

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
                      transform = 'translate(17, 8) rotate(90)';
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
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={['#202E03', '#80CE5B', '#D5EFC8']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Warm = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapMediumSimpleBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
              padding={0.12}
            />
          }
        />
        <SequentialLegend
          data={heatmapMediumSimpleBlocksData}
          colorScheme={['#F7BFC166', '#e0000766', '#E00007']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const WarmCircle = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
          data={heatmapLargeBlocksData}
          colorScheme={['#F7BFC166', '#e0000766', '#E00007']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const WarmHex = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                      heatmapLargeBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(6, 8) rotate(90)';

                    const size = 160;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.1; // Adjust this value to make the hexagon slimmer or wider

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
                      transform = 'translate(17, 8) rotate(90)';
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
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={['#F7BFC166', '#e0000766', '#E00007']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Hot = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapMediumSimpleBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
              padding={0.12}
            />
          }
        />
        <SequentialLegend
          data={heatmapMediumSimpleBlocksData}
          colorScheme={['#b7000666', '#E84045', '#F7BFC1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const HotCircle = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
          data={heatmapLargeBlocksData}
          colorScheme={['#b7000666', '#E84045', '#F7BFC1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const HotHex = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                      heatmapLargeBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(6, 8) rotate(90)';

                    const size = 160;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.1; // Adjust this value to make the hexagon slimmer or wider

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
                      transform = 'translate(17, 8) rotate(90)';
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
                  filter: 'drop-shadow(0px 0px 5px #F7BFC1)'
                }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={['#b7000666', '#E84045', '#F7BFC1']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Classic = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapMediumSimpleBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                { fill: '#4C86FF' },
                { fill: '#40D3F4', filter: 'drop-shadow(0px 0px 5px #40D3F4)' }
              ]}
              padding={0.12}
            />
          }
        />
        <SequentialLegend
          data={heatmapMediumSimpleBlocksData}
          colorScheme={['#a840e866', '#4C86FF', '#40D3F4']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const ClassicCircle = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                { fill: '#4C86FF' },
                { fill: '#40D3F4', filter: 'drop-shadow(0px 0px 5px #40D3F4)' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={['#a840e866', '#4C86FF', '#40D3F4']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const ClassicHex = () => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-4 bg-white rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[800px] h-[800px] overflow-hidden">
      <div className="flex justify-between items-center p-7 pt-6 pb-8">
        <h3 className="text-3xl text-left  font-bold text-black">
          Incident Report
        </h3>
        <select className="bg-[#E2E2EA] text-black p-3 pt-2 pb-2 rounded-md">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
        </select>
      </div>
      <div className="flex w-full h-full pl-2 pr-2">
        <Heatmap
          data={heatmapLargeBlocksData}
          yAxis={
            <LinearYAxis
              type="category"
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries
                  line={null}
                  label={<LinearYAxisTickLabel padding={10} fill="#535362" />}
                />
              }
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
                      heatmapLargeBlocksData?.[0]?.data?.findIndex(
                        (d) => d.key === data?.x
                      );

                    let transform = 'translate(6, 8) rotate(90)';

                    const size = 160;
                    const radius = Math.sqrt(size / Math.sqrt(3));
                    const slimFactor = 1.1; // Adjust this value to make the hexagon slimmer or wider

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
                      transform = 'translate(17, 8) rotate(90)';
                    }

                    return <path d={d!} transform={transform} />;
                  }}
                />
              }
              colorScheme={[
                { fill: '#a840e866', stroke: '#8B00E0', strokeWidth: '2px' },
                { fill: '#4C86FF' },
                { fill: '#40D3F4', filter: 'drop-shadow(0px 0px 5px #40D3F4)' }
              ]}
            />
          }
        />
        <SequentialLegend
          data={heatmapLargeBlocksData}
          colorScheme={['#a840e866', '#4C86FF', '#40D3F4']}
          gradientClassName="!w-[20px]"
          className="pl-1 pr-1 mt-20 !h-[180px] text-[#535362] font-medium"
        />
      </div>
      <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Critical Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={321}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#E00007]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                  stroke="#E00007"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              12%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 293 last week
          </span>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-xl text-black">Total Incidents</span>
          <div className="flex items-center gap-2">
            <Count
              from={0}
              to={1120}
              className="font-mono text-4xl font-semibold text-black"
            />
            <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#019A88]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                  stroke="#019A88"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              4%
            </div>
          </div>
          <span className="text-[#535362] text-sm">
            Compared to 1.06k last week
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-8 pr-8 font-mono divide-y divide-[#E2E2EA]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Mean Time to Respond">
              Mean Time to Respond
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">6 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Response Time">
              Incident Response Time
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">4 Hours</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#F08083"
                fillOpacity="0.4"
              />
              <path
                d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                stroke="#E00007"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full  pb-4 pt-4 items-center gap-2"
        >
          <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#535362]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0001 2.10535C9.35241 2.10535 8.70472 2.42118 8.35459 3.05343L1.9044 14.7063C1.22414 15.9354 2.14514 17.5 3.5499 17.5H16.4511C17.8559 17.5 18.7769 15.9354 18.0966 14.7063L11.6456 3.05343C11.2955 2.42118 10.6478 2.10535 10.0001 2.10535ZM10.0001 3.31222C10.212 3.31222 10.4237 3.42739 10.5519 3.65889L17.0029 15.3117C17.2501 15.7585 16.9605 16.25 16.4511 16.25H3.5499C3.04051 16.25 2.7509 15.7585 2.99815 15.3117L9.44834 3.65889C9.57655 3.42739 9.78821 3.31222 10.0001 3.31222ZM9.99033 6.65776C9.82472 6.66034 9.6669 6.72856 9.55154 6.84743C9.43618 6.96629 9.37272 7.12609 9.3751 7.29171V11.4584C9.37393 11.5412 9.38923 11.6234 9.42011 11.7003C9.451 11.7771 9.49685 11.8471 9.555 11.9061C9.61315 11.965 9.68245 12.0119 9.75886 12.0438C9.83527 12.0758 9.91727 12.0923 10.0001 12.0923C10.0829 12.0923 10.1649 12.0758 10.2413 12.0438C10.3178 12.0119 10.387 11.965 10.4452 11.9061C10.5034 11.8471 10.5492 11.7771 10.5801 11.7003C10.611 11.6234 10.6263 11.5412 10.6251 11.4584V7.29171C10.6263 7.20806 10.6107 7.12501 10.5792 7.0475C10.5477 6.96999 10.501 6.89959 10.4418 6.84047C10.3826 6.78135 10.3121 6.73472 10.2346 6.70333C10.157 6.67195 10.074 6.65645 9.99033 6.65776ZM10.0001 13.3334C9.77909 13.3334 9.56712 13.4212 9.41084 13.5775C9.25456 13.7337 9.16677 13.9457 9.16677 14.1667C9.16677 14.3877 9.25456 14.5997 9.41084 14.756C9.56712 14.9122 9.77909 15 10.0001 15C10.2211 15 10.4331 14.9122 10.5894 14.756C10.7456 14.5997 10.8334 14.3877 10.8334 14.1667C10.8334 13.9457 10.7456 13.7337 10.5894 13.5775C10.4331 13.4212 10.2211 13.3334 10.0001 13.3334Z"
                fill="#E00007"
              />
            </svg>
            <span className="truncate" title="Incident Escalation Rate">
              Incident Escalation Rate
            </span>
          </div>
          <div className="flex gap-2 w-1/2 justify-end">
            <span className="font-semibold text-xl text-black">10%</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="28"
                height="28"
                rx="14"
                fill="#00C2AB"
                fillOpacity="0.4"
              />
              <path
                d="M18.4987 15.3889L13.9987 19.8334M13.9987 19.8334L9.49866 15.3889M13.9987 19.8334V8.16671"
                stroke="#019A88"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
