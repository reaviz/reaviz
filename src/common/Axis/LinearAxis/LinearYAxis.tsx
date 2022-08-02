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
) => <LinearAxisTickLabel {...props} />;
LinearYAxisTickLabel.defaultProps = {
  ...LinearAxisTickLabel.defaultProps,
  rotation: false,
  position: 'start',
  align: 'center'
};

export const LinearYAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => <LinearAxisTickLine {...props} />;
LinearYAxisTickLine.defaultProps = {
  ...LinearAxisTickLine.defaultProps,
  position: 'start'
};

export const LinearYAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => <LinearAxisTickSeries {...props} />;
LinearYAxisTickSeries.defaultProps = {
  ...LinearAxisTickSeries.defaultProps,
  tickSize: 30,
  line: <LinearYAxisTickLine />,
  label: <LinearYAxisTickLabel />
};

export const LinearYAxis: FC<Partial<LinearAxisProps>> = (props) => (
  <LinearAxis {...props} />
);
LinearYAxis.defaultProps = {
  ...LinearAxis.defaultProps,
  orientation: 'vertical',
  scaled: false,
  roundDomains: false,
  type: 'value',
  position: 'start',
  tickSeries: <LinearYAxisTickSeries />
};
