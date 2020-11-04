import React, { FC, ReactElement } from 'react';
import { GradientStop, GradientStopProps } from './GradientStop';
import { CloneElement } from 'rdk';

export interface RadialGradientProps {
  id: string;
  stops: ReactElement<GradientStopProps, typeof GradientStop>[];
  color?: string;
  radius: number | string;
}

export const RadialGradient: FC<Partial<RadialGradientProps>> = ({
  id,
  color,
  radius = '30%',
  stops = [
    <GradientStop offset="0%" stopOpacity={0.2} key="start" />,
    <GradientStop offset="80%" stopOpacity={0.7} key="stop" />
  ]
}) => (
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
