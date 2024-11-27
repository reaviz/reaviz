import React, { FC } from 'react';
import {
  LinearAxisTickLabelProps,
  LinearAxisTickLabel
} from './LinearAxisTickLabel';
import {
  LinearAxisTickLineProps,
  LinearAxisTickLine
} from './LinearAxisTickLine';
import {
  LinearAxisTickSeriesProps,
  LinearAxisTickSeries
} from './LinearAxisTickSeries';
import { LinearAxisProps, LinearAxis } from './LinearAxis';

export const LinearYAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => (
  <LinearAxisTickLabel
    rotation={false}
    position="start"
    align="center"
    {...props}
  />
);

export const LinearYAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => <LinearAxisTickLine position="start" {...props} />;

export const LinearYAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => (
  <LinearAxisTickSeries tickSize={30} {...props}>
    {props.children}
  </LinearAxisTickSeries>
);

export const LinearYAxis: FC<Partial<LinearAxisProps>> = (props) => (
  <LinearAxis
    orientation="vertical"
    scaled={false}
    roundDomains={false}
    type="value"
    position="start"
    {...props}
  >
    {props.children}
  </LinearAxis>
);
