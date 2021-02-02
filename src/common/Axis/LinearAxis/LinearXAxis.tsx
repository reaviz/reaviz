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

export class LinearXAxisTickLabel extends Component<LinearAxisTickLabelProps> {
  static defaultProps: Partial<LinearAxisTickLabelProps> = {
    ...LinearAxisTickLabel.defaultProps,
    rotation: true,
    position: 'end',
    align: 'center'
  };

  render() {
    return <LinearAxisTickLabel {...this.props} />;
  }
}

export class LinearXAxisTickLine extends Component<LinearAxisTickLineProps> {
  static defaultProps: Partial<LinearAxisTickLineProps> = {
    ...LinearAxisTickLine.defaultProps,
    position: 'end'
  };

  render() {
    return <LinearAxisTickLine {...this.props} />;
  }
}

export class LinearXAxisTickSeries extends Component<LinearAxisTickSeriesProps> {
  static defaultProps: Partial<LinearAxisTickSeriesProps> = {
    ...LinearAxisTickSeries.defaultProps,
    tickSize: 75,
    line: <LinearXAxisTickLine />,
    label: <LinearXAxisTickLabel />
  };

  render() {
    return <LinearAxisTickSeries {...this.props} />;
  }
}

export class LinearXAxis extends Component<LinearAxisProps> {
  static defaultProps: Partial<LinearAxisProps> = {
    ...LinearAxis.defaultProps,
    position: 'end',
    roundDomains: false,
    scaled: false,
    type: 'value',
    orientation: 'horizontal',
    tickSeries: <LinearXAxisTickSeries />
  };

  render() {
    return <LinearAxis {...this.props} />;
  }
}
