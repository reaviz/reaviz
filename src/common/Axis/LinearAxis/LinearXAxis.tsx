import React, { FC } from 'react';
import { LinearAxisTickLabelProps, LinearAxisTickLabel } from './LinearAxisTickLabel';
import { LinearAxisTickLineProps, LinearAxisTickLine } from './LinearAxisTickLine';
import { LinearAxisTickSeriesProps, LinearAxisTickSeries } from './LinearAxisTickSeries';
import { LinearAxisProps, LinearAxis } from './LinearAxis';

export const LinearXAxisTickLabel: FC<Partial<LinearAxisTickLabelProps>> = (props) => <LinearAxisTickLabel line={<LinearAxisTickLine orientation="vertical" position="center" height={5} width={5} />} text="" fullText="" angle={0} orientation="horizontal" position="end" half="start" {...props} />;
LinearXAxisTickLabel.defaultProps = {
  ...LinearAxisTickLabel.defaultProps,
  rotation: true,
  position: 'end',
  align: 'center'
};

export const LinearXAxisTickLine: FC<Partial<LinearAxisTickLineProps>> = (props) => <LinearAxisTickLine height={10} width={10} orientation="vertical" position="start" {...props} />;
LinearXAxisTickLine.defaultProps = {
  ...LinearAxisTickLine.defaultProps,
  position: 'end'
};

export const LinearXAxisTickSeries: FC<Partial<LinearAxisTickSeriesProps>> = (props) => <LinearAxisTickSeries scale={props.scale} height={2} width={10} axis={props.axis} tickValues={props.tickValues} orientation="horizontal" {...props} />;
LinearXAxisTickSeries.defaultProps = {
  ...LinearAxisTickSeries.defaultProps,
  tickSize: 75,
  line: <LinearXAxisTickLine />,
  label: <LinearXAxisTickLabel />
};

export const LinearXAxis: FC<LinearAxisProps> = (props) => <LinearAxis {...props} />;
LinearXAxis.defaultProps = {
  ...LinearAxis.defaultProps,
  position: 'end',
  roundDomains: false,
  scaled: false,
  type: 'value',
  orientation: 'horizontal',
  tickSeries: <LinearXAxisTickSeries />
};

// type="category" tickSeries={<LinearXAxisTickSeries label={<LinearXAxisTickLabel rotation={-90} />
