import React from 'react';
import { Mask } from './Mask';
import { Area, AreaChart, AreaSeries } from '../../AreaChart';
import { singleDateData } from '../../../demo';
import { Stripes } from './Stripes';

export default {
  title: 'Utils/Mask',
  component: Mask,
  subcomponents: {
    Stripes
  }
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
            mask={<Stripes />}
          />
        }
      />
    }
  />
);
