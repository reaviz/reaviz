import React, { Component } from 'react';
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

export class LinearYAxisTickLabel extends Component<LinearAxisTickLabelProps> {
  static defaultProps: Partial<LinearAxisTickLabelProps> = {
    ...LinearAxisTickLabel.defaultProps,
    rotation: false,
    position: 'start',
    align: 'center'
  };

  render() {
    return <LinearAxisTickLabel {...this.props} />;
  }
}

export class LinearYAxisTickLine extends Component<LinearAxisTickLineProps> {
  static defaultProps: Partial<LinearAxisTickLineProps> = {
    ...LinearAxisTickLine.defaultProps,
    position: 'start'
  };

  render() {
    return <LinearAxisTickLine {...this.props} />;
  }
}

export class LinearYAxisTickSeries extends Component<LinearAxisTickSeriesProps> {
  static defaultProps: Partial<LinearAxisTickSeriesProps> = {
    ...LinearAxisTickSeries.defaultProps,
    tickSize: 30,
    line: <LinearYAxisTickLine />,
    label: <LinearYAxisTickLabel />
  };

  render() {
    return <LinearAxisTickSeries {...this.props} />;
  }
}

export class LinearYAxis extends Component<LinearAxisProps> {
  static defaultProps: Partial<LinearAxisProps> = {
    ...LinearAxis.defaultProps,
    orientation: 'vertical',
    scaled: false,
    roundDomains: false,
    type: 'value',
    position: 'start',
    tickSeries: <LinearYAxisTickSeries />
  };

  render() {
    return <LinearAxis {...this.props} />;
  }
}
