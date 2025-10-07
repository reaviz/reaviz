import { CloneElement } from 'reablocks';
import type { FC, ReactElement } from 'react';
import React from 'react';

import type { GradientStopProps } from './GradientStop';
import { GradientStop } from './GradientStop';

export interface GradientProps {
  id: string;
  stops: ReactElement<GradientStopProps, typeof GradientStop>[];
  color?: string;
  direction: 'vertical' | 'horizontal' | 'radial';
}

export const Gradient: FC<Partial<GradientProps>> = ({
  id,
  color,
  direction = 'vertical',
  stops = [
    <GradientStop offset="0%" stopOpacity={0.3} key="start" />,
    <GradientStop offset="80%" stopOpacity={1} key="stop" />
  ]
}) => {
  if (direction === 'radial') {
    return (
      <radialGradient id={id}>
        {stops.map((stop, index) => (
          <CloneElement<GradientStopProps>
            element={stop}
            key={`gradient-${index}`}
            color={stop.props.color || color}
          />
        ))}
      </radialGradient>
    );
  }

  const pos =
    direction === 'vertical'
      ? {
          x1: '10%',
          x2: '10%',
          y1: '100%',
          y2: '0%'
        }
      : {
          y1: '0%',
          y2: '0%',
          x1: '0%',
          x2: '100%'
        };

  return (
    <linearGradient spreadMethod="pad" id={id} {...pos}>
      {stops.map((stop, index) => (
        <CloneElement<GradientStopProps>
          element={stop}
          key={`gradient-${index}`}
          color={stop.props.color || color}
        />
      ))}
    </linearGradient>
  );
};
