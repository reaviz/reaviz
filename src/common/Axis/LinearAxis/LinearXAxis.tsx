import React, { FC, useMemo } from 'react';
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

export const LinearXAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => (
  <LinearAxisTickLabel
    rotation={true}
    position="end"
    align="center"
    {...props}
  />
);

export const LinearXAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => <LinearAxisTickLine position="end" {...props} />;

export const LinearXAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => (
  <LinearAxisTickSeries tickSize={75} {...props}>
    {props.children}
  </LinearAxisTickSeries>
);

export const LinearXAxis: FC<Partial<LinearAxisProps>> = (props) => (
  <LinearAxis
    position="end"
    roundDomains={false}
    scaled={false}
    type="value"
    orientation="horizontal"
    {...props}
  >
    {props.children}
  </LinearAxis>
);
