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
import {
  LinearAxisProps,
  LinearAxis,
  linearAxisDefaultProps
} from './LinearAxis';

export const LinearXAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => <LinearAxisTickLabel {...props} />;
LinearXAxisTickLabel.defaultProps = {
  ...LinearAxisTickLabel.defaultProps,
  rotation: true,
  position: 'end',
  align: 'center'
};

export const LinearXAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => <LinearAxisTickLine {...props} />;
LinearXAxisTickLine.defaultProps = {
  ...LinearAxisTickLine.defaultProps,
  position: 'end'
};

export const LinearXAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => <LinearAxisTickSeries {...props} />;
LinearXAxisTickSeries.defaultProps = {
  ...LinearAxisTickSeries.defaultProps,
  tickSize: 75,
  line: <LinearXAxisTickLine />,
  label: <LinearXAxisTickLabel />
};

export const LinearXAxis: FC<Partial<LinearAxisProps>> = (props) => (
  <LinearAxis {...linearXAxisDefaultProps} {...props} />
);
export const linearXAxisDefaultProps = {
  ...linearAxisDefaultProps,
  position: 'end',
  roundDomains: false,
  scaled: false,
  type: 'value',
  orientation: 'horizontal',
  tickSeries: <LinearXAxisTickSeries />
} as Partial<LinearAxisProps>;
