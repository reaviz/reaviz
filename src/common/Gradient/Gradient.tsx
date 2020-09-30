import React, { Component, ReactElement } from 'react';
import { GradientStop, GradientStopProps } from './GradientStop';
import { CloneElement } from '../utils';

export interface GradientProps {
  id: string;
  stops: ReactElement<GradientStopProps, typeof GradientStop>[];
  color?: string;
  direction: 'vertical' | 'horizontal';
}

export class Gradient extends Component<GradientProps> {
  static defaultProps: Partial<GradientProps> = {
    direction: 'vertical',
    stops: [
      <GradientStop offset="0%" stopOpacity={0.3} key="start" />,
      <GradientStop offset="80%" stopOpacity={1} key="stop" />
    ]
  };

  getDirection() {
    if (this.props.direction === 'vertical') {
      return {
        x1: '10%',
        x2: '10%',
        y1: '100%',
        y2: '0%'
      };
    } else {
      return {
        y1: '0%',
        y2: '0%',
        x1: '0%',
        x2: '100%'
      };
    }
  }

  render() {
    const { id, stops, color } = this.props;
    const direction = this.getDirection();

    return (
      <linearGradient spreadMethod="pad" id={id} {...direction}>
        {stops.map((stop, index) => (
          <CloneElement<GradientStopProps>
            element={stop}
            key={`gradient-${index}`}
            color={stop.props.color || color}
          />
        ))}
      </linearGradient>
    );
  }
}
