import React, { Component, ReactElement } from 'react';
import { GradientStop, GradientStopProps } from './GradientStop';
import { CloneElement } from '../utils';

export interface RadialGradientProps {
  id: string;
  stops: ReactElement<GradientStopProps, typeof GradientStop>[];
  color?: string;
  radius: number | string;
}

export class RadialGradient extends Component<RadialGradientProps> {
  static defaultProps: Partial<RadialGradientProps> = {
    radius: '30%',
    stops: [
      <GradientStop offset="0%" stopOpacity={0.2} key="start" />,
      <GradientStop offset="80%" stopOpacity={0.7} key="stop" />
    ]
  };

  render() {
    const { id, stops, color, radius } = this.props;

    return (
      <radialGradient
        id={id}
        cx={0}
        cy={0}
        r={radius}
        gradientUnits="userSpaceOnUse"
      >
        {stops.map((stop, index) => (
          <CloneElement<GradientStopProps>
            element={stop}
            key={`gradient-${index}`}
            color={color}
          />
        ))}
      </radialGradient>
    );
  }
}
