import React, { FC } from 'react';
import {
  LinearAxisTickLabelProps,
  LinearAxisTickLabel,
  LinearAxisTickLabelDefaultProps
} from './LinearAxisTickLabel';
import {
  LinearAxisTickLineProps,
  LinearAxisTickLine,
  LinearAxisTickLineDefaultProps
} from './LinearAxisTickLine';
import {
  LinearAxisTickSeriesProps,
  LinearAxisTickSeries,
  LinearAxisTickSeriesDefaultProps
} from './LinearAxisTickSeries';
import {
  LinearAxisProps,
  LinearAxis,
  LinearAxisDefaultProps
} from './LinearAxis';

export const LinearYAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => <LinearAxisTickLabel {...props} />;
export const LinearYAxisTickLabelDefaultProps = {
  ...LinearAxisTickLabelDefaultProps,
  rotation: false,
  position: 'start',
  align: 'center'
} as Partial<LinearAxisTickLabelProps>;

export const LinearYAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => <LinearAxisTickLine {...props} />;
export const LinearYAxisTickLineDefaultProps = {
  ...LinearAxisTickLineDefaultProps,
  position: 'start'
} as Partial<LinearAxisTickLineProps>;

export const LinearYAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => <LinearAxisTickSeries {...props} />;
export const LinearYAxisTickSeriesDefaultProps = {
  ...LinearAxisTickSeriesDefaultProps,
  tickSize: 30,
  line: <LinearYAxisTickLine {...LinearYAxisTickLineDefaultProps} />,
  label: <LinearYAxisTickLabel {...LinearYAxisTickLabelDefaultProps} />
};

export const LinearYAxis: FC<Partial<LinearAxisProps>> = (props) => (
  <LinearAxis {...LinearYAxisDefaultProps} {...props} />
);

export const LinearYAxisDefaultProps = {
  ...LinearAxisDefaultProps,
  orientation: 'vertical',
  scaled: false,
  roundDomains: false,
  type: 'value',
  position: 'start',
  tickSeries: <LinearYAxisTickSeries {...LinearYAxisTickSeriesDefaultProps} />
} as Partial<LinearAxisProps>;
