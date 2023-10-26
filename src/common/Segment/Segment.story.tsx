import React from 'react';
import { Segment } from './Segment';
import { Area, AreaChart, AreaSeries } from '../../AreaChart';
import { singleDateData } from '../../../demo';


export default {
  title: 'Utils/Segment',
  component: Segment,
};

export const Simple = () => (
  <AreaChart
    width={350}
    height={250}
    data={singleDateData}
    series={
      <AreaSeries
        area={
          <Area
            segment={<Segment />}
          />
        }
      />
    }
  />
);
