import React, { Component } from 'react';

export interface RadialAxisArcProps {
  index: number;
  scale: any;
  stroke: ((index: number) => string) | string;
  strokeDasharray: ((index: number) => string) | string;
}

export class RadialAxisArc extends Component<RadialAxisArcProps> {
  static defaultProps: Partial<RadialAxisArcProps> = {
    stroke: '#71808d',
    strokeDasharray: '1,4'
  };

  render() {
    const { index, stroke, strokeDasharray, scale } = this.props;
    const r = scale(index);
    const strokeColor = typeof stroke === 'string' ? stroke : stroke(index);
    const strokeDash =
      typeof strokeDasharray === 'string'
        ? strokeDasharray
        : strokeDasharray(index);

    return (
      <circle
        fill="none"
        strokeDasharray={strokeDash}
        stroke={strokeColor}
        style={{ pointerEvents: 'none' }}
        cx="0"
        cy="0"
        r={r}
      />
    );
  }
}
