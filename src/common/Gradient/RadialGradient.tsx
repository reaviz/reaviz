import React, { FC, ReactElement } from 'react';
import { GradientStop, GradientStopProps } from './GradientStop';
import { CloneElement } from 'reablocks';

export interface RadialGradientProps {
  /**
   * Unique id for the gradient. Set internally by the parent component.
   */
  id: string;

  /**
   * Gradient stops to render.
   *
   * @default `[<GradientStop offset="0%" stopOpacity={0.2} />, <GradientStop offset="80%" stopOpacity={0.7} />]`
   */
  stops: ReactElement<GradientStopProps, typeof GradientStop>[];

  /**
   * Base color of the gradient.
   */
  color?: string;

  /**
   * Radius of the gradient.
   *
   * @default '30%'
   */
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
