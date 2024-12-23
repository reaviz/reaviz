import React from 'react';
import {
  FunnelArc,
  FunnelAxis,
  FunnelAxisLine,
  FunnelChart,
  FunnelSeries,
  TooltipArea
} from '../src/index';
import { largeFunnelData, simpleFunnelData } from 'reaviz-data-utils';
import { schemes } from '../src/common/color/schemes';

export default {
  tags: ['skip-snapshot'],
  title: 'Blocks/Funnel Chart/Dark/X-Small',
  component: FunnelChart
};

export const LargeDataset = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <FunnelChart
        id="large-dataset"
        data={largeFunnelData}
        series={
          <FunnelSeries
            arc={
              <FunnelArc
                colorScheme={schemes.unifyvizwarm[2]}
                gradient={null}
                tooltip={<TooltipArea />}
                glow={{ blur: 20, color: '#E8404599' }}
              />
            }
            axis={
              <FunnelAxis
                label={null}
                line={<FunnelAxisLine strokeColor={'#000000'} />}
              />
            }
          />
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
      <FunnelChart
        id="simple"
        data={simpleFunnelData}
        series={
          <FunnelSeries
            arc={
              <FunnelArc
                colorScheme={['#5B14C5']}
                gradient={null}
                tooltip={<TooltipArea />}
                glow={{ blur: 20, color: '#5B14C5' }}
              />
            }
            axis={
              <FunnelAxis
                label={null}
                line={<FunnelAxisLine strokeColor={'#000000'} />}
              />
            }
          />
        }
      />
    </div>
  );
};

export const Layered = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[200px] h-[386px] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <FunnelChart
        id="layered"
        data={simpleFunnelData}
        series={
          <FunnelSeries
            arc={
              <FunnelArc
                colorScheme={['#EE409430', '#EE409475', '#EE4094']}
                gradient={null}
                tooltip={<TooltipArea />}
                variant="layered"
                glow={{
                  blur: 20,
                  color: '#EE409499'
                }}
              />
            }
            axis={
              <FunnelAxis
                label={null}
                line={<FunnelAxisLine strokeColor={'#000000'} />}
              />
            }
          />
        }
      />
    </div>
  );
};

export const Interpolation = () => {
  return (
    <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl w-[200px] h-[386px] shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] overflow-hidden">
      <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
        Incident Report
      </h3>
      <FunnelChart
        id="interpolation"
        data={simpleFunnelData}
        series={
          <FunnelSeries
            arc={
              <FunnelArc
                colorScheme={'#40D3F4'}
                interpolation="step"
                gradient={null}
                tooltip={<TooltipArea />}
                glow={{ blur: 15, color: '#40D3F475' }}
              />
            }
            axis={
              <FunnelAxis
                label={null}
                line={<FunnelAxisLine strokeColor={'#000000'} />}
              />
            }
          />
        }
      />
    </div>
  );
};
