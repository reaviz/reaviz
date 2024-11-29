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

export const LinearXAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (
  props
) => <LinearAxisTickLabel {...props} />;
export const LinearXAxisTickLabelDefaultProps = {
  ...LinearAxisTickLabelDefaultProps,
  rotation: true,
  position: 'end',
  align: 'center'
} as Partial<LinearAxisTickLabelProps>;

export const LinearXAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (
  props
) => <LinearAxisTickLine {...props} />;
export const LinearXAxisTickLineDefaultProps = {
  ...LinearAxisTickLineDefaultProps,
  position: 'end'
} as Partial<LinearAxisTickLineProps>;

export const LinearXAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (
  props
) => <LinearAxisTickSeries {...props} />;

export const LinearXAxisTickSeriesDefaultProps = {
  ...LinearAxisTickSeriesDefaultProps,
  tickSize: 75,
  line: <LinearXAxisTickLine {...LinearXAxisTickLineDefaultProps} />,
  label: <LinearXAxisTickLabel {...LinearXAxisTickLabelDefaultProps} />
} as Partial<LinearAxisTickSeriesProps>;

export const LinearXAxis: FC<Partial<LinearAxisProps>> = (props) => (
  <LinearAxis {...LinearXAxisDefaultProps} {...props} />
);

export const LinearXAxisDefaultProps = {
  ...LinearAxisDefaultProps,
  position: 'end',
  roundDomains: false,
  scaled: false,
  type: 'value',
  orientation: 'horizontal',
  tickSeries: <LinearXAxisTickSeries {...LinearXAxisTickSeriesDefaultProps} />
} as Partial<LinearAxisProps>;
