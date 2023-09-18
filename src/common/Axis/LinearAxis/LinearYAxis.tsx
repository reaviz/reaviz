import React, { FC } from 'react';
import { LinearAxisTickLabelProps, LinearAxisTickLabel } from './LinearAxisTickLabel';
import { LinearAxisTickLineProps, LinearAxisTickLine } from './LinearAxisTickLine';
import { LinearAxisTickSeriesProps, LinearAxisTickSeries } from './LinearAxisTickSeries';
import { LinearAxisProps, LinearAxis } from './LinearAxis';

export const LinearYAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (props) => <LinearAxisTickLabel text="" fullText="" angle={0} orientation="horizontal" position="start" half="start" line={<LinearAxisTickLine orientation="horizontal" position="center" height={5} width={5} />} {...props} />;
LinearYAxisTickLabel.defaultProps = {
  ...LinearAxisTickLabel.defaultProps,
  rotation: false,
  position: 'start',
  align: 'center'
};

export const LinearYAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (props) => <LinearAxisTickLine height={10} width={10} orientation="vertical" position="start" {...props} />;
LinearYAxisTickLine.defaultProps = {
  ...LinearAxisTickLine.defaultProps,
  position: 'start'
};

export const LinearYAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (props) => <LinearAxisTickSeries scale={props.scale} height={2} width={10} axis={props.axis} tickValues={props.tickValues} orientation="horizontal" {...props} />;
LinearYAxisTickSeries.defaultProps = {
  ...LinearAxisTickSeries.defaultProps,
  tickSize: 30,
  line: <LinearYAxisTickLine />,
  label: <LinearYAxisTickLabel />
};

export const LinearYAxis: FC<LinearAxisProps> = (props) => <LinearAxis {...props} />;
LinearYAxis.defaultProps = {
  ...LinearAxis.defaultProps,
  orientation: 'vertical',
  scaled: false,
  roundDomains: false,
  type: 'value',
  position: 'start',
  tickSeries: <LinearYAxisTickSeries />
};
