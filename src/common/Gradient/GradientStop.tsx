import React, { PureComponent } from 'react';

export interface GradientStopProps {
  offset: number | string;
  stopOpacity: number | string;
  color?: string;
}

export class GradientStop extends PureComponent<GradientStopProps> {
  static defaultProps: Partial<GradientStopProps> = {
    stopOpacity: 1
  };

  render() {
    const { offset, stopOpacity, color } = this.props;

    return <stop offset={offset} stopOpacity={stopOpacity} stopColor={color} />;
  }
}
