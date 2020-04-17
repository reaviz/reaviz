import React, { PureComponent } from 'react';

export interface RadialAxisTickLineProps {
  size?: number;
  stroke: string;
  innerRadius: number;
  outerRadius: number;
  position: 'inside' | 'outside';
}

export class RadialAxisTickLine extends PureComponent<RadialAxisTickLineProps> {
  static defaultProps: Partial<RadialAxisTickLineProps> = {
    stroke: 'rgba(113, 128, 141, .5)',
    size: 10,
    position: 'inside'
  };

  render() {
    const { stroke, size, position, innerRadius, outerRadius } = this.props;
    const x1 = position === 'outside' ? size : -(outerRadius - innerRadius);

    return (
      <line x1={x1} x2={0} stroke={stroke} style={{ pointerEvents: 'none' }} />
    );
  }
}
