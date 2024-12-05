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
  LinearAxisTickSeries,
  LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS
} from './LinearAxisTickSeries';
import {
  LinearAxisProps,
  LinearAxis,
  LINEAR_AXIS_DEFAULT_PROPS
} from './LinearAxis';

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
) => (
  <LinearAxisTickSeries
    {...LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS}
    {...props}
  />
);
export const LINEAR_Y_AXIS_TICK_SERIES_DEFAULT_PROPS = {
  ...LINEAR_AXIS_TICK_SERIES_DEFAULT_PROPS,
  tickSize: 30,
  line: <LinearYAxisTickLine />,
  label: <LinearYAxisTickLabel />
};

export const LinearYAxis: FC<Partial<LinearAxisProps>> = (props) => (
  <LinearAxis {...LINEAR_Y_AXIS_DEFAULT_PROPS} {...props} />
);
export const LINEAR_Y_AXIS_DEFAULT_PROPS = {
  ...LINEAR_AXIS_DEFAULT_PROPS,
  orientation: 'vertical',
  scaled: false,
  roundDomains: false,
  type: 'value',
  position: 'start',
  tickSeries: <LinearYAxisTickSeries />
} as Partial<LinearAxisProps>;
